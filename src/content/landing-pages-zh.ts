/**
 * 落地页内容配置 - 中文
 */

import type { LandingPageContent } from './landing-pages-en';

export const LANDING_PAGES_ZH: Record<string, LandingPageContent> = {
  jwt: {
    slug: 'jwt',
    preset: 'jwt',
    seo: {
      title: 'JWT 令牌脱敏工具 - 发送给 AI 前保护敏感信息',
      description: '在将代码发送给 ChatGPT 或其他 AI 之前，自动检测并脱敏 JWT 令牌。100% 本地处理，可逆占位符，不上传任何数据。',
      keywords: ['JWT脱敏', '移除JWT令牌', 'JWT隐私保护', 'ChatGPT安全'],
    },
    hero: {
      title: 'JWT 令牌脱敏',
      subtitle: '自动检测并替换 JSON Web Token，发送给 AI 后可恢复原始值。',
    },
    example: `// 认证头中的 JWT
const headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IuW8oOS4iSIsImlhdCI6MTUxNjIzOTAyMn0.signature',
  'Content-Type': 'application/json'
};

// Cookie 中的 JWT
document.cookie = 'auth=eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMTIzNDUifQ.sig';`,
    features: [
      '检测以 "eyJ" 开头的 JWT 令牌',
      '支持 Bearer 令牌认证头',
      '处理 Cookie 和 localStorage 中的 JWT',
      '保留令牌结构以便 AI 理解',
    ],
    faqs: [
      {
        question: '工具如何检测 JWT 令牌？',
        answer: 'JWT 有独特的格式：三段 Base64 编码的字符串用点分隔，始终以 "eyJ" 开头。我们的正则准确识别这种结构。',
      },
      {
        question: 'AI 能理解占位符吗？',
        answer: '可以！像 ⟦PTN:JWT:1:6F3A⟧ 这样的占位符设计为人类和 AI 都可读。它们表明了被脱敏数据的类型。',
      },
      {
        question: '可以恢复多个 JWT 吗？',
        answer: '当然可以。每个 JWT 都有唯一的编号占位符（JWT:1, JWT:2 等）和校验码，确保准确恢复。',
      },
    ],
  },

  'api-key': {
    slug: 'api-key',
    preset: 'api-key',
    seo: {
      title: 'API 密钥脱敏工具 - 保护你的 OpenAI/Stripe/AWS 密钥',
      description: '在发送给 AI 之前移除 OpenAI、Stripe、AWS 等 API 密钥。本地处理，不上传，可逆脱敏。',
      keywords: ['API密钥脱敏', '移除API Key', '保护密钥', 'OpenAI密钥安全'],
    },
    hero: {
      title: 'API 密钥脱敏',
      subtitle: '自动检测并脱敏 OpenAI、Stripe、AWS 等服务的 API 密钥。',
    },
    example: `# .env 文件中的 API 密钥
OPENAI_API_KEY=sk-proj-abc123xyz789verylongapikey
STRIPE_SECRET_KEY=sk_live_51abc123xyz789
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxx

# 代码中的密钥
const openai = new OpenAI({ apiKey: "sk-..." });`,
    features: [
      '检测 OpenAI 密钥 (sk-...)',
      '检测 Stripe 密钥 (sk_live, pk_live)',
      '检测 AWS 访问密钥 (AKIA...)',
      '检测 Anthropic 密钥 (sk-ant-...)',
      '通用 API 密钥模式匹配',
    ],
    faqs: [
      {
        question: '支持哪些 API 密钥格式？',
        answer: '我们检测 OpenAI、Anthropic、Stripe、AWS、GitHub 等的密钥。还使用通用模式匹配 api_key=xxx 等格式。',
      },
      {
        question: '如果我的密钥格式未被检测到怎么办？',
        answer: '可以使用包含通用模式的完整预设。对于非常特殊的格式，可以手动替换。',
      },
    ],
  },

  'bearer-token': {
    slug: 'bearer-token',
    preset: 'token',
    seo: {
      title: 'Bearer 令牌脱敏工具 - HTTP 认证令牌保护',
      description: '在发送给 AI 前脱敏 Bearer 令牌。100% 本地处理，可逆占位符，不上传任何数据。',
      keywords: ['Bearer令牌脱敏', 'Bearer Token保护', 'HTTP认证令牌', 'OAuth令牌脱敏'],
    },
    hero: {
      title: 'Bearer 令牌脱敏',
      subtitle: '自动检测并脱敏 HTTP 请求中的 Bearer 认证令牌。',
    },
    example: `# Authorization 头中的 Bearer 令牌
Authorization: Bearer abc123verylongtoken

# 带有 JWT 的 Bearer 令牌
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.sig

# 代码中的 Bearer 令牌
fetch('/api/data', {
  headers: {
    'Authorization': 'Bearer sk-proj-abc123xyz789'
  }
});`,
    features: [
      '检测 Authorization: Bearer 格式',
      '检测 JWT 格式的 Bearer 令牌',
      '检测代码中硬编码的令牌',
      '保留令牌类型以便 AI 理解',
    ],
    faqs: [
      {
        question: 'Bearer 令牌和 JWT 有什么区别？',
        answer: 'Bearer 是一种认证方案，表示令牌类型。JWT 是一种具体的令牌格式。Bearer 令牌可以是 JWT，也可以是其他格式的令牌。',
      },
      {
        question: '会脱敏所有 Authorization 头吗？',
        answer: '我们会脱敏 Bearer 和 Basic 类型的 Authorization 头，确保敏感认证信息不会泄露。',
      },
    ],
  },

  cookies: {
    slug: 'cookies',
    preset: 'cookie',
    seo: {
      title: 'Cookie 脱敏工具 - HTTP Cookie 隐私保护',
      description: '在发送给 AI 前移除 HTTP 请求中的会话 Cookie 和认证令牌。本地浏览器处理，不上传数据。',
      keywords: ['Cookie脱敏', '移除会话Cookie', 'HTTP Cookie隐私', 'Cookie保护'],
    },
    hero: {
      title: 'Cookie 脱敏',
      subtitle: '从 HTTP 头中移除敏感的会话 Cookie。',
    },
    example: `# 请求中的 Cookie
GET /dashboard HTTP/1.1
Host: example.com
Cookie: session_id=abc123xyz; auth_token=eyJhbG...; user_pref=dark

# 响应中的 Set-Cookie
HTTP/1.1 200 OK
Set-Cookie: session=xyz789; HttpOnly; Secure
Set-Cookie: refresh_token=abc123longtoken; Path=/api`,
    features: [
      '检测 Cookie 请求头',
      '检测 Set-Cookie 响应头',
      '处理多个 Cookie',
      '保留 Cookie 属性',
    ],
    faqs: [
      {
        question: '所有 Cookie 都会被脱敏吗？',
        answer: '整个 Cookie/Set-Cookie 头的值都会被脱敏，确保不泄露敏感会话数据。',
      },
    ],
  },

  env: {
    slug: 'env',
    preset: 'env',
    seo: {
      title: '.env 文件脱敏工具 - 环境变量敏感信息保护',
      description: '自动脱敏 .env 文件中的敏感环境变量。检测 API 密钥、密码、数据库连接等。',
      keywords: ['env文件脱敏', '环境变量脱敏', '移除环境密钥', '.env隐私'],
    },
    hero: {
      title: '.env 文件脱敏',
      subtitle: '自动检测并脱敏环境变量中的敏感信息。',
    },
    example: `# 数据库配置
DATABASE_URL=postgres://user:password123@localhost:5432/mydb
REDIS_URL=redis://:secretpassword@redis.example.com:6379

# API 密钥
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx

# 密钥和密码
JWT_SECRET=my-super-secret-key
SESSION_SECRET=another-secret-value
PASSWORD=admin123`,
    features: [
      '解析 KEY=VALUE 格式',
      '检测敏感变量名 (SECRET, PASSWORD, KEY, TOKEN)',
      '检测数据库连接字符串',
      '支持带引号和不带引号的值',
    ],
    faqs: [
      {
        question: '如何判断哪些值是敏感的？',
        answer: '我们查找包含 SECRET、PASSWORD、KEY、TOKEN、API、AUTH 等关键词的变量名，同时检测数据库 URL 模式。',
      },
    ],
  },

  'private-key': {
    slug: 'private-key',
    preset: 'private-key',
    seo: {
      title: '私钥脱敏工具 - RSA/EC/SSH 私钥保护',
      description: '在发送给 AI 前安全移除私钥块。检测 RSA、EC、DSA、OpenSSH 和 PGP 私钥。',
      keywords: ['私钥脱敏', '移除RSA密钥', 'SSH密钥保护', 'PEM密钥脱敏'],
    },
    hero: {
      title: '私钥脱敏',
      subtitle: '自动检测并脱敏 RSA、EC、SSH 和 PGP 私钥块。',
    },
    example: `# RSA 私钥
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA0Z3VS5JJcds3xfn/ygWyF8PbnGy...
-----END RSA PRIVATE KEY-----

# OpenSSH 私钥
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAA...
-----END OPENSSH PRIVATE KEY-----`,
    features: [
      '检测 RSA 私钥',
      '检测 EC（椭圆曲线）私钥',
      '检测 DSA 私钥',
      '检测 OpenSSH 私钥',
      '检测 PGP 私钥块',
    ],
    faqs: [
      {
        question: '也会检测公钥吗？',
        answer: '目前专注于私钥检测，因为它们是安全关键部分。公钥通常可以安全分享。',
      },
    ],
  },

  'authorization-header': {
    slug: 'authorization-header',
    preset: 'auth-header',
    seo: {
      title: '认证头脱敏工具 - 移除 HTTP 认证令牌',
      description: '在发送给 AI 前移除 Bearer、Basic 和其他认证令牌。100% 本地处理。',
      keywords: ['认证头脱敏', '移除auth令牌', 'HTTP认证保护', 'Bearer Basic脱敏'],
    },
    hero: {
      title: '认证头脱敏',
      subtitle: '从 HTTP 请求中移除 Bearer、Basic 和自定义认证令牌。',
    },
    example: `# Bearer 令牌
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Basic 认证（Base64 编码的用户名:密码）
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=`,
    features: [
      '检测 Bearer 令牌认证',
      '检测 Basic 认证',
      '支持标准 Authorization 头',
      '处理多行头部',
    ],
    faqs: [
      {
        question: '支持哪些认证类型？',
        answer: '我们检测 Bearer 令牌、Basic 认证和认证头中的 JWT 令牌。',
      },
    ],
  },

  'url-params': {
    slug: 'url-params',
    preset: 'url-param',
    seo: {
      title: 'URL 参数脱敏工具 - 移除敏感查询参数',
      description: '在发送给 AI 前移除 URL 查询参数中的 API 密钥、令牌和密钥。本地浏览器处理。',
      keywords: ['URL参数脱敏', '移除查询参数密钥', 'URL令牌保护', '查询参数隐私'],
    },
    hero: {
      title: 'URL 参数脱敏',
      subtitle: '从 URL 查询字符串中移除敏感的令牌和密钥。',
    },
    example: `# 包含敏感参数的 URL
https://api.example.com/data?token=abc123secrettoken&user=john
https://api.stripe.com/v1/charges?api_key=sk_live_xxxxxx
https://oauth.example.com/callback?access_token=eyJhbG...
https://example.com/api?sig=a1b2c3d4e5f6`,
    features: [
      '检测 token、access_token 参数',
      '检测 api_key、key 参数',
      '检测 sig、signature 参数',
      '检测 secret、auth 参数',
    ],
    faqs: [
      {
        question: '哪些 URL 参数被认为是敏感的？',
        answer: '我们检测：token、access_token、api_key、apikey、key、secret、sig、signature 和 auth 参数。',
      },
    ],
  },

  'database-url': {
    slug: 'database-url',
    preset: 'db-url',
    seo: {
      title: '数据库连接脱敏工具 - PostgreSQL/MySQL/MongoDB',
      description: '在发送给 AI 前移除数据库连接字符串中的凭据。支持 PostgreSQL、MySQL、MongoDB、Redis。',
      keywords: ['数据库URL脱敏', '移除数据库密码', '连接字符串保护', 'PostgreSQL MySQL MongoDB'],
    },
    hero: {
      title: '数据库连接脱敏',
      subtitle: '从 PostgreSQL、MySQL、MongoDB 和 Redis 连接字符串中移除凭据。',
    },
    example: `# PostgreSQL
DATABASE_URL=postgres://admin:super_secret_pw@db.example.com:5432/production

# MySQL  
MYSQL_URL=mysql://root:password123@localhost:3306/myapp

# MongoDB
MONGODB_URI=mongodb+srv://user:pass123@cluster0.mongodb.net/mydb

# Redis
REDIS_URL=redis://:authpassword@redis.example.com:6379/0`,
    features: [
      '检测 PostgreSQL 连接字符串',
      '检测 MySQL 连接字符串',
      '检测 MongoDB 连接字符串',
      '检测 Redis 连接字符串',
    ],
    faqs: [
      {
        question: '只移除密码还是整个 URL？',
        answer: '整个连接字符串都会被脱敏，因为它包含主机、数据库名和凭据，组合起来可能是敏感的。',
      },
    ],
  },

  'github-token': {
    slug: 'github-token',
    preset: 'github',
    seo: {
      title: 'GitHub 令牌脱敏工具 - PAT/OAuth/App 令牌保护',
      description: '在发送代码给 AI 前移除 GitHub 个人访问令牌、OAuth 令牌和 App 令牌。100% 本地处理。',
      keywords: ['GitHub令牌脱敏', '移除PAT', 'GitHub OAuth保护', 'ghp令牌脱敏'],
    },
    hero: {
      title: 'GitHub 令牌脱敏',
      subtitle: '自动检测并脱敏 GitHub 个人访问令牌和 OAuth 令牌。',
    },
    example: `# GitHub 个人访问令牌
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# GitHub OAuth 令牌
OAUTH_TOKEN=gho_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# GitHub App 令牌
GH_APP_TOKEN=ghu_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`,
    features: [
      '检测个人访问令牌 (ghp_...)',
      '检测 OAuth 令牌 (gho_...)',
      '检测 GitHub App 用户令牌 (ghu_...)',
      '检测 GitHub App 服务器令牌 (ghs_...)',
    ],
    faqs: [
      {
        question: '检测哪些 GitHub 令牌格式？',
        answer: '我们检测所有现代 GitHub 令牌格式：ghp_（PAT）、gho_（OAuth）、ghu_（用户）、ghs_（服务器）和 ghr_（刷新）。',
      },
    ],
  },

  // === 通俗易懂的页面，面向普通用户 ===

  'chatgpt-privacy': {
    slug: 'chatgpt-privacy',
    preset: 'default',
    seo: {
      title: 'ChatGPT 隐私保护工具 - 发给AI前隐藏敏感信息',
      description: '免费工具，在粘贴代码到 ChatGPT 之前自动隐藏密码、密钥和个人信息。保护你的隐私，不上传任何数据。',
      keywords: ['ChatGPT隐私', '发给ChatGPT安全吗', 'ChatGPT隐藏密码', 'AI隐私保护', 'ChatGPT安全使用'],
    },
    hero: {
      title: '安全使用 ChatGPT',
      subtitle: '在粘贴代码到 ChatGPT 之前，自动隐藏密码和敏感信息。获得 AI 帮助的同时保护你的隐私。',
    },
    example: `# 配置文件中的密码
database_password=我的超级密码123!
api_key=sk-abc123xyz
email=zhangsan@company.com

# 错误日志中的敏感信息
连接失败: mysql://admin:password@db.company.com`,
    features: [
      '自动隐藏密码',
      '移除 API 密钥和令牌',
      '遮蔽邮箱地址',
      '数据不上传 - 完全本地处理',
      '获得 ChatGPT 回复后可恢复原始值',
    ],
    faqs: [
      {
        question: '把代码粘贴给 ChatGPT 安全吗？',
        answer: 'ChatGPT 可能会存储你的对话用于训练。使用这个工具先移除敏感信息，这样你就可以安全地获得帮助，不用担心密码或密钥泄露。',
      },
      {
        question: '这个工具会上传我的数据吗？',
        answer: '不会！所有处理都在你的浏览器中进行。你的数据永远不会离开你的电脑。你可以打开浏览器的网络标签页来验证这一点。',
      },
      {
        question: '可以恢复原始值吗？',
        answer: '可以！ChatGPT 回复后，把回复粘贴回来，点击"恢复"就能把占位符替换回原始的敏感数据。',
      },
    ],
  },

  'hide-passwords': {
    slug: 'hide-passwords',
    preset: 'default',
    seo: {
      title: '代码隐藏密码工具 - 分享代码前移除密码',
      description: '免费在线工具，分享代码前自动隐藏和遮蔽密码。适用于配置文件、脚本和日志。可逆占位符，100% 本地处理。',
      keywords: ['隐藏密码', '遮蔽密码', '移除代码中的密码', '密码脱敏', '安全分享代码'],
    },
    hero: {
      title: '隐藏代码中的密码',
      subtitle: '分享代码前自动找到并隐藏所有密码。适用于配置文件、脚本和日志。',
    },
    example: `# 数据库配置
DB_PASSWORD=super_secret_123
ADMIN_PASS=admin@2024!

# 连接字符串
mysql://root:我的密码!@localhost:3306/app

# SSH 命令
sshpass -p 'SecretPass' ssh user@server.com`,
    features: [
      '检测配置文件中的密码',
      '发现连接字符串中的密码',
      '遮蔽代码中硬编码的密码',
      '支持任何编程语言',
    ],
    faqs: [
      {
        question: '能检测哪些密码格式？',
        answer: '我们检测 PASSWORD=xxx、PASS=xxx、password: xxx，以及数据库 URL 中的密码如 mysql://user:password@host。',
      },
      {
        question: '遮蔽后的代码可以公开分享吗？',
        answer: '可以！带占位符的遮蔽代码可以安全分享。但不要分享导出的会话文件，因为里面包含原始值。',
      },
    ],
  },

  'safe-ai-coding': {
    slug: 'safe-ai-coding',
    preset: 'default',
    seo: {
      title: 'AI 安全使用指南 - 保护你的代码隐私',
      description: '安全使用 ChatGPT、Claude 等 AI 助手。自动隐藏代码中的 API 密钥、密码和密钥。免费隐私保护工具。',
      keywords: ['AI安全使用', 'AI编程隐私', '保护密钥', '安全AI助手', '安全用AI写代码'],
    },
    hero: {
      title: '安全地用 AI 写代码',
      subtitle: '使用 ChatGPT、Claude 或任何 AI 时，不暴露你的 API 密钥、密码或密钥。',
    },
    example: `// 我的 API 集成代码 - 帮我调试！
const stripe = new Stripe('sk_live_abc123xyz789');

const response = await fetch('https://api.openai.com/v1/chat', {
  headers: {
    'Authorization': 'Bearer sk-proj-mykey123'
  }
});

// 环境变量
process.env.DATABASE_URL = 'postgres://user:pass@db.com/app';`,
    features: [
      '支持 ChatGPT、Claude、Copilot 等所有 AI',
      '自动检测 OpenAI、Stripe、AWS 等 API 密钥',
      '隐藏数据库密码和连接字符串',
      '支持任何编程语言',
      '100% 本地处理 - 代码不上传',
    ],
    faqs: [
      {
        question: '为什么要对 AI 隐藏密钥？',
        answer: 'AI 公司可能会存储和审查你的对话。你的 API 密钥可能被泄露、吊销或滥用。在分享代码给 AI 之前，一定要移除密钥。',
      },
      {
        question: '这个工具支持哪些 AI 助手？',
        answer: '支持任何 AI！ChatGPT、Claude、Gemini、Copilot 或其他任何 AI 助手。只需粘贴脱敏后的代码即可。',
      },
    ],
  },

  'remove-sensitive-data': {
    slug: 'remove-sensitive-data',
    preset: 'default',
    seo: {
      title: '移除敏感数据工具 - 代码脱敏免费工具',
      description: '免费在线工具，自动查找并移除代码、日志、配置文件中的敏感数据。密码、API 密钥、邮箱等。',
      keywords: ['移除敏感数据', '数据脱敏工具', '代码脱敏', '清理敏感信息', '代码脱敏'],
    },
    hero: {
      title: '移除代码中的敏感数据',
      subtitle: '自动查找并遮蔽密码、API 密钥、令牌等敏感信息。',
    },
    example: `# 应用配置
SECRET_KEY=django-insecure-abc123xyz
DATABASE_URL=postgres://admin:SuperSecret@db.example.com/prod
STRIPE_KEY=sk_live_51abc...
AWS_SECRET=wJalrXUtnFEMI/K7MDENG/bPxRfiCY

# 日志中的用户数据
用户邮箱: john@company.com 从 192.168.1.100 登录`,
    features: [
      '自动检测 25+ 种敏感数据类型',
      '支持配置文件、日志和代码',
      '可逆 - 随时恢复原始值',
      '无需注册，完全免费',
    ],
    faqs: [
      {
        question: '能检测哪些类型的敏感数据？',
        answer: '我们检测密码、API 密钥（OpenAI、AWS、Stripe 等）、令牌（JWT、OAuth）、数据库 URL、私钥等。',
      },
      {
        question: '这个工具真的免费吗？',
        answer: '是的，完全免费，没有任何限制。我们相信隐私工具应该对每个人都可用。',
      },
    ],
  },

  'code-sharing-tool': {
    slug: 'code-sharing-tool',
    preset: 'default',
    seo: {
      title: '安全分享代码工具 - 发布前移除密钥',
      description: '在 Stack Overflow、GitHub 或论坛上安全分享代码。自动移除密码、API 密钥和密钥。免费在线工具。',
      keywords: ['安全分享代码', '发布代码前', '移除代码密钥', 'Stack Overflow安全', '网上发代码'],
    },
    hero: {
      title: '安全地在网上分享代码',
      subtitle: '在发布到 Stack Overflow、GitHub Issues 或论坛之前，移除密码和密钥。',
    },
    example: `// 求助！我的 API 调用报错了
const apiKey = 'sk-abc123-my-real-api-key';

fetch('https://api.service.com/data', {
  headers: { 
    'X-API-Key': apiKey,
    'Cookie': 'session=xyz789secret'
  }
}).then(res => {
  // 错误: 401 Unauthorized
  console.log(res);
});`,
    features: [
      '安全发布到 Stack Overflow',
      '安全分享到 GitHub Issues',
      '移除错误日志中的密钥',
      '保留代码结构便于他人帮助调试',
    ],
    faqs: [
      {
        question: '为什么在 Stack Overflow 发代码要小心？',
        answer: 'Stack Overflow 上的代码会被搜索引擎永久索引。如果你不小心发布了 API 密钥，几分钟内就可能被发现并滥用。',
      },
      {
        question: '别人还能看懂我的代码吗？',
        answer: '可以！占位符清楚地标明了数据类型（API_KEY、PASSWORD 等），所以别人仍然可以理解并帮你调试代码。',
      },
    ],
  },
};

/**
 * 获取所有中文落地页 slugs
 */
export function getAllChineseSlugs(): string[] {
  return Object.keys(LANDING_PAGES_ZH);
}

/**
 * 获取中文落地页内容
 */
export function getChineseLandingPage(slug: string): LandingPageContent | undefined {
  return LANDING_PAGES_ZH[slug];
}
