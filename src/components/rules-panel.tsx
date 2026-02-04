'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { getAllRules, getRulesByCategory } from '@/lib/engine/rules';
import type { DetectionRule } from '@/lib/engine/types';
import {
  ChevronDown,
  ChevronRight,
  Settings,
  Search,
  Check,
  X,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

interface RulesPanelProps {
  locale?: 'en' | 'zh';
  enabledRuleIds: Set<string>;
  onToggleRule: (ruleId: string) => void;
  onEnableAll: () => void;
  onDisableAll: () => void;
  onResetToDefault: () => void;
}

const LABELS = {
  en: {
    title: 'Detection Rules',
    subtitle: 'Enable or disable specific rules',
    searchPlaceholder: 'Search rules...',
    enableAll: 'Enable All',
    disableAll: 'Disable All',
    resetDefault: 'Reset to Default',
    enabled: 'Enabled',
    disabled: 'Disabled',
    totalRules: 'Total',
    categories: {
      'Auth & Tokens': 'Auth & Tokens',
      'API Keys': 'API Keys',
      'Cloud Services': 'Cloud Services',
      'Social & Messaging': 'Social & Messaging',
      'Personal Info': 'Personal Info',
      'Network': 'Network',
      'Financial': 'Financial',
      'Encryption': 'Encryption',
      'Generic': 'Generic',
    },
  },
  zh: {
    title: '检测规则',
    subtitle: '开关特定规则',
    searchPlaceholder: '搜索规则...',
    enableAll: '全部启用',
    disableAll: '全部禁用',
    resetDefault: '恢复默认',
    enabled: '已启用',
    disabled: '已禁用',
    totalRules: '总计',
    categories: {
      'Auth & Tokens': '认证 & 令牌',
      'API Keys': 'API 密钥',
      'Cloud Services': '云服务',
      'Social & Messaging': '社交 & 通讯',
      'Personal Info': '个人信息',
      'Network': '网络',
      'Financial': '金融',
      'Encryption': '加密',
      'Generic': '通用',
    },
  },
};

export function RulesPanel({
  locale = 'en',
  enabledRuleIds,
  onToggleRule,
  onEnableAll,
  onDisableAll,
  onResetToDefault,
}: RulesPanelProps) {
  const labels = LABELS[locale];
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Auth & Tokens', 'API Keys']));
  
  const allRules = useMemo(() => getAllRules(), []);
  const rulesByCategory = useMemo(() => getRulesByCategory(), []);
  
  const enabledCount = enabledRuleIds.size;
  const totalCount = allRules.length;
  
  // 过滤规则
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return rulesByCategory;
    
    const query = searchQuery.toLowerCase();
    const filtered: Record<string, DetectionRule[]> = {};
    
    for (const [category, rules] of Object.entries(rulesByCategory)) {
      const matchedRules = rules.filter(rule => 
        rule.name.toLowerCase().includes(query) ||
        rule.description?.toLowerCase().includes(query) ||
        rule.type.toLowerCase().includes(query)
      );
      if (matchedRules.length > 0) {
        filtered[category] = matchedRules;
      }
    }
    
    return filtered;
  }, [rulesByCategory, searchQuery]);
  
  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  return (
    <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-light)] overflow-hidden">
      {/* 头部 */}
      <div className="p-4 border-b border-[var(--border-light)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-[var(--accent-primary)]" />
            <h3 className="font-semibold">{labels.title}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[var(--text-muted)]">{labels.enabled}:</span>
            <span className="tag tag-success">{enabledCount}</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-muted)]">{totalCount}</span>
          </div>
        </div>
        
        {/* 搜索框 */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent-primary)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X size={14} />
            </button>
          )}
        </div>
        
        {/* 快捷操作 */}
        <div className="flex items-center gap-2">
          <button
            onClick={onEnableAll}
            className="btn btn-secondary text-xs px-2 py-1"
          >
            {labels.enableAll}
          </button>
          <button
            onClick={onDisableAll}
            className="btn btn-secondary text-xs px-2 py-1"
          >
            {labels.disableAll}
          </button>
          <button
            onClick={onResetToDefault}
            className="btn btn-ghost text-xs px-2 py-1"
          >
            {labels.resetDefault}
          </button>
        </div>
      </div>
      
      {/* 规则列表 */}
      <div className="max-h-[400px] overflow-y-auto">
        {Object.entries(filteredCategories).map(([category, rules]) => (
          <div key={category} className="border-b border-[var(--border-light)] last:border-b-0">
            {/* 分类标题 */}
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between p-3 hover:bg-[var(--bg-primary)] transition-colors"
            >
              <div className="flex items-center gap-2">
                {expandedCategories.has(category) ? (
                  <ChevronDown size={16} className="text-[var(--text-muted)]" />
                ) : (
                  <ChevronRight size={16} className="text-[var(--text-muted)]" />
                )}
                <span className="font-medium text-sm">
                  {labels.categories[category as keyof typeof labels.categories] || category}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  ({rules.filter(r => enabledRuleIds.has(r.id)).length}/{rules.length})
                </span>
              </div>
            </button>
            
            {/* 规则项 */}
            {expandedCategories.has(category) && (
              <div className="bg-[var(--bg-primary)]">
                {rules.map((rule) => {
                  const isEnabled = enabledRuleIds.has(rule.id);
                  return (
                    <div
                      key={rule.id}
                      className="flex items-center justify-between px-4 py-2 border-t border-[var(--border-light)] hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-sm font-medium truncate",
                            !isEnabled && "text-[var(--text-muted)]"
                          )}>
                            {rule.name}
                          </span>
                          {!rule.defaultEnabled && (
                            <span className="text-xs px-1.5 py-0.5 bg-amber-900/30 text-amber-400 rounded border border-amber-700/50">
                              {locale === 'en' ? 'Off by default' : '默认关闭'}
                            </span>
                          )}
                        </div>
                        {rule.description && (
                          <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
                            {rule.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => onToggleRule(rule.id)}
                        className={cn(
                          "flex-shrink-0 transition-colors",
                          isEnabled ? "text-[var(--accent-primary)]" : "text-[var(--text-muted)]"
                        )}
                      >
                        {isEnabled ? (
                          <ToggleRight size={24} />
                        ) : (
                          <ToggleLeft size={24} />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        
        {Object.keys(filteredCategories).length === 0 && (
          <div className="p-8 text-center text-[var(--text-muted)]">
            {locale === 'en' ? 'No rules found' : '未找到规则'}
          </div>
        )}
      </div>
    </div>
  );
}
