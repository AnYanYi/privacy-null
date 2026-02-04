/**
 * AI Redactor - 检测规则定义
 * 
 * 规则按优先级排序，高优先级规则先匹配
 * 所有正则都经过优化，避免 ReDoS 攻击
 */

import type { DetectionRule, SensitiveType } from './types';

/**
 * 所有检测规则
 * 按类型组织，每个规则都有明确的正则和优先级
 */
export const DETECTION_RULES: DetectionRule[] = [
  // ==================== 私钥块 ====================
  {
    id: 'private-key-block',
    name: 'Private Key Block',
    type: 'PRIVATE_KEY',
    pattern: /-----BEGIN\s+(?:RSA\s+|EC\s+|DSA\s+|OPENSSH\s+|PGP\s+)?PRIVATE\s+KEY(?:\s+BLOCK)?-----[\s\S]*?-----END\s+(?:RSA\s+|EC\s+|DSA\s+|OPENSSH\s+|PGP\s+)?PRIVATE\s+KEY(?:\s+BLOCK)?-----/g,
    priority: 100,
    defaultEnabled: true,
    description: 'RSA/EC/DSA/OpenSSH/PGP 私钥块',
  },

  // ==================== JWT ====================
  {
    id: 'jwt-token',
    name: 'JWT Token',
    type: 'JWT',
    // JWT: base64url.base64url.base64url (至少包含两个点，每段至少有字符)
    pattern: /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g,
    priority: 95,
    defaultEnabled: true,
    description: 'JSON Web Token (eyJ开头)',
  },

  // ==================== Authorization Header ====================
  {
    id: 'bearer-token',
    name: 'Bearer Token',
    type: 'BEARER_TOKEN',
    pattern: /(?:Authorization:\s*)?Bearer\s+[A-Za-z0-9_-]{20,}/gi,
    priority: 90,
    defaultEnabled: true,
    description: 'Bearer Token 认证',
  },
  {
    id: 'basic-auth',
    name: 'Basic Auth',
    type: 'AUTH_HEADER',
    pattern: /Authorization:\s*Basic\s+[A-Za-z0-9+/=]{10,}/gi,
    priority: 90,
    defaultEnabled: true,
    description: 'Basic 认证',
  },

  // ==================== Cookie ====================
  {
    id: 'cookie-header',
    name: 'Cookie Header',
    type: 'COOKIE',
    pattern: /Cookie:\s*[^\r\n]{10,}/gi,
    priority: 85,
    defaultEnabled: true,
    description: 'HTTP Cookie 请求头',
  },
  {
    id: 'set-cookie-header',
    name: 'Set-Cookie Header',
    type: 'SET_COOKIE',
    pattern: /Set-Cookie:\s*[^\r\n]{10,}/gi,
    priority: 85,
    defaultEnabled: true,
    description: 'HTTP Set-Cookie 响应头',
  },

  // ==================== GitHub Token ====================
  {
    id: 'github-pat',
    name: 'GitHub Personal Access Token',
    type: 'GITHUB_TOKEN',
    pattern: /ghp_[A-Za-z0-9]{36,}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'GitHub Personal Access Token (ghp_)',
  },
  {
    id: 'github-oauth',
    name: 'GitHub OAuth Token',
    type: 'GITHUB_TOKEN',
    pattern: /gho_[A-Za-z0-9]{36,}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'GitHub OAuth Token (gho_)',
  },
  {
    id: 'github-app',
    name: 'GitHub App Token',
    type: 'GITHUB_TOKEN',
    pattern: /(?:ghu|ghs|ghr)_[A-Za-z0-9]{36,}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'GitHub App Token (ghu_/ghs_/ghr_)',
  },

  // ==================== API Keys (常见格式) ====================
  {
    id: 'openai-key',
    name: 'OpenAI API Key',
    type: 'API_KEY',
    pattern: /sk-[A-Za-z0-9]{32,}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'OpenAI API Key (sk-)',
  },
  {
    id: 'anthropic-key',
    name: 'Anthropic API Key',
    type: 'API_KEY',
    pattern: /sk-ant-[A-Za-z0-9-]{32,}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Anthropic API Key (sk-ant-)',
  },
  {
    id: 'stripe-key',
    name: 'Stripe API Key',
    type: 'API_KEY',
    pattern: /(?:sk|pk)_(?:test|live)_[A-Za-z0-9]{24,}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Stripe API Key (sk_/pk_)',
  },
  {
    id: 'aws-access-key',
    name: 'AWS Access Key ID',
    type: 'API_KEY',
    pattern: /AKIA[0-9A-Z]{16}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'AWS Access Key ID (AKIA)',
  },
  {
    id: 'aws-secret-key',
    name: 'AWS Secret Key',
    type: 'SECRET',
    pattern: /(?:aws_secret_access_key|AWS_SECRET_ACCESS_KEY)\s*[=:]\s*['"]?([A-Za-z0-9/+=]{40})['"]?/g,
    priority: 87,
    defaultEnabled: true,
    description: 'AWS Secret Access Key',
    captureGroup: 1,
  },

  // ==================== 数据库连接串 ====================
  {
    id: 'postgres-url',
    name: 'PostgreSQL URL',
    type: 'DATABASE_URL',
    pattern: /postgres(?:ql)?:\/\/[^\s'"<>]{10,}/gi,
    priority: 85,
    defaultEnabled: true,
    description: 'PostgreSQL 连接串',
  },
  {
    id: 'mysql-url',
    name: 'MySQL URL',
    type: 'DATABASE_URL',
    pattern: /mysql:\/\/[^\s'"<>]{10,}/gi,
    priority: 85,
    defaultEnabled: true,
    description: 'MySQL 连接串',
  },
  {
    id: 'mongodb-url',
    name: 'MongoDB URL',
    type: 'DATABASE_URL',
    pattern: /mongodb(?:\+srv)?:\/\/[^\s'"<>]{10,}/gi,
    priority: 85,
    defaultEnabled: true,
    description: 'MongoDB 连接串',
  },
  {
    id: 'redis-url',
    name: 'Redis URL',
    type: 'DATABASE_URL',
    pattern: /redis(?:s)?:\/\/[^\s'"<>]{10,}/gi,
    priority: 85,
    defaultEnabled: true,
    description: 'Redis 连接串',
  },

  // ==================== URL 敏感参数 ====================
  {
    id: 'url-token-param',
    name: 'URL Token Parameter',
    type: 'URL_PARAM',
    pattern: /[?&](?:token|access_token|api_key|apikey|key|secret|sig|signature|auth)=([^&\s'"]{8,})/gi,
    priority: 80,
    defaultEnabled: true,
    description: 'URL 中的敏感查询参数',
    captureGroup: 1,
  },

  // ==================== ENV 变量 ====================
  {
    id: 'env-api-key',
    name: 'ENV API Key',
    type: 'ENV_VAR',
    pattern: /^([A-Z_]*(?:API_KEY|APIKEY|SECRET|TOKEN|PASSWORD|PASSWD|PWD|PRIVATE_KEY|ACCESS_KEY|AUTH)[A-Z_]*)\s*=\s*['"]?([^\s'"#]+)['"]?/gim,
    priority: 75,
    defaultEnabled: true,
    description: '.env 文件中的敏感变量',
    captureGroup: 2,
  },
  {
    id: 'env-database-url',
    name: 'ENV Database URL',
    type: 'ENV_VAR',
    pattern: /^(DATABASE_URL|DB_URL|MONGODB_URI|REDIS_URL|POSTGRES_URL)\s*=\s*['"]?([^\s'"#]+)['"]?/gim,
    priority: 75,
    defaultEnabled: true,
    description: '.env 文件中的数据库连接',
    captureGroup: 2,
  },

  // ==================== 通用敏感关键词邻近 ====================
  {
    id: 'generic-password',
    name: 'Generic Password',
    type: 'PASSWORD',
    pattern: /(?:password|passwd|pwd)\s*[=:]\s*['"]?([^\s'"]{6,})['"]?/gi,
    priority: 70,
    defaultEnabled: true,
    description: '通用密码字段',
    captureGroup: 1,
  },
  {
    id: 'generic-secret',
    name: 'Generic Secret',
    type: 'SECRET',
    pattern: /(?:secret|client_secret|app_secret)\s*[=:]\s*['"]?([^\s'"]{8,})['"]?/gi,
    priority: 70,
    defaultEnabled: true,
    description: '通用 Secret 字段',
    captureGroup: 1,
  },
  {
    id: 'generic-api-key',
    name: 'Generic API Key',
    type: 'API_KEY',
    pattern: /(?:api_key|apikey|api-key)\s*[=:]\s*['"]?([^\s'"]{8,})['"]?/gi,
    priority: 70,
    defaultEnabled: true,
    description: '通用 API Key 字段',
    captureGroup: 1,
  },

  // ==================== 长随机字符串（可能是 token） ====================
  {
    id: 'hex-token-32',
    name: 'Hex Token (32+ chars)',
    type: 'GENERIC',
    pattern: /\b[a-f0-9]{32,}\b/gi,
    priority: 50,
    defaultEnabled: false, // 默认关闭，误报率高
    description: '32+ 字符的十六进制字符串',
  },
  {
    id: 'base64-long',
    name: 'Long Base64 String',
    type: 'GENERIC',
    pattern: /\b[A-Za-z0-9+/]{40,}={0,2}\b/g,
    priority: 40,
    defaultEnabled: false, // 默认关闭，误报率高
    description: '40+ 字符的 Base64 字符串',
  },

  // ==================== 邮箱地址 ====================
  {
    id: 'email-address',
    name: 'Email Address',
    type: 'EMAIL',
    pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    priority: 65,
    defaultEnabled: true,
    description: '电子邮箱地址',
  },

  // ==================== 手机号码 ====================
  {
    id: 'phone-china',
    name: 'China Phone Number',
    type: 'PHONE',
    pattern: /(?<![0-9])1[3-9]\d{9}(?![0-9])/g,
    priority: 65,
    defaultEnabled: true,
    description: '中国大陆手机号码',
  },
  {
    id: 'phone-international',
    name: 'International Phone Number',
    type: 'PHONE',
    pattern: /\+[1-9]\d{1,14}(?![0-9])/g,
    priority: 64,
    defaultEnabled: true,
    description: '国际格式电话号码 (+xxx)',
  },
  {
    id: 'phone-us',
    name: 'US Phone Number',
    type: 'PHONE',
    pattern: /(?<![0-9])(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}(?![0-9])/g,
    priority: 63,
    defaultEnabled: false, // 默认关闭，可能误报
    description: '美国电话号码格式',
  },

  // ==================== IP 地址 ====================
  {
    id: 'ipv4-private',
    name: 'Private IPv4 Address',
    type: 'IP_ADDRESS',
    pattern: /(?<![0-9])(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3})(?![0-9])/g,
    priority: 68,
    defaultEnabled: true,
    description: '内网 IPv4 地址 (10.x/172.16-31.x/192.168.x)',
  },
  {
    id: 'ipv4-public',
    name: 'Public IPv4 Address',
    type: 'IP_ADDRESS',
    pattern: /(?<![0-9])(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?![0-9])/g,
    priority: 60,
    defaultEnabled: false, // 默认关闭，公网 IP 脱敏按需开启
    description: '公网 IPv4 地址',
  },
  {
    id: 'ipv6-address',
    name: 'IPv6 Address',
    type: 'IP_ADDRESS',
    pattern: /(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}/g,
    priority: 60,
    defaultEnabled: false,
    description: 'IPv6 地址',
  },

  // ==================== MAC 地址 ====================
  {
    id: 'mac-address',
    name: 'MAC Address',
    type: 'MAC_ADDRESS',
    pattern: /(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}/g,
    priority: 62,
    defaultEnabled: true,
    description: 'MAC 地址',
  },

  // ==================== 银行卡/信用卡 ====================
  {
    id: 'credit-card-visa',
    name: 'Visa Card Number',
    type: 'CREDIT_CARD',
    pattern: /\b4[0-9]{12}(?:[0-9]{3})?\b/g,
    priority: 80,
    defaultEnabled: true,
    description: 'Visa 信用卡号',
  },
  {
    id: 'credit-card-mastercard',
    name: 'Mastercard Number',
    type: 'CREDIT_CARD',
    pattern: /\b(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}\b/g,
    priority: 80,
    defaultEnabled: true,
    description: 'Mastercard 信用卡号',
  },
  {
    id: 'credit-card-amex',
    name: 'American Express Card',
    type: 'CREDIT_CARD',
    pattern: /\b3[47][0-9]{13}\b/g,
    priority: 80,
    defaultEnabled: true,
    description: 'American Express 卡号',
  },
  {
    id: 'credit-card-china-unionpay',
    name: 'China UnionPay Card',
    type: 'CREDIT_CARD',
    pattern: /\b62[0-9]{14,17}\b/g,
    priority: 80,
    defaultEnabled: true,
    description: '中国银联卡号',
  },

  // ==================== 身份证号 ====================
  {
    id: 'china-id-card',
    name: 'China ID Card Number',
    type: 'ID_CARD',
    pattern: /\b[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dXx]\b/g,
    priority: 82,
    defaultEnabled: true,
    description: '中国大陆身份证号（18位）',
  },
  {
    id: 'us-ssn',
    name: 'US Social Security Number',
    type: 'SSN',
    pattern: /\b(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}\b/g,
    priority: 82,
    defaultEnabled: true,
    description: '美国社会安全号 (SSN)',
  },

  // ==================== Google Cloud ====================
  {
    id: 'google-api-key',
    name: 'Google API Key',
    type: 'GOOGLE_KEY',
    pattern: /AIza[0-9A-Za-z_-]{35}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'Google API Key (AIza)',
  },
  {
    id: 'google-oauth-client',
    name: 'Google OAuth Client ID',
    type: 'GOOGLE_KEY',
    pattern: /[0-9]+-[0-9A-Za-z_]{32}\.apps\.googleusercontent\.com/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Google OAuth Client ID',
  },
  {
    id: 'google-cloud-sa-key',
    name: 'Google Cloud Service Account',
    type: 'GOOGLE_KEY',
    pattern: /"type"\s*:\s*"service_account"[\s\S]*?"private_key"\s*:\s*"[^"]+"/g,
    priority: 95,
    defaultEnabled: true,
    description: 'Google Cloud Service Account JSON',
  },
  {
    id: 'firebase-key',
    name: 'Firebase API Key',
    type: 'GOOGLE_KEY',
    pattern: /AAAA[A-Za-z0-9_-]{7}:[A-Za-z0-9_-]{140}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Firebase Cloud Messaging Key',
  },

  // ==================== Microsoft Azure ====================
  {
    id: 'azure-storage-key',
    name: 'Azure Storage Account Key',
    type: 'AZURE_KEY',
    pattern: /(?:AccountKey|SharedAccessSignature)=([A-Za-z0-9+/=]{44,})/gi,
    priority: 87,
    defaultEnabled: true,
    description: 'Azure Storage Account Key',
    captureGroup: 1,
  },
  {
    id: 'azure-sas-token',
    name: 'Azure SAS Token',
    type: 'AZURE_KEY',
    pattern: /[?&]sig=([A-Za-z0-9%+/=]{40,})/g,
    priority: 86,
    defaultEnabled: true,
    description: 'Azure Shared Access Signature',
    captureGroup: 1,
  },
  {
    id: 'azure-connection-string',
    name: 'Azure Connection String',
    type: 'AZURE_KEY',
    pattern: /DefaultEndpointsProtocol=https?;AccountName=[^;]+;AccountKey=[A-Za-z0-9+/=]{44,}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'Azure Storage Connection String',
  },

  // ==================== Slack ====================
  {
    id: 'slack-token',
    name: 'Slack Token',
    type: 'SLACK_TOKEN',
    pattern: /xox[baprs]-[0-9]{10,13}-[0-9]{10,13}-[a-zA-Z0-9]{24}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'Slack Bot/User/App Token',
  },
  {
    id: 'slack-webhook',
    name: 'Slack Webhook URL',
    type: 'SLACK_TOKEN',
    pattern: /https:\/\/hooks\.slack\.com\/services\/T[A-Z0-9]{8,}\/B[A-Z0-9]{8,}\/[A-Za-z0-9]{24}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'Slack Webhook URL',
  },

  // ==================== Discord ====================
  {
    id: 'discord-token',
    name: 'Discord Bot Token',
    type: 'DISCORD_TOKEN',
    pattern: /[MN][A-Za-z\d]{23,}\.[\w-]{6}\.[\w-]{27}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'Discord Bot Token',
  },
  {
    id: 'discord-webhook',
    name: 'Discord Webhook URL',
    type: 'DISCORD_TOKEN',
    pattern: /https:\/\/(?:ptb\.|canary\.)?discord(?:app)?\.com\/api\/webhooks\/\d+\/[A-Za-z0-9_-]+/g,
    priority: 88,
    defaultEnabled: true,
    description: 'Discord Webhook URL',
  },

  // ==================== Telegram ====================
  {
    id: 'telegram-bot-token',
    name: 'Telegram Bot Token',
    type: 'TELEGRAM_TOKEN',
    pattern: /[0-9]{9,10}:[A-Za-z0-9_-]{35}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'Telegram Bot Token',
  },

  // ==================== Twilio ====================
  {
    id: 'twilio-api-key',
    name: 'Twilio API Key',
    type: 'TWILIO_KEY',
    pattern: /SK[a-f0-9]{32}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Twilio API Key (SK)',
  },
  {
    id: 'twilio-account-sid',
    name: 'Twilio Account SID',
    type: 'TWILIO_KEY',
    pattern: /AC[a-f0-9]{32}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Twilio Account SID (AC)',
  },
  {
    id: 'twilio-auth-token',
    name: 'Twilio Auth Token',
    type: 'TWILIO_KEY',
    pattern: /(?:TWILIO_AUTH_TOKEN|twilio_auth_token)\s*[=:]\s*['"]?([a-f0-9]{32})['"]?/gi,
    priority: 87,
    defaultEnabled: true,
    description: 'Twilio Auth Token',
    captureGroup: 1,
  },

  // ==================== SendGrid ====================
  {
    id: 'sendgrid-api-key',
    name: 'SendGrid API Key',
    type: 'SENDGRID_KEY',
    pattern: /SG\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'SendGrid API Key (SG.)',
  },

  // ==================== Mailgun ====================
  {
    id: 'mailgun-api-key',
    name: 'Mailgun API Key',
    type: 'MAILGUN_KEY',
    pattern: /key-[A-Za-z0-9]{32}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Mailgun API Key',
  },

  // ==================== PayPal ====================
  {
    id: 'paypal-client-id',
    name: 'PayPal Client ID',
    type: 'PAYPAL_KEY',
    pattern: /A[A-Za-z0-9_-]{79}/g,
    priority: 86,
    defaultEnabled: true,
    description: 'PayPal Client ID',
  },

  // ==================== Square ====================
  {
    id: 'square-access-token',
    name: 'Square Access Token',
    type: 'SQUARE_KEY',
    pattern: /sq0atp-[A-Za-z0-9_-]{22}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Square Access Token',
  },
  {
    id: 'square-oauth-secret',
    name: 'Square OAuth Secret',
    type: 'SQUARE_KEY',
    pattern: /sq0csp-[A-Za-z0-9_-]{43}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Square OAuth Secret',
  },

  // ==================== Shopify ====================
  {
    id: 'shopify-token',
    name: 'Shopify Access Token',
    type: 'SHOPIFY_KEY',
    pattern: /shpat_[A-Fa-f0-9]{32}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Shopify Admin API Token',
  },
  {
    id: 'shopify-shared-secret',
    name: 'Shopify Shared Secret',
    type: 'SHOPIFY_KEY',
    pattern: /shpss_[A-Fa-f0-9]{32}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Shopify Shared Secret',
  },

  // ==================== Heroku ====================
  {
    id: 'heroku-api-key',
    name: 'Heroku API Key',
    type: 'HEROKU_KEY',
    pattern: /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi,
    priority: 60,
    defaultEnabled: false, // UUID 格式，可能误报
    description: 'Heroku API Key (UUID 格式)',
  },

  // ==================== Vercel ====================
  {
    id: 'vercel-token',
    name: 'Vercel Token',
    type: 'VERCEL_TOKEN',
    pattern: /(?:VERCEL_TOKEN|vercel_token)\s*[=:]\s*['"]?([A-Za-z0-9]{24})['"]?/gi,
    priority: 87,
    defaultEnabled: true,
    description: 'Vercel Token',
    captureGroup: 1,
  },

  // ==================== Netlify ====================
  {
    id: 'netlify-token',
    name: 'Netlify Personal Access Token',
    type: 'NETLIFY_TOKEN',
    pattern: /(?:NETLIFY_AUTH_TOKEN|netlify_auth_token)\s*[=:]\s*['"]?([A-Za-z0-9_-]{40,})['"]?/gi,
    priority: 87,
    defaultEnabled: true,
    description: 'Netlify Auth Token',
    captureGroup: 1,
  },

  // ==================== DigitalOcean ====================
  {
    id: 'digitalocean-token',
    name: 'DigitalOcean Token',
    type: 'DIGITALOCEAN_TOKEN',
    pattern: /dop_v1_[a-f0-9]{64}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'DigitalOcean Personal Access Token',
  },
  {
    id: 'digitalocean-oauth',
    name: 'DigitalOcean OAuth Token',
    type: 'DIGITALOCEAN_TOKEN',
    pattern: /doo_v1_[a-f0-9]{64}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'DigitalOcean OAuth Token',
  },

  // ==================== NPM ====================
  {
    id: 'npm-token',
    name: 'NPM Token',
    type: 'API_KEY',
    pattern: /npm_[A-Za-z0-9]{36}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'NPM Access Token',
  },

  // ==================== PyPI ====================
  {
    id: 'pypi-token',
    name: 'PyPI API Token',
    type: 'API_KEY',
    pattern: /pypi-AgEIcHlwaS5vcmc[A-Za-z0-9_-]{50,}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'PyPI API Token',
  },

  // ==================== Docker Hub ====================
  {
    id: 'docker-hub-token',
    name: 'Docker Hub Access Token',
    type: 'API_KEY',
    pattern: /dckr_pat_[A-Za-z0-9_-]{27}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'Docker Hub Personal Access Token',
  },

  // ==================== GitLab ====================
  {
    id: 'gitlab-pat',
    name: 'GitLab Personal Access Token',
    type: 'API_KEY',
    pattern: /glpat-[A-Za-z0-9_-]{20}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'GitLab Personal Access Token',
  },
  {
    id: 'gitlab-pipeline-token',
    name: 'GitLab Pipeline Token',
    type: 'API_KEY',
    pattern: /glptt-[A-Za-z0-9_-]{20}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'GitLab Pipeline Trigger Token',
  },

  // ==================== Bitbucket ====================
  {
    id: 'bitbucket-app-password',
    name: 'Bitbucket App Password',
    type: 'API_KEY',
    pattern: /ATBB[A-Za-z0-9]{32}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'Bitbucket App Password',
  },

  // ==================== HashiCorp Vault ====================
  {
    id: 'vault-token',
    name: 'HashiCorp Vault Token',
    type: 'API_KEY',
    pattern: /hvs\.[A-Za-z0-9_-]{24,}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'HashiCorp Vault Service Token',
  },

  // ==================== Datadog ====================
  {
    id: 'datadog-api-key',
    name: 'Datadog API Key',
    type: 'API_KEY',
    pattern: /(?:DD_API_KEY|DATADOG_API_KEY)\s*[=:]\s*['"]?([a-f0-9]{32})['"]?/gi,
    priority: 87,
    defaultEnabled: true,
    description: 'Datadog API Key',
    captureGroup: 1,
  },

  // ==================== New Relic ====================
  {
    id: 'newrelic-license-key',
    name: 'New Relic License Key',
    type: 'API_KEY',
    pattern: /NRAK-[A-Z0-9]{27}/g,
    priority: 88,
    defaultEnabled: true,
    description: 'New Relic API Key',
  },

  // ==================== Sentry ====================
  {
    id: 'sentry-dsn',
    name: 'Sentry DSN',
    type: 'API_KEY',
    pattern: /https:\/\/[a-f0-9]{32}@[a-z0-9.-]+\.ingest\.sentry\.io\/[0-9]+/g,
    priority: 86,
    defaultEnabled: true,
    description: 'Sentry DSN',
  },

  // ==================== Algolia ====================
  {
    id: 'algolia-api-key',
    name: 'Algolia API Key',
    type: 'API_KEY',
    pattern: /(?:ALGOLIA_API_KEY|algolia_api_key)\s*[=:]\s*['"]?([a-f0-9]{32})['"]?/gi,
    priority: 87,
    defaultEnabled: true,
    description: 'Algolia API Key',
    captureGroup: 1,
  },

  // ==================== Mapbox ====================
  {
    id: 'mapbox-token',
    name: 'Mapbox Access Token',
    type: 'API_KEY',
    pattern: /pk\.[A-Za-z0-9]{60,}\.[A-Za-z0-9_-]{20,}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Mapbox Public Token',
  },
  {
    id: 'mapbox-secret-token',
    name: 'Mapbox Secret Token',
    type: 'API_KEY',
    pattern: /sk\.[A-Za-z0-9]{60,}\.[A-Za-z0-9_-]{20,}/g,
    priority: 87,
    defaultEnabled: true,
    description: 'Mapbox Secret Token',
  },

  // ==================== Cloudflare ====================
  {
    id: 'cloudflare-api-key',
    name: 'Cloudflare API Key',
    type: 'API_KEY',
    pattern: /(?:CF_API_KEY|CLOUDFLARE_API_KEY)\s*[=:]\s*['"]?([a-f0-9]{37})['"]?/gi,
    priority: 87,
    defaultEnabled: true,
    description: 'Cloudflare Global API Key',
    captureGroup: 1,
  },
  {
    id: 'cloudflare-api-token',
    name: 'Cloudflare API Token',
    type: 'API_KEY',
    pattern: /[A-Za-z0-9_-]{40}/g,
    priority: 30, // 低优先级，太通用
    defaultEnabled: false,
    description: 'Cloudflare API Token (通用格式)',
  },

  // ==================== SSH/GPG Keys ====================
  {
    id: 'ssh-private-key',
    name: 'SSH Private Key',
    type: 'SSH_KEY',
    pattern: /-----BEGIN\s+(?:OPENSSH|RSA|DSA|EC|ECDSA)\s+PRIVATE\s+KEY-----[\s\S]*?-----END\s+(?:OPENSSH|RSA|DSA|EC|ECDSA)\s+PRIVATE\s+KEY-----/g,
    priority: 100,
    defaultEnabled: true,
    description: 'SSH 私钥',
  },
  {
    id: 'gpg-private-key',
    name: 'GPG Private Key Block',
    type: 'GPG_KEY',
    pattern: /-----BEGIN\s+PGP\s+PRIVATE\s+KEY\s+BLOCK-----[\s\S]*?-----END\s+PGP\s+PRIVATE\s+KEY\s+BLOCK-----/g,
    priority: 100,
    defaultEnabled: true,
    description: 'GPG/PGP 私钥块',
  },

  // ==================== Encryption Keys ====================
  {
    id: 'aes-key-256',
    name: 'AES-256 Key',
    type: 'ENCRYPTION_KEY',
    pattern: /(?:AES_KEY|ENCRYPTION_KEY|CIPHER_KEY)\s*[=:]\s*['"]?([A-Fa-f0-9]{64})['"]?/gi,
    priority: 85,
    defaultEnabled: true,
    description: 'AES-256 密钥 (64 hex chars)',
    captureGroup: 1,
  },
  {
    id: 'aes-key-128',
    name: 'AES-128 Key',
    type: 'ENCRYPTION_KEY',
    pattern: /(?:AES_KEY|ENCRYPTION_KEY|CIPHER_KEY)\s*[=:]\s*['"]?([A-Fa-f0-9]{32})['"]?/gi,
    priority: 84,
    defaultEnabled: true,
    description: 'AES-128 密钥 (32 hex chars)',
    captureGroup: 1,
  },

  // ==================== Hash 值 ====================
  {
    id: 'md5-hash',
    name: 'MD5 Hash',
    type: 'HASH',
    pattern: /\b[a-f0-9]{32}\b/gi,
    priority: 30,
    defaultEnabled: false, // 太通用，默认关闭
    description: 'MD5 哈希值',
  },
  {
    id: 'sha256-hash',
    name: 'SHA-256 Hash',
    type: 'HASH',
    pattern: /\b[a-f0-9]{64}\b/gi,
    priority: 30,
    defaultEnabled: false, // 太通用，默认关闭
    description: 'SHA-256 哈希值',
  },

  // ==================== UUID ====================
  {
    id: 'uuid-v4',
    name: 'UUID v4',
    type: 'UUID',
    pattern: /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi,
    priority: 35,
    defaultEnabled: false, // 太通用，默认关闭
    description: 'UUID v4 格式',
  },

  // ==================== WeChat (微信) ====================
  {
    id: 'wechat-appid',
    name: 'WeChat App ID',
    type: 'API_KEY',
    pattern: /wx[a-f0-9]{16}/g,
    priority: 86,
    defaultEnabled: true,
    description: '微信 AppID (wx)',
  },
  {
    id: 'wechat-secret',
    name: 'WeChat App Secret',
    type: 'SECRET',
    pattern: /(?:WECHAT_SECRET|wechat_secret|appsecret)\s*[=:]\s*['"]?([a-f0-9]{32})['"]?/gi,
    priority: 86,
    defaultEnabled: true,
    description: '微信 AppSecret',
    captureGroup: 1,
  },

  // ==================== Alipay (支付宝) ====================
  {
    id: 'alipay-app-id',
    name: 'Alipay App ID',
    type: 'API_KEY',
    pattern: /(?:ALIPAY_APP_ID|alipay_app_id)\s*[=:]\s*['"]?([0-9]{16})['"]?/gi,
    priority: 86,
    defaultEnabled: true,
    description: '支付宝 AppID',
    captureGroup: 1,
  },

  // ==================== Alibaba Cloud (阿里云) ====================
  {
    id: 'aliyun-access-key',
    name: 'Alibaba Cloud Access Key ID',
    type: 'API_KEY',
    pattern: /LTAI[A-Za-z0-9]{12,20}/g,
    priority: 88,
    defaultEnabled: true,
    description: '阿里云 AccessKey ID (LTAI)',
  },

  // ==================== Tencent Cloud (腾讯云) ====================
  {
    id: 'tencent-secret-id',
    name: 'Tencent Cloud Secret ID',
    type: 'API_KEY',
    pattern: /AKID[A-Za-z0-9]{32}/g,
    priority: 88,
    defaultEnabled: true,
    description: '腾讯云 SecretId (AKID)',
  },

  // ==================== Huawei Cloud (华为云) ====================
  {
    id: 'huawei-access-key',
    name: 'Huawei Cloud Access Key',
    type: 'API_KEY',
    pattern: /(?:HUAWEI_AK|HW_ACCESS_KEY)\s*[=:]\s*['"]?([A-Z0-9]{20})['"]?/gi,
    priority: 87,
    defaultEnabled: true,
    description: '华为云 Access Key',
    captureGroup: 1,
  },
];

/**
 * 按规则 ID 获取规则
 */
export function getRuleById(id: string): DetectionRule | undefined {
  return DETECTION_RULES.find(rule => rule.id === id);
}

/**
 * 按类型获取规则
 */
export function getRulesByType(type: SensitiveType): DetectionRule[] {
  return DETECTION_RULES.filter(rule => rule.type === type);
}

/**
 * 获取所有默认启用的规则
 */
export function getDefaultEnabledRules(): DetectionRule[] {
  return DETECTION_RULES.filter(rule => rule.defaultEnabled);
}

/**
 * 按优先级排序规则
 */
export function sortRulesByPriority(rules: DetectionRule[]): DetectionRule[] {
  return [...rules].sort((a, b) => b.priority - a.priority);
}

/**
 * 获取所有规则
 */
export function getAllRules(): DetectionRule[] {
  return DETECTION_RULES;
}

/**
 * 按类别分组规则
 */
export function getRulesByCategory(): Record<string, DetectionRule[]> {
  const categories: Record<string, DetectionRule[]> = {
    'Auth & Tokens': [],
    'API Keys': [],
    'Cloud Services': [],
    'Social & Messaging': [],
    'Personal Info': [],
    'Network': [],
    'Financial': [],
    'Encryption': [],
    'Generic': [],
  };
  
  for (const rule of DETECTION_RULES) {
    switch (rule.type) {
      case 'JWT':
      case 'BEARER_TOKEN':
      case 'AUTH_HEADER':
      case 'COOKIE':
      case 'SET_COOKIE':
        categories['Auth & Tokens'].push(rule);
        break;
      case 'API_KEY':
      case 'GITHUB_TOKEN':
      case 'VERCEL_TOKEN':
      case 'NETLIFY_TOKEN':
      case 'HEROKU_KEY':
        categories['API Keys'].push(rule);
        break;
      case 'GOOGLE_KEY':
      case 'AZURE_KEY':
      case 'DIGITALOCEAN_TOKEN':
      case 'TWILIO_KEY':
      case 'SENDGRID_KEY':
      case 'MAILGUN_KEY':
        categories['Cloud Services'].push(rule);
        break;
      case 'SLACK_TOKEN':
      case 'DISCORD_TOKEN':
      case 'TELEGRAM_TOKEN':
        categories['Social & Messaging'].push(rule);
        break;
      case 'EMAIL':
      case 'PHONE':
      case 'ID_CARD':
      case 'SSN':
        categories['Personal Info'].push(rule);
        break;
      case 'IP_ADDRESS':
      case 'MAC_ADDRESS':
      case 'DATABASE_URL':
      case 'URL_PARAM':
        categories['Network'].push(rule);
        break;
      case 'CREDIT_CARD':
      case 'PAYPAL_KEY':
      case 'SQUARE_KEY':
      case 'SHOPIFY_KEY':
        categories['Financial'].push(rule);
        break;
      case 'PRIVATE_KEY':
      case 'SSH_KEY':
      case 'GPG_KEY':
      case 'ENCRYPTION_KEY':
      case 'SECRET':
      case 'PASSWORD':
        categories['Encryption'].push(rule);
        break;
      default:
        categories['Generic'].push(rule);
    }
  }
  
  return categories;
}
