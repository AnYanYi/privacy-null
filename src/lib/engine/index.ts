/**
 * AI Redactor - 脱敏引擎核心实现
 * 
 * 100% 本地处理，绝不上传用户数据
 */

import { nanoid } from 'nanoid';
import {
  type DetectionRule,
  type SensitiveMatch,
  type PlaceholderMapping,
  type RedactorSession,
  type SanitizeReport,
  type SanitizeResult,
  type RestoreReport,
  type RestoreResult,
  type EngineConfig,
  type SensitiveType,
  DEFAULT_ENGINE_CONFIG,
} from './types';
import { DETECTION_RULES, sortRulesByPriority, getDefaultEnabledRules } from './rules';
import {
  generatePlaceholder,
  generateChecksum,
  verifyChecksum,
  findAllPlaceholders,
} from './placeholder';

/** 会话版本号 */
const SESSION_VERSION = '1.0.0';

/**
 * 脱敏引擎类
 */
export class RedactionEngine {
  private config: EngineConfig;
  private enabledRuleIds: Set<string>;

  constructor(config: Partial<EngineConfig> = {}) {
    this.config = { ...DEFAULT_ENGINE_CONFIG, ...config };
    this.enabledRuleIds = new Set(getDefaultEnabledRules().map(r => r.id));
  }

  /**
   * 设置启用的规则
   */
  setEnabledRules(ruleIds: string[]): void {
    this.enabledRuleIds = new Set(ruleIds);
  }

  /**
   * 启用指定规则
   */
  enableRule(ruleId: string): void {
    this.enabledRuleIds.add(ruleId);
  }

  /**
   * 禁用指定规则
   */
  disableRule(ruleId: string): void {
    this.enabledRuleIds.delete(ruleId);
  }

  /**
   * 获取当前启用的规则
   */
  getEnabledRules(): DetectionRule[] {
    return DETECTION_RULES.filter(rule => this.enabledRuleIds.has(rule.id));
  }

  /**
   * 计算行号
   */
  private getLineNumber(text: string, index: number): number {
    const before = text.substring(0, index);
    return (before.match(/\n/g) || []).length + 1;
  }

  /**
   * 生成上下文片段（脱敏后）
   */
  private getContextSnippet(
    text: string,
    startIndex: number,
    endIndex: number,
    placeholder: string
  ): string {
    const contextLength = this.config.contextLength;
    const before = text.substring(Math.max(0, startIndex - contextLength), startIndex);
    const after = text.substring(endIndex, Math.min(text.length, endIndex + contextLength));
    
    // 截断到单词/行边界
    const beforeTrimmed = before.includes('\n') 
      ? before.substring(before.lastIndexOf('\n') + 1)
      : before;
    const afterTrimmed = after.includes('\n')
      ? after.substring(0, after.indexOf('\n'))
      : after;
    
    return `...${beforeTrimmed}${placeholder}${afterTrimmed}...`;
  }

  /**
   * 扫描文本中的敏感信息
   */
  private scanSensitiveData(text: string): SensitiveMatch[] {
    const matches: SensitiveMatch[] = [];
    const enabledRules = sortRulesByPriority(this.getEnabledRules());
    const typeCounters: Record<string, number> = {};
    
    // 记录已处理的区间，避免重叠匹配
    const processedRanges: Array<[number, number]> = [];
    
    const isOverlapping = (start: number, end: number): boolean => {
      return processedRanges.some(([s, e]) => 
        (start >= s && start < e) || (end > s && end <= e) || (start <= s && end >= e)
      );
    };

    for (const rule of enabledRules) {
      // 重置正则的 lastIndex
      rule.pattern.lastIndex = 0;
      
      let match: RegExpExecArray | null;
      while ((match = rule.pattern.exec(text)) !== null) {
        const fullMatch = match[0];
        const captureGroup = rule.captureGroup ?? 0;
        const sensitiveValue = match[captureGroup] || fullMatch;
        
        // 计算实际位置（如果使用了捕获组）
        let startIndex = match.index;
        let endIndex = match.index + fullMatch.length;
        
        if (captureGroup > 0 && match[captureGroup]) {
          const valueStart = fullMatch.indexOf(sensitiveValue);
          if (valueStart !== -1) {
            startIndex = match.index + valueStart;
            endIndex = startIndex + sensitiveValue.length;
          }
        }
        
        // 检查是否与已处理区间重叠
        if (isOverlapping(startIndex, endIndex)) {
          continue;
        }
        
        // 更新类型计数器
        const type = rule.type;
        typeCounters[type] = (typeCounters[type] || 0) + 1;
        
        // 生成占位符
        const placeholder = generatePlaceholder(
          type,
          typeCounters[type],
          sensitiveValue,
          this.config.placeholderPrefix
        );
        
        // 生成上下文片段
        const contextSnippet = this.getContextSnippet(text, startIndex, endIndex, placeholder);
        
        matches.push({
          ruleId: rule.id,
          type,
          originalValue: sensitiveValue,
          placeholder,
          startIndex,
          endIndex,
          lineNumber: this.getLineNumber(text, startIndex),
          contextSnippet,
        });
        
        // 记录已处理区间
        processedRanges.push([startIndex, endIndex]);
      }
    }
    
    // 按起始位置排序
    return matches.sort((a, b) => a.startIndex - b.startIndex);
  }

  /**
   * 执行脱敏
   */
  sanitize(text: string): SanitizeResult {
    const startTime = performance.now();
    
    try {
      // 扫描敏感数据
      const matches = this.scanSensitiveData(text);
      
      // 构建映射表
      const mappings: PlaceholderMapping[] = matches.map(m => ({
        placeholder: m.placeholder,
        originalValue: m.originalValue,
        type: m.type,
        checksum: generateChecksum(m.originalValue),
        createdAt: Date.now(),
      }));
      
      // 替换敏感数据（从后往前替换，避免位置偏移）
      let outputText = text;
      const sortedMatches = [...matches].sort((a, b) => b.startIndex - a.startIndex);
      
      for (const match of sortedMatches) {
        outputText = 
          outputText.substring(0, match.startIndex) +
          match.placeholder +
          outputText.substring(match.endIndex);
      }
      
      // 统计按类型分组
      const matchesByType: Record<SensitiveType, number> = {} as Record<SensitiveType, number>;
      for (const match of matches) {
        matchesByType[match.type] = (matchesByType[match.type] || 0) + 1;
      }
      
      // 构建报告
      const report: SanitizeReport = {
        totalMatches: matches.length,
        matchesByType,
        matches: matches.map(m => ({
          type: m.type,
          lineNumber: m.lineNumber,
          contextSnippet: m.contextSnippet,
          placeholderPreview: m.placeholder,
        })),
        processingTime: performance.now() - startTime,
      };
      
      // 构建会话
      const session: RedactorSession = {
        version: SESSION_VERSION,
        createdAt: Date.now(),
        mappings,
        sessionId: nanoid(10),
      };
      
      return {
        outputText,
        report,
        session,
        success: true,
      };
    } catch (error) {
      return {
        outputText: text,
        report: {
          totalMatches: 0,
          matchesByType: {} as Record<SensitiveType, number>,
          matches: [],
          processingTime: performance.now() - startTime,
        },
        session: {
          version: SESSION_VERSION,
          createdAt: Date.now(),
          mappings: [],
          sessionId: nanoid(10),
        },
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 执行恢复
   */
  restore(text: string, session: RedactorSession): RestoreResult {
    const startTime = performance.now();
    
    try {
      // 查找文本中的所有占位符
      const placeholders = findAllPlaceholders(text);
      
      // 构建映射查找表
      const mappingLookup = new Map<string, PlaceholderMapping>();
      for (const mapping of session.mappings) {
        mappingLookup.set(mapping.placeholder, mapping);
      }
      
      let restoredText = text;
      let restoredCount = 0;
      const unmatchedPlaceholders: string[] = [];
      const checksumFailures: string[] = [];
      
      // 从后往前替换
      const sortedPlaceholders = [...placeholders].sort((a, b) => b.position - a.position);
      
      for (const ph of sortedPlaceholders) {
        const mapping = mappingLookup.get(ph.placeholder);
        
        if (!mapping) {
          unmatchedPlaceholders.push(ph.placeholder);
          continue;
        }
        
        // 验证校验码
        if (!verifyChecksum(mapping.originalValue, ph.checksum)) {
          checksumFailures.push(ph.placeholder);
          continue;
        }
        
        // 执行替换
        restoredText = 
          restoredText.substring(0, ph.position) +
          mapping.originalValue +
          restoredText.substring(ph.position + ph.placeholder.length);
        
        restoredCount++;
      }
      
      const report: RestoreReport = {
        restoredCount,
        unmatchedPlaceholders,
        checksumFailures,
        processingTime: performance.now() - startTime,
      };
      
      return {
        restoredText,
        report,
        success: unmatchedPlaceholders.length === 0 && checksumFailures.length === 0,
        error: unmatchedPlaceholders.length > 0 
          ? `${unmatchedPlaceholders.length} placeholder(s) not found in session`
          : checksumFailures.length > 0
          ? `${checksumFailures.length} checksum verification failed`
          : undefined,
      };
    } catch (error) {
      return {
        restoredText: text,
        report: {
          restoredCount: 0,
          unmatchedPlaceholders: [],
          checksumFailures: [],
          processingTime: performance.now() - startTime,
        },
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

/**
 * 创建脱敏引擎实例
 */
export function createEngine(config?: Partial<EngineConfig>): RedactionEngine {
  return new RedactionEngine(config);
}

/**
 * 便捷函数：脱敏
 */
export function sanitize(
  text: string,
  enabledRuleIds?: string[]
): SanitizeResult {
  const engine = createEngine();
  if (enabledRuleIds) {
    engine.setEnabledRules(enabledRuleIds);
  }
  return engine.sanitize(text);
}

/**
 * 便捷函数：恢复
 */
export function restore(
  text: string,
  session: RedactorSession
): RestoreResult {
  const engine = createEngine();
  return engine.restore(text, session);
}
