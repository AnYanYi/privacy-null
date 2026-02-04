# Privacy Null (pnull)

🔒 **100% 本地运行的隐私数据去除工具** - 在分享代码前自动检测并替换敏感信息

[![GitHub Pages](https://img.shields.io/badge/demo-pnull.com-blue)](https://pnull.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[English](#english) | [中文](#中文)

---

## English

### What is Privacy Null?

Privacy Null is a browser-based tool that automatically detects and redacts sensitive information from your code before sharing. **All processing happens locally in your browser** - your data never leaves your device.

### Features

- 🔐 **100% Local Processing** - No data sent to any server
- 🎯 **80+ Detection Rules** - API keys, tokens, passwords, PII, and more
- 🌍 **Bilingual Support** - English and Chinese interfaces
- 🎨 **Dark/Light Theme** - Easy on the eyes
- ⚡ **Real-time Preview** - See redactions as you type
- 📋 **One-click Copy** - Quickly copy sanitized output

### Detected Patterns

| Category | Examples |
|----------|----------|
| **API Keys** | OpenAI, Anthropic, AWS, Azure, Google Cloud, Stripe |
| **Tokens** | GitHub, GitLab, Slack, Discord, Telegram |
| **Cloud Services** | Alibaba Cloud, Tencent Cloud, Huawei Cloud |
| **Credentials** | Passwords, Database URLs, Connection Strings |
| **PII** | Emails, Phone Numbers, IP Addresses |
| **Financial** | Credit Cards, Bank Accounts, ID Numbers |
| **Secrets** | JWT, Private Keys, Certificates |

### Tech Stack

- **Framework**: Next.js 15 + React 19
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **Deployment**: GitHub Pages (Static Export)

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 中文

### 什么是 Privacy Null？

Privacy Null 是一个基于浏览器的工具，可以在分享代码前自动检测并替换敏感信息。**所有处理都在本地浏览器中完成** - 你的数据永远不会离开你的设备。

### 功能特点

- 🔐 **100% 本地处理** - 不向任何服务器发送数据
- 🎯 **80+ 检测规则** - API 密钥、令牌、密码、个人信息等
- 🌍 **双语支持** - 中英文界面
- 🎨 **明/暗主题** - 保护眼睛
- ⚡ **实时预览** - 输入即可看到脱敏效果
- 📋 **一键复制** - 快速复制处理后的内容

### 检测模式

| 类别 | 示例 |
|------|------|
| **API 密钥** | OpenAI、Anthropic、AWS、Azure、Google Cloud、Stripe |
| **令牌** | GitHub、GitLab、Slack、Discord、Telegram |
| **云服务** | 阿里云、腾讯云、华为云 |
| **凭据** | 密码、数据库 URL、连接字符串 |
| **个人信息** | 邮箱、手机号、IP 地址 |
| **金融信息** | 银行卡、身份证号 |
| **密钥** | JWT、私钥、证书 |

### 技术栈

- **框架**: Next.js 15 + React 19
- **语言**: TypeScript 5.7
- **样式**: Tailwind CSS 3.4
- **部署**: GitHub Pages (静态导出)

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

---

## License

MIT © 2026 [AnYanYi](https://github.com/AnYanYi)
