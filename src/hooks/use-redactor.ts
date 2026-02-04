'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { RedactorSession, SanitizeResult, RestoreResult } from '@/lib/engine/types';
import { createEngine } from '@/lib/engine';
import { getPresetRuleIds } from '@/lib/presets';
import { getAllRules, getDefaultEnabledRules } from '@/lib/engine/rules';
import {
  mergeSessions,
  downloadSession,
  readSessionFromFile,
} from '@/lib/session-store';

export interface UseRedactorOptions {
  preset?: string;
}

export interface UseRedactorReturn {
  // 状态
  session: RedactorSession | null;
  lastSanitizeResult: SanitizeResult | null;
  lastRestoreResult: RestoreResult | null;
  isProcessing: boolean;
  
  // 统计
  mappingCount: number;
  
  // 操作
  sanitize: (text: string) => SanitizeResult;
  restore: (text: string) => RestoreResult;
  clearSession: () => void;
  exportSession: () => void;
  importSession: (file: File) => Promise<boolean>;
  
  // 预设
  currentPreset: string;
  setPreset: (preset: string) => void;
  
  // 规则管理
  enabledRuleIds: Set<string>;
  toggleRule: (ruleId: string) => void;
  enableAllRules: () => void;
  disableAllRules: () => void;
  resetRulesToDefault: () => void;
}

/**
 * 脱敏工具 React Hook
 * 
 * 管理会话状态和脱敏/恢复操作
 */
export function useRedactor(options: UseRedactorOptions = {}): UseRedactorReturn {
  const [session, setSession] = useState<RedactorSession | null>(null);
  const [lastSanitizeResult, setLastSanitizeResult] = useState<SanitizeResult | null>(null);
  const [lastRestoreResult, setLastRestoreResult] = useState<RestoreResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPreset, setCurrentPresetState] = useState(options.preset || 'default');
  const [enabledRuleIds, setEnabledRuleIds] = useState<Set<string>>(() => 
    new Set(getDefaultEnabledRules().map(r => r.id))
  );
  
  const engineRef = useRef(createEngine());

  // 初始化预设规则
  useEffect(() => {
    const ruleIds = getPresetRuleIds(options.preset || 'default');
    engineRef.current.setEnabledRules(ruleIds);
    setEnabledRuleIds(new Set(ruleIds));
  }, [options.preset]);

  // 更新预设
  const setPreset = useCallback((preset: string) => {
    setCurrentPresetState(preset);
    const ruleIds = getPresetRuleIds(preset);
    engineRef.current.setEnabledRules(ruleIds);
    setEnabledRuleIds(new Set(ruleIds));
  }, []);

  // 切换单个规则
  const toggleRule = useCallback((ruleId: string) => {
    setEnabledRuleIds(prev => {
      const next = new Set(prev);
      if (next.has(ruleId)) {
        next.delete(ruleId);
      } else {
        next.add(ruleId);
      }
      engineRef.current.setEnabledRules(Array.from(next));
      return next;
    });
  }, []);

  // 启用所有规则
  const enableAllRules = useCallback(() => {
    const allIds = getAllRules().map(r => r.id);
    setEnabledRuleIds(new Set(allIds));
    engineRef.current.setEnabledRules(allIds);
  }, []);

  // 禁用所有规则
  const disableAllRules = useCallback(() => {
    setEnabledRuleIds(new Set());
    engineRef.current.setEnabledRules([]);
  }, []);

  // 重置为默认
  const resetRulesToDefault = useCallback(() => {
    const defaultIds = getDefaultEnabledRules().map(r => r.id);
    setEnabledRuleIds(new Set(defaultIds));
    engineRef.current.setEnabledRules(defaultIds);
  }, []);

  // 脱敏操作
  const sanitize = useCallback((text: string): SanitizeResult => {
    setIsProcessing(true);
    
    try {
      const result = engineRef.current.sanitize(text);
      setLastSanitizeResult(result);
      
      // 合并会话
      if (result.success && result.session.mappings.length > 0) {
        setSession(prev => mergeSessions(prev, result.session));
      }
      
      return result;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // 恢复操作
  const restore = useCallback((text: string): RestoreResult => {
    setIsProcessing(true);
    
    try {
      if (!session) {
        return {
          restoredText: text,
          report: {
            restoredCount: 0,
            unmatchedPlaceholders: [],
            checksumFailures: [],
            processingTime: 0,
          },
          success: false,
          error: 'No session available. Please import a session file first.',
        };
      }
      
      const result = engineRef.current.restore(text, session);
      setLastRestoreResult(result);
      return result;
    } finally {
      setIsProcessing(false);
    }
  }, [session]);

  // 清除会话
  const clearSession = useCallback(() => {
    setSession(null);
    setLastSanitizeResult(null);
    setLastRestoreResult(null);
  }, []);

  // 导出会话
  const exportSession = useCallback(() => {
    if (session && session.mappings.length > 0) {
      downloadSession(session);
    }
  }, [session]);

  // 导入会话
  const importSession = useCallback(async (file: File): Promise<boolean> => {
    const imported = await readSessionFromFile(file);
    
    if (imported) {
      setSession(prev => mergeSessions(prev, imported));
      return true;
    }
    
    return false;
  }, []);

  return {
    session,
    lastSanitizeResult,
    lastRestoreResult,
    isProcessing,
    mappingCount: session?.mappings.length || 0,
    sanitize,
    restore,
    clearSession,
    exportSession,
    importSession,
    currentPreset,
    setPreset,
    enabledRuleIds,
    toggleRule,
    enableAllRules,
    disableAllRules,
    resetRulesToDefault,
  };
}
