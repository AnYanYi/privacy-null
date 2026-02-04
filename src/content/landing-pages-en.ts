/**
 * 落地页内容配置 - 英文
 * 
 * 每个 topic 对应一个独立的 SEO 落地页
 */

export interface LandingPageContent {
  slug: string;
  preset: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    title: string;
    subtitle: string;
  };
  example: string;
  features: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const LANDING_PAGES_EN: Record<string, LandingPageContent> = {
  jwt: {
    slug: 'jwt',
    preset: 'jwt',
    seo: {
      title: 'Redact JWT Tokens Before Sending to AI - Free Online Tool',
      description: 'Safely remove JWT tokens from your code before sharing with ChatGPT or AI assistants. 100% local processing, reversible placeholders, no data uploads.',
      keywords: ['redact JWT', 'remove JWT token', 'JWT sanitizer', 'ChatGPT JWT privacy', 'mask JWT'],
    },
    hero: {
      title: 'Redact JWT Tokens',
      subtitle: 'Automatically detect and mask JSON Web Tokens before sending to AI. Restore them after getting the response.',
    },
    example: `// JWT in Authorization header
const headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  'Content-Type': 'application/json'
};

// JWT in cookie
document.cookie = 'auth=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDUiLCJleHAiOjE3MDQwNjcyMDB9.signature';`,
    features: [
      'Detects JWT tokens starting with "eyJ"',
      'Works with Bearer tokens in headers',
      'Handles JWTs in cookies and localStorage',
      'Preserves token structure for AI understanding',
    ],
    faqs: [
      {
        question: 'How does the tool detect JWT tokens?',
        answer: 'JWTs have a distinctive format: three Base64-encoded segments separated by dots, always starting with "eyJ" (the Base64 encoding of {"alg"). Our regex pattern accurately identifies this structure.',
      },
      {
        question: 'Will AI understand the placeholders?',
        answer: 'Yes! Placeholders like ⟦PTN:JWT:1:6F3A⟧ are designed to be human and AI-readable. They indicate the type of redacted data, making it easy for AI to provide relevant responses.',
      },
      {
        question: 'Can I restore multiple JWTs?',
        answer: 'Absolutely. Each JWT gets a unique numbered placeholder (JWT:1, JWT:2, etc.) with a checksum for accurate restoration.',
      },
    ],
  },

  'api-key': {
    slug: 'api-key',
    preset: 'api-key',
    seo: {
      title: 'Redact API Keys Before Sending to AI - Protect Your Secrets',
      description: 'Remove OpenAI, Stripe, AWS, and other API keys from code before sharing with AI. Local processing, no uploads, reversible redaction.',
      keywords: ['redact API key', 'remove API key', 'API key sanitizer', 'protect API keys', 'mask secrets'],
    },
    hero: {
      title: 'Redact API Keys',
      subtitle: 'Automatically detect and mask API keys from OpenAI, Stripe, AWS, and more before sending to AI.',
    },
    example: `# .env file with API keys
OPENAI_API_KEY=sk-proj-abc123xyz789verylongapikey
STRIPE_SECRET_KEY=sk_live_51abc123xyz789
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxx

# In code
const openai = new OpenAI({ apiKey: "sk-..." });`,
    features: [
      'Detects OpenAI keys (sk-...)',
      'Detects Stripe keys (sk_live, pk_live)',
      'Detects AWS access keys (AKIA...)',
      'Detects Anthropic keys (sk-ant-...)',
      'Generic API key pattern matching',
    ],
    faqs: [
      {
        question: 'Which API key formats are supported?',
        answer: 'We detect keys from OpenAI, Anthropic, Stripe, AWS, GitHub, and more. We also use generic patterns to catch api_key=xxx and similar formats.',
      },
      {
        question: 'What if my API key format is not detected?',
        answer: 'You can use the full preset which includes generic patterns for common key formats. For very unusual formats, you can manually replace them.',
      },
      {
        question: 'Are my API keys sent anywhere?',
        answer: 'Never. All processing happens in your browser. Check the Network tab in DevTools to verify no data leaves your machine.',
      },
    ],
  },

  'bearer-token': {
    slug: 'bearer-token',
    preset: 'bearer-token',
    seo: {
      title: 'Redact Bearer Tokens from HTTP Headers - Free Privacy Tool',
      description: 'Remove Bearer tokens from Authorization headers before sharing with AI. 100% browser-based, reversible, no data uploads.',
      keywords: ['redact Bearer token', 'Authorization header', 'remove auth token', 'HTTP header sanitizer'],
    },
    hero: {
      title: 'Redact Bearer Tokens',
      subtitle: 'Safely remove Bearer tokens from HTTP headers before sharing code with AI assistants.',
    },
    example: `# HTTP Request with Bearer token
GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U

# cURL command
curl -H "Authorization: Bearer abc123token" https://api.example.com/data`,
    features: [
      'Detects "Authorization: Bearer" patterns',
      'Works with JWT and opaque tokens',
      'Handles cURL commands',
      'Preserves header structure',
    ],
    faqs: [
      {
        question: 'Does it work with Basic auth too?',
        answer: 'Yes! We also detect "Authorization: Basic" headers and can redact the Base64-encoded credentials.',
      },
      {
        question: 'What about custom header names?',
        answer: 'We detect the standard Authorization header. For custom headers like X-API-Key, enable the API Key preset for broader detection.',
      },
    ],
  },

  cookies: {
    slug: 'cookies',
    preset: 'cookies',
    seo: {
      title: 'Redact HTTP Cookies Before Sending to AI - Cookie Sanitizer',
      description: 'Remove session cookies and auth tokens from HTTP headers before sharing with AI. Local browser processing, no uploads.',
      keywords: ['redact cookies', 'remove session cookie', 'HTTP cookie sanitizer', 'cookie privacy'],
    },
    hero: {
      title: 'Redact Cookies',
      subtitle: 'Remove sensitive session cookies from HTTP headers before sharing with AI.',
    },
    example: `# Request with cookies
GET /dashboard HTTP/1.1
Host: example.com
Cookie: session_id=abc123xyz; auth_token=eyJhbG...; user_pref=dark

# Response with Set-Cookie
HTTP/1.1 200 OK
Set-Cookie: session=xyz789; HttpOnly; Secure; SameSite=Strict
Set-Cookie: refresh_token=abc123longtoken; Path=/api`,
    features: [
      'Detects Cookie request headers',
      'Detects Set-Cookie response headers',
      'Handles multiple cookies in one header',
      'Preserves cookie attributes',
    ],
    faqs: [
      {
        question: 'Are all cookies redacted?',
        answer: 'The entire Cookie/Set-Cookie header value is redacted to ensure no sensitive session data leaks.',
      },
      {
        question: 'Can I redact only specific cookies?',
        answer: 'Currently we redact the full cookie header. For granular control, you can use the manual mode (coming soon).',
      },
    ],
  },

  env: {
    slug: 'env',
    preset: 'env',
    seo: {
      title: 'Redact .env Files Before Sending to AI - Environment Variable Sanitizer',
      description: 'Automatically mask sensitive environment variables in .env files before sharing with AI. Detects API keys, passwords, database URLs.',
      keywords: ['redact env file', '.env sanitizer', 'remove environment secrets', 'env file privacy'],
    },
    hero: {
      title: 'Redact .env Files',
      subtitle: 'Automatically detect and mask sensitive environment variables before sending to AI.',
    },
    example: `# Database
DATABASE_URL=postgres://user:password123@localhost:5432/mydb
REDIS_URL=redis://:secretpassword@redis.example.com:6379

# API Keys
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx

# Secrets
JWT_SECRET=my-super-secret-key-do-not-share
SESSION_SECRET=another-secret-value
PASSWORD=admin123`,
    features: [
      'Parses KEY=VALUE format',
      'Detects sensitive key names (SECRET, PASSWORD, KEY, TOKEN)',
      'Detects database connection strings',
      'Works with quoted and unquoted values',
    ],
    faqs: [
      {
        question: 'How do you determine which values are sensitive?',
        answer: 'We look for key names containing words like SECRET, PASSWORD, KEY, TOKEN, API, AUTH, and similar. We also detect database URL patterns.',
      },
      {
        question: 'What about .env.local or .env.production?',
        answer: 'The tool works with any text content. Simply paste your environment file content regardless of the filename.',
      },
    ],
  },

  'private-key': {
    slug: 'private-key',
    preset: 'private-key',
    seo: {
      title: 'Redact Private Keys (RSA/EC/SSH) Before Sending to AI',
      description: 'Safely remove private key blocks from code before sharing with AI. Detects RSA, EC, DSA, OpenSSH, and PGP private keys.',
      keywords: ['redact private key', 'remove RSA key', 'SSH key sanitizer', 'PEM key redaction'],
    },
    hero: {
      title: 'Redact Private Keys',
      subtitle: 'Automatically detect and mask RSA, EC, SSH, and PGP private key blocks.',
    },
    example: `# RSA Private Key
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA0Z3VS5JJcds3xfn/ygWyF8PbnGy...
...many lines of base64...
-----END RSA PRIVATE KEY-----

# EC Private Key
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIBYr2...
-----END EC PRIVATE KEY-----

# OpenSSH Private Key
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAA...
-----END OPENSSH PRIVATE KEY-----`,
    features: [
      'Detects RSA private keys',
      'Detects EC (elliptic curve) private keys',
      'Detects DSA private keys',
      'Detects OpenSSH private keys',
      'Detects PGP private key blocks',
    ],
    faqs: [
      {
        question: 'Does it detect public keys too?',
        answer: 'Currently we focus on private keys as they are the security-critical part. Public keys are generally safe to share.',
      },
      {
        question: 'What about encrypted private keys?',
        answer: 'Yes, we detect encrypted private keys (ENCRYPTED PRIVATE KEY) too. The entire block is redacted.',
      },
    ],
  },

  'authorization-header': {
    slug: 'authorization-header',
    preset: 'authorization-header',
    seo: {
      title: 'Redact Authorization Headers - Remove Auth Tokens from HTTP',
      description: 'Remove Bearer, Basic, and other authorization tokens from HTTP headers before sharing with AI. 100% local processing.',
      keywords: ['redact authorization header', 'remove auth token', 'HTTP auth sanitizer', 'Bearer Basic redaction'],
    },
    hero: {
      title: 'Redact Authorization Headers',
      subtitle: 'Remove Bearer, Basic, and custom authorization tokens from HTTP requests.',
    },
    example: `# Bearer Token
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Basic Auth (Base64 encoded username:password)
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=

# API Key in header
X-API-Key: sk-1234567890abcdef`,
    features: [
      'Detects Bearer token authorization',
      'Detects Basic auth (Base64 credentials)',
      'Works with standard Authorization header',
      'Handles multi-line headers',
    ],
    faqs: [
      {
        question: 'What authentication types are supported?',
        answer: 'We detect Bearer tokens, Basic authentication, and JWT tokens in authorization headers.',
      },
      {
        question: 'Is Basic auth decoded before redaction?',
        answer: 'No, we redact the entire Base64-encoded value. The original credentials are never decoded.',
      },
    ],
  },

  'url-params': {
    slug: 'url-params',
    preset: 'url-params',
    seo: {
      title: 'Redact Sensitive URL Parameters - Token & Key Sanitizer',
      description: 'Remove API keys, tokens, and secrets from URL query parameters before sharing with AI. Local browser processing.',
      keywords: ['redact URL params', 'remove query string secrets', 'URL token sanitizer', 'query parameter privacy'],
    },
    hero: {
      title: 'Redact URL Parameters',
      subtitle: 'Remove sensitive tokens and keys from URL query strings.',
    },
    example: `# URLs with sensitive parameters
https://api.example.com/data?token=abc123secrettoken&user=john
https://api.stripe.com/v1/charges?api_key=sk_live_xxxxxx
https://oauth.example.com/callback?access_token=eyJhbG...&state=xyz
https://example.com/api?sig=a1b2c3d4e5f6&timestamp=123456`,
    features: [
      'Detects token, access_token parameters',
      'Detects api_key, key parameters',
      'Detects sig, signature parameters',
      'Detects secret, auth parameters',
    ],
    faqs: [
      {
        question: 'Which URL parameters are considered sensitive?',
        answer: 'We detect: token, access_token, api_key, apikey, key, secret, sig, signature, and auth parameters.',
      },
      {
        question: 'What about custom parameter names?',
        answer: 'For custom names, you can use the full preset which includes more aggressive pattern matching.',
      },
    ],
  },

  'database-url': {
    slug: 'database-url',
    preset: 'database-url',
    seo: {
      title: 'Redact Database Connection Strings - PostgreSQL, MySQL, MongoDB',
      description: 'Remove database credentials from connection strings before sharing with AI. Supports PostgreSQL, MySQL, MongoDB, Redis.',
      keywords: ['redact database URL', 'remove DB password', 'connection string sanitizer', 'PostgreSQL MySQL MongoDB'],
    },
    hero: {
      title: 'Redact Database URLs',
      subtitle: 'Remove credentials from PostgreSQL, MySQL, MongoDB, and Redis connection strings.',
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
      'Detects PostgreSQL connection strings',
      'Detects MySQL connection strings',
      'Detects MongoDB connection strings (including +srv)',
      'Detects Redis connection strings',
    ],
    faqs: [
      {
        question: 'Does it remove just the password or the entire URL?',
        answer: 'The entire connection string is redacted since it contains the host, database name, and credentials which together could be sensitive.',
      },
      {
        question: 'What about connection strings in JSON config?',
        answer: 'Yes, we detect database URLs in any context - .env files, JSON configs, or plain text.',
      },
    ],
  },

  'github-token': {
    slug: 'github-token',
    preset: 'github-token',
    seo: {
      title: 'Redact GitHub Tokens - PAT, OAuth, App Tokens Sanitizer',
      description: 'Remove GitHub Personal Access Tokens, OAuth tokens, and App tokens before sharing code with AI. 100% local.',
      keywords: ['redact GitHub token', 'remove PAT', 'GitHub OAuth sanitizer', 'ghp token redaction'],
    },
    hero: {
      title: 'Redact GitHub Tokens',
      subtitle: 'Automatically detect and mask GitHub Personal Access Tokens and OAuth tokens.',
    },
    example: `# GitHub Personal Access Token (classic)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# GitHub OAuth Token
OAUTH_TOKEN=gho_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# GitHub App tokens
GH_APP_TOKEN=ghu_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GH_SERVER_TOKEN=ghs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GH_REFRESH_TOKEN=ghr_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`,
    features: [
      'Detects Personal Access Tokens (ghp_...)',
      'Detects OAuth tokens (gho_...)',
      'Detects GitHub App user tokens (ghu_...)',
      'Detects GitHub App server tokens (ghs_...)',
      'Detects GitHub App refresh tokens (ghr_...)',
    ],
    faqs: [
      {
        question: 'What GitHub token formats are detected?',
        answer: 'We detect all modern GitHub token formats: ghp_ (PAT), gho_ (OAuth), ghu_ (user), ghs_ (server), and ghr_ (refresh).',
      },
      {
        question: 'What about classic tokens without prefix?',
        answer: 'Older GitHub tokens without the prefix are detected by our generic token patterns in the full preset.',
      },
    ],
  },

  // === 通俗易懂的页面，面向普通用户 ===

  'chatgpt-privacy': {
    slug: 'chatgpt-privacy',
    preset: 'default',
    seo: {
      title: 'ChatGPT Privacy Tool - Hide Sensitive Info Before Pasting',
      description: 'Free tool to hide passwords, keys, and personal info before pasting code into ChatGPT. Protect your privacy when using AI assistants. No data uploaded.',
      keywords: ['ChatGPT privacy', 'hide info from ChatGPT', 'ChatGPT safe', 'protect data ChatGPT', 'AI privacy tool'],
    },
    hero: {
      title: 'Protect Your Privacy with ChatGPT',
      subtitle: 'Automatically hide passwords and sensitive info before pasting into ChatGPT. Get AI help without exposing your secrets.',
    },
    example: `# Your config file with passwords
database_password=MySecretPass123!
api_key=sk-abc123xyz
email=john.doe@company.com

# Error log with sensitive data
Error connecting to mysql://admin:password@db.company.com`,
    features: [
      'Hide passwords automatically',
      'Remove API keys and tokens',
      'Mask email addresses',
      'Keep your data local - nothing uploaded',
      'Restore original values after getting ChatGPT\'s response',
    ],
    faqs: [
      {
        question: 'Is it safe to paste code into ChatGPT?',
        answer: 'ChatGPT may store your conversations for training. Use this tool to remove sensitive info first, so you can safely get help without exposing passwords or secrets.',
      },
      {
        question: 'Does this tool send my data anywhere?',
        answer: 'No! Everything runs in your browser. Your data never leaves your computer. You can verify this by checking the Network tab in your browser.',
      },
      {
        question: 'Can I get my original values back?',
        answer: 'Yes! After ChatGPT responds, paste the response back and click "Restore" to replace placeholders with your original sensitive data.',
      },
    ],
  },

  'hide-passwords': {
    slug: 'hide-passwords',
    preset: 'default',
    seo: {
      title: 'Hide Passwords Before Sharing Code - Free Online Tool',
      description: 'Automatically hide and mask passwords in your code before sharing with AI, colleagues, or posting online. Reversible placeholders, 100% local.',
      keywords: ['hide passwords', 'mask passwords', 'remove passwords from code', 'password redaction', 'share code safely'],
    },
    hero: {
      title: 'Hide Passwords in Your Code',
      subtitle: 'Automatically find and mask all passwords before sharing your code. Works with config files, scripts, and logs.',
    },
    example: `# Database config
DB_PASSWORD=super_secret_123
ADMIN_PASS=admin@2024!

# Connection string
mysql://root:MyPassword!@localhost:3306/app

# SSH command with password
sshpass -p 'SecretPass' ssh user@server.com`,
    features: [
      'Detect passwords in config files',
      'Find passwords in connection strings',
      'Mask hardcoded passwords in code',
      'Works with any programming language',
    ],
    faqs: [
      {
        question: 'What password patterns are detected?',
        answer: 'We detect PASSWORD=xxx, PASS=xxx, password: xxx, and passwords in database URLs like mysql://user:password@host.',
      },
      {
        question: 'Can I share the masked code publicly?',
        answer: 'Yes! The masked code with placeholders is safe to share. Just don\'t share the exported session file, as it contains the original values.',
      },
    ],
  },

  'safe-ai-coding': {
    slug: 'safe-ai-coding',
    preset: 'default',
    seo: {
      title: 'Safe AI Coding - Protect Secrets When Using AI Assistants',
      description: 'Use ChatGPT, Claude, or Copilot safely. Auto-hide API keys, passwords, and secrets from your code before sharing with AI. Free privacy tool.',
      keywords: ['safe AI coding', 'AI coding privacy', 'protect secrets AI', 'secure AI assistant', 'code with AI safely'],
    },
    hero: {
      title: 'Code with AI Safely',
      subtitle: 'Get help from ChatGPT, Claude, or any AI without exposing your API keys, passwords, or secrets.',
    },
    example: `// My API integration code - HELP ME DEBUG!
const stripe = new Stripe('sk_live_abc123xyz789');

const response = await fetch('https://api.openai.com/v1/chat', {
  headers: {
    'Authorization': 'Bearer sk-proj-mykey123'
  }
});

// Environment variables
process.env.DATABASE_URL = 'postgres://user:pass@db.com/app';`,
    features: [
      'Works with ChatGPT, Claude, Copilot, and any AI',
      'Auto-detect API keys from OpenAI, Stripe, AWS, etc.',
      'Hide database passwords and connection strings',
      'Mask secrets in any programming language',
      '100% local - your code stays on your computer',
    ],
    faqs: [
      {
        question: 'Why should I hide secrets from AI?',
        answer: 'AI companies may store and review your conversations. Your API keys could be leaked, revoked, or misused. Always remove secrets before sharing code with AI.',
      },
      {
        question: 'Which AI assistants does this work with?',
        answer: 'This works with any AI! ChatGPT, Claude, Gemini, Copilot, or any other AI assistant. Just paste the sanitized code.',
      },
    ],
  },

  'remove-sensitive-data': {
    slug: 'remove-sensitive-data',
    preset: 'default',
    seo: {
      title: 'Remove Sensitive Data from Code - Free Redaction Tool',
      description: 'Free online tool to automatically find and remove sensitive data from code, logs, and config files. Passwords, API keys, emails, and more.',
      keywords: ['remove sensitive data', 'data redaction tool', 'sanitize code', 'clean sensitive info', 'redact code'],
    },
    hero: {
      title: 'Remove Sensitive Data from Code',
      subtitle: 'Automatically find and mask passwords, API keys, tokens, and other sensitive info in your code.',
    },
    example: `# Application config
SECRET_KEY=django-insecure-abc123xyz
DATABASE_URL=postgres://admin:SuperSecret@db.example.com/prod
STRIPE_KEY=sk_live_51abc...
AWS_SECRET=wJalrXUtnFEMI/K7MDENG/bPxRfiCY

# User data in logs
User email: john@company.com logged in from 192.168.1.100`,
    features: [
      'Auto-detect 25+ types of sensitive data',
      'Works with config files, logs, and code',
      'Reversible - restore original values anytime',
      'No signup required, completely free',
    ],
    faqs: [
      {
        question: 'What types of sensitive data are detected?',
        answer: 'We detect passwords, API keys (OpenAI, AWS, Stripe, etc.), tokens (JWT, OAuth), database URLs, private keys, and more.',
      },
      {
        question: 'Is this tool really free?',
        answer: 'Yes, completely free with no limits. We believe privacy tools should be accessible to everyone.',
      },
    ],
  },

  'code-sharing-tool': {
    slug: 'code-sharing-tool',
    preset: 'default',
    seo: {
      title: 'Safe Code Sharing Tool - Remove Secrets Before Posting',
      description: 'Share code on Stack Overflow, GitHub, or forums safely. Auto-remove passwords, API keys, and secrets. Free online tool.',
      keywords: ['code sharing tool', 'share code safely', 'remove secrets from code', 'safe stack overflow', 'post code online'],
    },
    hero: {
      title: 'Share Code Safely Online',
      subtitle: 'Remove passwords and secrets before posting code to Stack Overflow, GitHub Issues, or forums.',
    },
    example: `// Help! My API isn't working
const apiKey = 'sk-abc123-my-real-api-key';

fetch('https://api.service.com/data', {
  headers: { 
    'X-API-Key': apiKey,
    'Cookie': 'session=xyz789secret'
  }
}).then(res => {
  // Error: 401 Unauthorized
  console.log(res);
});`,
    features: [
      'Safe to post on Stack Overflow',
      'Safe to share in GitHub Issues',
      'Remove secrets from error logs',
      'Keep code structure for debugging help',
    ],
    faqs: [
      {
        question: 'Why is this important for Stack Overflow?',
        answer: 'Code posted on Stack Overflow is indexed by search engines forever. If you accidentally post an API key, it can be found and abused within minutes.',
      },
      {
        question: 'Can helpers still understand my code?',
        answer: 'Yes! The placeholders clearly show what type of data was there (API_KEY, PASSWORD, etc.) so helpers can still understand and debug your code.',
      },
    ],
  },
};

/**
 * 获取所有英文落地页 slugs
 */
export function getAllEnglishSlugs(): string[] {
  return Object.keys(LANDING_PAGES_EN);
}

/**
 * 获取英文落地页内容
 */
export function getEnglishLandingPage(slug: string): LandingPageContent | undefined {
  return LANDING_PAGES_EN[slug];
}
