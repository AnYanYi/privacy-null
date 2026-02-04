/**
 * AI Redactor - 会话存储管理
 * 
 * 100% 本地存储，支持导入导出
 */

import type { RedactorSession, PlaceholderMapping } from './engine/types';
import { nanoid } from 'nanoid';

/** 会话版本号 */
const SESSION_VERSION = '1.0.0';

/** 导出文件名前缀 */
const EXPORT_FILENAME_PREFIX = 'ptn-session';

/**
 * 会话存储 Hook 返回类型
 */
export interface SessionStoreState {
  /** 当前会话 */
  session: RedactorSession | null;
  /** 会话是否有效 */
  hasValidSession: boolean;
  /** 映射条目数量 */
  mappingCount: number;
}

/**
 * 创建空会话
 */
export function createEmptySession(): RedactorSession {
  return {
    version: SESSION_VERSION,
    createdAt: Date.now(),
    mappings: [],
    sessionId: nanoid(10),
  };
}

/**
 * 合并会话（用于追加映射）
 */
export function mergeSessions(
  existing: RedactorSession | null,
  newSession: RedactorSession
): RedactorSession {
  if (!existing) {
    return newSession;
  }
  
  // 合并映射，去重
  const existingPlaceholders = new Set(existing.mappings.map(m => m.placeholder));
  const newMappings = newSession.mappings.filter(
    m => !existingPlaceholders.has(m.placeholder)
  );
  
  return {
    ...existing,
    mappings: [...existing.mappings, ...newMappings],
  };
}

/**
 * 序列化会话为 JSON 字符串
 */
export function serializeSession(session: RedactorSession): string {
  return JSON.stringify(session, null, 2);
}

/**
 * 反序列化 JSON 字符串为会话
 */
export function deserializeSession(json: string): RedactorSession | null {
  try {
    const parsed = JSON.parse(json);
    
    // 验证必要字段
    if (
      typeof parsed.version !== 'string' ||
      typeof parsed.createdAt !== 'number' ||
      !Array.isArray(parsed.mappings) ||
      typeof parsed.sessionId !== 'string'
    ) {
      return null;
    }
    
    // 验证映射条目
    for (const mapping of parsed.mappings) {
      if (
        typeof mapping.placeholder !== 'string' ||
        typeof mapping.originalValue !== 'string' ||
        typeof mapping.type !== 'string' ||
        typeof mapping.checksum !== 'string'
      ) {
        return null;
      }
    }
    
    return parsed as RedactorSession;
  } catch {
    return null;
  }
}

/**
 * 生成导出文件名
 */
export function generateExportFilename(): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  return `${EXPORT_FILENAME_PREFIX}-${timestamp}.json`;
}

/**
 * 触发文件下载（浏览器端）
 */
export function downloadSession(session: RedactorSession): void {
  const json = serializeSession(session);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = generateExportFilename();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 从文件读取会话（浏览器端）
 */
export function readSessionFromFile(file: File): Promise<RedactorSession | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content !== 'string') {
        resolve(null);
        return;
      }
      
      const session = deserializeSession(content);
      resolve(session);
    };
    
    reader.onerror = () => {
      resolve(null);
    };
    
    reader.readAsText(file);
  });
}

/**
 * 加密会话（简单 XOR 加密，用于增加一层保护）
 * 注意：这不是安全加密，只是混淆
 */
export function encryptSession(session: RedactorSession, key: string): string {
  const json = serializeSession(session);
  const encoded = btoa(unescape(encodeURIComponent(json)));
  
  // 简单 XOR
  let result = '';
  for (let i = 0; i < encoded.length; i++) {
    const charCode = encoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  
  return btoa(result);
}

/**
 * 解密会话
 */
export function decryptSession(encrypted: string, key: string): RedactorSession | null {
  try {
    const decoded = atob(encrypted);
    
    // 反向 XOR
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    
    const json = decodeURIComponent(escape(atob(result)));
    return deserializeSession(json);
  } catch {
    return null;
  }
}

/**
 * 获取会话统计信息
 */
export function getSessionStats(session: RedactorSession): {
  totalMappings: number;
  byType: Record<string, number>;
  createdAt: Date;
  sessionId: string;
} {
  const byType: Record<string, number> = {};
  
  for (const mapping of session.mappings) {
    byType[mapping.type] = (byType[mapping.type] || 0) + 1;
  }
  
  return {
    totalMappings: session.mappings.length,
    byType,
    createdAt: new Date(session.createdAt),
    sessionId: session.sessionId,
  };
}
