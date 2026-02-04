/**
 * AI Redactor - 占位符生成与校验
 * 
 * 占位符格式：⟦PTN:TYPE:INDEX:CHECKSUM⟧
 * 例如：⟦PTN:JWT:1:6F3A⟧
 */

import type { SensitiveType } from './types';

/** 占位符前缀 */
const PREFIX = 'PTN';

/** 占位符边界字符 */
const OPEN = '⟦';
const CLOSE = '⟧';

/** 占位符正则（用于恢复时扫描） */
export const PLACEHOLDER_REGEX = /⟦PTN:([A-Z_]+):(\d+):([A-F0-9]{4})⟧/g;

/**
 * 生成 4 位十六进制校验码
 * 基于原始值的简单哈希，用于防止误替换
 */
export function generateChecksum(value: string): string {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  // 取低 16 位，转为 4 位十六进制
  return ((hash >>> 0) & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

/**
 * 验证校验码
 */
export function verifyChecksum(value: string, checksum: string): boolean {
  return generateChecksum(value) === checksum.toUpperCase();
}

/**
 * 生成占位符
 * 
 * @param type - 敏感类型
 * @param index - 序号（同类型的第几个）
 * @param originalValue - 原始值（用于生成校验码）
 * @param prefix - 自定义前缀（默认 PTN）
 */
export function generatePlaceholder(
  type: SensitiveType,
  index: number,
  originalValue: string,
  prefix: string = PREFIX
): string {
  const checksum = generateChecksum(originalValue);
  return `${OPEN}${prefix}:${type}:${index}:${checksum}${CLOSE}`;
}

/**
 * 解析占位符
 * 
 * @returns 解析结果，失败返回 null
 */
export function parsePlaceholder(placeholder: string): {
  prefix: string;
  type: SensitiveType;
  index: number;
  checksum: string;
} | null {
  const match = placeholder.match(/⟦([A-Z]+):([A-Z_]+):(\d+):([A-F0-9]{4})⟧/);
  if (!match) return null;
  
  return {
    prefix: match[1],
    type: match[2] as SensitiveType,
    index: parseInt(match[3], 10),
    checksum: match[4],
  };
}

/**
 * 查找文本中的所有占位符
 */
export function findAllPlaceholders(text: string): Array<{
  placeholder: string;
  type: SensitiveType;
  index: number;
  checksum: string;
  position: number;
}> {
  const results: Array<{
    placeholder: string;
    type: SensitiveType;
    index: number;
    checksum: string;
    position: number;
  }> = [];
  
  // 重置正则的 lastIndex
  PLACEHOLDER_REGEX.lastIndex = 0;
  
  let match: RegExpExecArray | null;
  while ((match = PLACEHOLDER_REGEX.exec(text)) !== null) {
    results.push({
      placeholder: match[0],
      type: match[1] as SensitiveType,
      index: parseInt(match[2], 10),
      checksum: match[3],
      position: match.index,
    });
  }
  
  return results;
}

/**
 * 检查文本是否包含占位符
 */
export function containsPlaceholders(text: string): boolean {
  PLACEHOLDER_REGEX.lastIndex = 0;
  return PLACEHOLDER_REGEX.test(text);
}

/**
 * 统计占位符数量
 */
export function countPlaceholders(text: string): number {
  PLACEHOLDER_REGEX.lastIndex = 0;
  const matches = text.match(PLACEHOLDER_REGEX);
  return matches ? matches.length : 0;
}
