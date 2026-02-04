/**
 * AI Redactor - 脱敏引擎核心类型定义
 * 
 * 所有处理 100% 本地执行，绝不上传用户数据
 */

/** 敏感信息类型枚举 */
export type SensitiveType =
  | 'JWT'
  | 'API_KEY'
  | 'BEARER_TOKEN'
  | 'PRIVATE_KEY'
  | 'COOKIE'
  | 'SET_COOKIE'
  | 'AUTH_HEADER'
  | 'URL_PARAM'
  | 'ENV_VAR'
  | 'DATABASE_URL'
  | 'GITHUB_TOKEN'
  | 'PASSWORD'
  | 'SECRET'
  | 'GENERIC'
  // 新增类型
  | 'EMAIL'
  | 'PHONE'
  | 'IP_ADDRESS'
  | 'MAC_ADDRESS'
  | 'CREDIT_CARD'
  | 'SSN'
  | 'ID_CARD'
  | 'GOOGLE_KEY'
  | 'AZURE_KEY'
  | 'SLACK_TOKEN'
  | 'DISCORD_TOKEN'
  | 'TELEGRAM_TOKEN'
  | 'TWILIO_KEY'
  | 'SENDGRID_KEY'
  | 'MAILGUN_KEY'
  | 'PAYPAL_KEY'
  | 'SQUARE_KEY'
  | 'SHOPIFY_KEY'
  | 'HEROKU_KEY'
  | 'VERCEL_TOKEN'
  | 'NETLIFY_TOKEN'
  | 'DIGITALOCEAN_TOKEN'
  | 'SSH_KEY'
  | 'GPG_KEY'
  | 'ENCRYPTION_KEY'
  | 'HASH'
  | 'UUID';

/** 单个检测规则 */
export interface DetectionRule {
  /** 规则唯一标识 */
  id: string;
  /** 规则名称 */
  name: string;
  /** 敏感类型 */
  type: SensitiveType;
  /** 正则表达式 */
  pattern: RegExp;
  /** 规则优先级（越高越先匹配） */
  priority: number;
  /** 是否默认启用 */
  defaultEnabled: boolean;
  /** 描述 */
  description?: string;
  /** 用于提取实际敏感值的组索引（默认为 0 即整个匹配） */
  captureGroup?: number;
}

/** 检测到的敏感信息匹配项 */
export interface SensitiveMatch {
  /** 匹配的规则 ID */
  ruleId: string;
  /** 敏感类型 */
  type: SensitiveType;
  /** 原始敏感值 */
  originalValue: string;
  /** 生成的占位符 */
  placeholder: string;
  /** 在原文中的起始位置 */
  startIndex: number;
  /** 在原文中的结束位置 */
  endIndex: number;
  /** 所在行号（1-based） */
  lineNumber: number;
  /** 上下文片段（脱敏后，用于报告展示） */
  contextSnippet: string;
}

/** 占位符映射条目 */
export interface PlaceholderMapping {
  /** 占位符字符串 */
  placeholder: string;
  /** 原始敏感值 */
  originalValue: string;
  /** 敏感类型 */
  type: SensitiveType;
  /** 校验码 */
  checksum: string;
  /** 创建时间戳 */
  createdAt: number;
}

/** 会话数据（用于导入导出） */
export interface RedactorSession {
  /** 会话版本号 */
  version: string;
  /** 创建时间戳 */
  createdAt: number;
  /** 占位符映射表 */
  mappings: PlaceholderMapping[];
  /** 会话 ID */
  sessionId: string;
}

/** 脱敏报告 */
export interface SanitizeReport {
  /** 总匹配数 */
  totalMatches: number;
  /** 按类型分组的匹配数 */
  matchesByType: Record<SensitiveType, number>;
  /** 匹配详情（不含原始值全量，只含上下文片段） */
  matches: Array<{
    type: SensitiveType;
    lineNumber: number;
    contextSnippet: string;
    placeholderPreview: string;
  }>;
  /** 处理耗时（毫秒） */
  processingTime: number;
}

/** 脱敏结果 */
export interface SanitizeResult {
  /** 脱敏后的文本 */
  outputText: string;
  /** 脱敏报告 */
  report: SanitizeReport;
  /** 会话数据 */
  session: RedactorSession;
  /** 是否成功 */
  success: boolean;
  /** 错误信息 */
  error?: string;
}

/** 恢复报告 */
export interface RestoreReport {
  /** 成功恢复的占位符数量 */
  restoredCount: number;
  /** 未找到映射的占位符 */
  unmatchedPlaceholders: string[];
  /** 校验失败的占位符 */
  checksumFailures: string[];
  /** 处理耗时（毫秒） */
  processingTime: number;
}

/** 恢复结果 */
export interface RestoreResult {
  /** 恢复后的文本 */
  restoredText: string;
  /** 恢复报告 */
  report: RestoreReport;
  /** 是否成功 */
  success: boolean;
  /** 错误信息 */
  error?: string;
}

/** 预设配置 */
export interface PresetConfig {
  /** 预设 ID */
  id: string;
  /** 预设名称 */
  name: string;
  /** 启用的规则 ID 列表 */
  enabledRules: string[];
  /** 禁用的规则 ID 列表 */
  disabledRules: string[];
  /** 描述 */
  description?: string;
}

/** 脱敏引擎配置 */
export interface EngineConfig {
  /** 占位符前缀 */
  placeholderPrefix: string;
  /** 是否生成详细报告 */
  detailedReport: boolean;
  /** 上下文片段长度 */
  contextLength: number;
}

/** 默认引擎配置 */
export const DEFAULT_ENGINE_CONFIG: EngineConfig = {
  placeholderPrefix: 'PTN',
  detailedReport: true,
  contextLength: 30,
};
