/**
 * AI Redactor - 预设配置
 * 
 * 每个 topic 对应一组优化的规则配置
 */

import type { PresetConfig } from './engine/types';

/** 所有预设配置 */
export const PRESETS: Record<string, PresetConfig> = {
  // ==================== 通用 ====================
  default: {
    id: 'default',
    name: 'Default',
    enabledRules: [
      'private-key-block',
      'jwt-token',
      'bearer-token',
      'basic-auth',
      'cookie-header',
      'set-cookie-header',
      'github-pat',
      'github-oauth',
      'github-app',
      'openai-key',
      'anthropic-key',
      'stripe-key',
      'aws-access-key',
      'aws-secret-key',
      'postgres-url',
      'mysql-url',
      'mongodb-url',
      'redis-url',
      'url-token-param',
      'generic-password',
      'generic-secret',
      'generic-api-key',
    ],
    disabledRules: ['hex-token-32', 'base64-long'],
    description: 'Standard detection rules for common sensitive data',
  },

  // ==================== JWT ====================
  jwt: {
    id: 'jwt',
    name: 'JWT Token',
    enabledRules: [
      'jwt-token',
      'bearer-token',
    ],
    disabledRules: [],
    description: 'Optimized for JSON Web Tokens',
  },

  // ==================== API Key ====================
  'api-key': {
    id: 'api-key',
    name: 'API Keys',
    enabledRules: [
      'openai-key',
      'anthropic-key',
      'stripe-key',
      'aws-access-key',
      'aws-secret-key',
      'generic-api-key',
      'env-api-key',
    ],
    disabledRules: [],
    description: 'Focused on API keys and access tokens',
  },

  // ==================== Bearer Token ====================
  'bearer-token': {
    id: 'bearer-token',
    name: 'Bearer Token',
    enabledRules: [
      'bearer-token',
      'jwt-token',
      'basic-auth',
    ],
    disabledRules: [],
    description: 'Authorization header tokens',
  },

  // ==================== Cookies ====================
  cookies: {
    id: 'cookies',
    name: 'Cookies',
    enabledRules: [
      'cookie-header',
      'set-cookie-header',
    ],
    disabledRules: [],
    description: 'HTTP cookies only',
  },

  // ==================== ENV ====================
  env: {
    id: 'env',
    name: '.env Files',
    enabledRules: [
      'env-api-key',
      'env-database-url',
      'generic-password',
      'generic-secret',
      'generic-api-key',
      'postgres-url',
      'mysql-url',
      'mongodb-url',
      'redis-url',
    ],
    disabledRules: [],
    description: 'Environment variable files',
  },

  // ==================== Private Key ====================
  'private-key': {
    id: 'private-key',
    name: 'Private Keys',
    enabledRules: [
      'private-key-block',
    ],
    disabledRules: [],
    description: 'RSA, EC, and other private keys',
  },

  // ==================== Authorization Header ====================
  'authorization-header': {
    id: 'authorization-header',
    name: 'Auth Headers',
    enabledRules: [
      'bearer-token',
      'basic-auth',
      'jwt-token',
    ],
    disabledRules: [],
    description: 'HTTP Authorization headers',
  },

  // ==================== URL Params ====================
  'url-params': {
    id: 'url-params',
    name: 'URL Parameters',
    enabledRules: [
      'url-token-param',
    ],
    disabledRules: [],
    description: 'Sensitive URL query parameters',
  },

  // ==================== Database URL ====================
  'database-url': {
    id: 'database-url',
    name: 'Database URLs',
    enabledRules: [
      'postgres-url',
      'mysql-url',
      'mongodb-url',
      'redis-url',
      'env-database-url',
    ],
    disabledRules: [],
    description: 'Database connection strings',
  },

  // ==================== GitHub Token ====================
  'github-token': {
    id: 'github-token',
    name: 'GitHub Tokens',
    enabledRules: [
      'github-pat',
      'github-oauth',
      'github-app',
    ],
    disabledRules: [],
    description: 'GitHub personal access tokens and app tokens',
  },

  // ==================== 中文映射（使用相同规则） ====================
  token: {
    id: 'token',
    name: '令牌',
    enabledRules: [
      'jwt-token',
      'bearer-token',
      'github-pat',
      'github-oauth',
      'url-token-param',
    ],
    disabledRules: [],
    description: '通用令牌检测',
  },

  cookie: {
    id: 'cookie',
    name: 'Cookie',
    enabledRules: [
      'cookie-header',
      'set-cookie-header',
    ],
    disabledRules: [],
    description: 'HTTP Cookie',
  },

  'auth-header': {
    id: 'auth-header',
    name: '认证头',
    enabledRules: [
      'bearer-token',
      'basic-auth',
      'jwt-token',
    ],
    disabledRules: [],
    description: 'HTTP 认证头',
  },

  'url-param': {
    id: 'url-param',
    name: 'URL 参数',
    enabledRules: [
      'url-token-param',
    ],
    disabledRules: [],
    description: 'URL 中的敏感参数',
  },

  'db-url': {
    id: 'db-url',
    name: '数据库连接',
    enabledRules: [
      'postgres-url',
      'mysql-url',
      'mongodb-url',
      'redis-url',
      'env-database-url',
    ],
    disabledRules: [],
    description: '数据库连接字符串',
  },

  github: {
    id: 'github',
    name: 'GitHub 令牌',
    enabledRules: [
      'github-pat',
      'github-oauth',
      'github-app',
    ],
    disabledRules: [],
    description: 'GitHub 个人访问令牌',
  },
};

/**
 * 获取预设配置
 */
export function getPreset(id: string): PresetConfig {
  return PRESETS[id] || PRESETS.default;
}

/**
 * 获取预设的规则 ID 列表
 */
export function getPresetRuleIds(id: string): string[] {
  const preset = getPreset(id);
  return preset.enabledRules;
}

/**
 * 获取所有可用预设
 */
export function getAllPresets(): PresetConfig[] {
  return Object.values(PRESETS);
}
