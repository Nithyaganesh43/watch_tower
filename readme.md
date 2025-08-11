# 🏰 WatchTower 24/7

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://watchtower-24-7.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

> **Your reliable, free server monitoring solution that keeps your services running smoothly with intelligent 5-minute health checks.**

![WatchTower Banner](https://res.cloudinary.com/dflgxymvs/image/upload/v1754287891/lecrowninteriors/f22mt6lnihzmejdjdg1p.avif)

## 🚀 Live Application

**Frontend URL**: [https://watchtower-24-7.vercel.app/](https://watchtower-24-7.vercel.app/)

## 📖 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [How It Works](#-how-it-works)
- [Special Features](#-special-features)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

## ✨ Features

### 🔍 **Core Monitoring**
- **5-Minute Health Checks**: Continuous monitoring every 5 minutes, 24/7
- **Real-time Dashboard**: Live status updates with beautiful UI
- **Multi-Server Support**: Monitor up to 10 servers simultaneously
- **Response Time Tracking**: Detailed performance metrics

### 🚨 **Smart Alerting**
- **Intelligent Notifications**: Email alerts after 3 consecutive failures
- **Auto-Pause System**: Prevents notification spam
- **One-Click Restart**: Easy monitoring resumption
- **Failure Analysis**: Detailed downtime reports

### 🛡️ **Security & Authentication**
- **Email Verification**: Secure device-based authentication
- **JWT Token System**: Stateless authentication
- **Rate Limiting**: API protection against abuse
- **CORS Protection**: Secure cross-origin requests

### 📊 **Analytics & Insights**
- **Uptime Statistics**: 30 days of historical data
- **Performance Trends**: Response time analysis
- **Server Status Summary**: Quick overview dashboard
- **Export Capabilities**: Data export options

### 🎯 **Special for Render Users**
- **Free Tier Optimizer**: Keep Render servers awake 24/7
- **Sleep Prevention**: Guaranteed uptime for free tier services
- **Cost Optimization**: Smart monitoring to avoid overages

## 🏗️ Architecture

WatchTower follows a modern microservices architecture with clear separation of concerns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   Express.js    │    │   MongoDB       │
│   Frontend      │◄──►│   Backend       │◄──►│   Database      │
│   (Vercel)      │    │   (Node.js)     │    │   (Atlas)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│   Monitoring    │◄─────────────┘
                        │   Service       │
                        │   (Cron Jobs)   │
                        └─────────────────┘
                                │
                        ┌─────────────────┐
                        │   Email         │
                        │   Service       │
                        │   (Nodemailer)  │
                        └─────────────────┘
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 16+
- **Framework**: Express.js 4.18+
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **Scheduling**: Node-cron
- **Security**: Helmet, CORS, Rate Limiting
- **Monitoring**: Axios for HTTP requests

### Frontend
- **Framework**: Next.js 15.2+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

Before running WatchTower, ensure you have:

- **Node.js** 16.0 or higher
- **npm** or **yarn** package manager
- **MongoDB** database (local or MongoDB Atlas)
- **Email service** credentials (Gmail, SendGrid, etc.)
- **Git** for version control

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Nithyaganesh43/watch_tower.git
cd watch_tower
```

### 2. Install Backend Dependencies

```bash
cd "Watch-Tower Backend"
npm install
```

### 3. Install Frontend Dependencies

```bash
cd "../Watch-Tower Frontend"
npm install
```

## 🔐 Environment Variables

### Backend Environment (.env)

Create a `.env` file in the `Watch-Tower Backend` directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/watchtower
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/watchtower

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Server Configuration
PORT=3000
NODE_ENV=development

# Email Configuration (Gmail Example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Monitoring Configuration
MONITORING_INTERVAL=300000  # 5 minutes in milliseconds
MAX_CONSECUTIVE_FAILURES=3
REQUEST_TIMEOUT=10000       # 10 seconds
```

### Frontend Environment (.env.local)

Create a `.env.local` file in the `Watch-Tower Frontend` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3001

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 🚀 Running the Application

### Development Mode

#### 1. Start the Backend Server

```bash
cd "Watch-Tower Backend"
npm run dev
```

The backend will start on `http://localhost:3000`

#### 2. Start the Frontend Development Server

```bash
cd "Watch-Tower Frontend"
npm run dev
```

The frontend will start on `http://localhost:3001`

### Production Mode

#### 1. Build and Start Backend

```bash
cd "Watch-Tower Backend"
npm start
```

#### 2. Build and Start Frontend

```bash
cd "Watch-Tower Frontend"
npm run build
npm start
```

## 📚 API Documentation

### Authentication Endpoints

#### Request Verification Email
```http
POST /auth/request
Content-Type: application/json

{
  "email": "user@example.com",
  "deviceId": "unique_device_identifier"
}
```

#### Verify Email Token
```http
POST /auth/verify?token=verification_token
```

#### Check Authentication Status
```http
GET /auth/check?email=user@example.com&deviceId=device_id
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <token>
```

### Server Management Endpoints

#### Add New Server
```http
POST /servers/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://your-server.com",
  "alertEnabled": true
}
```

#### Get All Servers
```http
GET /servers
Authorization: Bearer <token>
```

#### Remove Server
```http
DELETE /servers/:serverId
Authorization: Bearer <token>
```

#### Get Server Status Summary
```http
GET /servers/status
Authorization: Bearer <token>
```

### Global Statistics

#### Get Platform Statistics
```http
GET /global/currentTotal
```

Response:
```json
{
  "totalServers": 1250,
  "totalUsers": 450
}
```

### Rate Limiting

- **Authentication endpoints**: 1000 requests per 5 minutes
- **Server management**: 50 requests per 5 minutes
- **Global endpoints**: 500 requests per 5 minutes
- **Check endpoint**: 10000 requests per 5 minutes

## 🔄 How It Works

### Monitoring Flow

1. **Health Check Initiation**: Every 5 minutes, the system sends HTTP requests to monitored servers
2. **Response Analysis**: Records response time, status code, and availability
3. **Failure Detection**: Tracks consecutive failures for each server
4. **Smart Alerting**: After 3 consecutive failures:
   - Sends detailed email notification
   - Automatically pauses monitoring to prevent spam
   - Provides one-click restart option
5. **Data Storage**: Maintains 30 days of historical performance data

### Monitoring Process Visualization

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Server    │    │  Response   │    │   Status    │
│   Ping      │───►│  Analysis   │───►│  Update     │
│ (5 minutes) │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Success   │    │   Failure   │    │  Critical   │
│ Continue    │    │  Counter    │    │   Alert     │
│ Monitoring  │    │ Increment   │    │ & Pause     │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 🌟 Special Features

### 🚀 Render Free Tier Optimizer

WatchTower is specially designed to help developers maximize their Render free tier:

- **Sleep Prevention**: 5-minute pings keep your Render servers active 24/7
- **Cost Optimization**: Monitor only one server per Render account to stay within limits
- **Guaranteed Uptime**: Your free tier servers will never sleep with WatchTower

### ⚠️ Important Constraint for Render Users

**Monitor only ONE server per Render account** to avoid exceeding free tier limits and potential charges.

### 🔔 Smart Alert System

- **Failure Threshold**: Alerts trigger after exactly 3 consecutive failures
- **Spam Prevention**: Automatic monitoring pause after alert
- **Detailed Notifications**: Email includes failure details and resolution steps
- **Easy Recovery**: One-click monitoring restart from dashboard

## 📁 Project Structure

```
watch_tower/
├── Watch-Tower Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT authentication
│   │   │   └── rateLimiter.js       # API rate limiting
│   │   ├── models/
│   │   │   ├── User.js              # User schema
│   │   │   ├── Server.js            # Server schema
│   │   │   └── PendingAuth.js       # Temporary auth schema
│   │   ├── routes/
│   │   │   ├── auth.js              # Authentication routes
│   │   │   ├── servers.js           # Server management
│   │   │   ├── global.js            # Global statistics
│   │   │   └── serverInit.js        # Server initialization
│   │   ├── services/
│   │   │   └── monitoring.js        # Core monitoring logic
│   │   └── utils/
│   │       ├── email.js             # Email utilities
│   │       ├── jwt.js               # JWT utilities
│   │       └── validation.js        # Input validation
│   ├── server.js                    # Main server file
│   ├── package.json
│   └── .env                         # Environment variables
│
└── Watch-Tower Frontend/
    ├── src/
    │   ├── app/
    │   │   ├── globals.css          # Global styles
    │   │   ├── layout.tsx           # Root layout
    │   │   └── page.tsx             # Home page
    │   ├── components/
    │   │   └── ui/                  # Reusable UI components
    │   └── lib/                     # Utility libraries
    ├── public/                      # Static assets
    ├── next.config.js              # Next.js configuration
    ├── tailwind.config.js          # Tailwind CSS config
    ├── package.json
    └── .env.local                  # Frontend environment
```

## 🧪 Testing

### Backend Testing

```bash
cd "Watch-Tower Backend"
npm test
```

### Frontend Testing

```bash
cd "Watch-Tower Frontend"
npm run test
```

### Manual Testing Checklist

- [ ] User registration and email verification
- [ ] Server addition and removal
- [ ] Monitoring status updates
- [ ] Alert system functionality
- [ ] Dashboard real-time updates
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. **Set environment variables** in your hosting platform
2. **Deploy from GitHub** or push your code
3. **Ensure MongoDB connection** is properly configured
4. **Verify email service** is working in production

### Frontend Deployment (Vercel - Recommended)

1. **Connect GitHub repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Set environment variables** in Vercel dashboard
4. **Deploy automatically** on every push to main branch

### Custom Domain Setup

1. **Add custom domain** in Vercel/hosting platform
2. **Configure DNS records** (CNAME/A records)
3. **Update CORS settings** in backend for new domain
4. **Update environment variables** with production URLs

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Follow **ESLint** and **Prettier** configurations
- Write **comprehensive tests** for new features
- Update **documentation** for API changes
- Use **conventional commit messages**
- Ensure **mobile responsiveness** for UI changes

## 🐛 Bug Reports & Feature Requests

Please use [GitHub Issues](https://github.com/Nithyaganesh43/watch_tower/issues) to:

- Report bugs with detailed reproduction steps
- Request new features with clear use cases
- Ask questions about usage or deployment
- Suggest improvements to documentation

## 📞 Support & Contact

### 👨‍💻 Developer Contact

**Nithya Ganesh**

[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/919042421622)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nithyaganesh43/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Nithyaganesh43/)

### 💰 Support the Project

If WatchTower has helped you keep your servers running smoothly, consider supporting the project:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/nithyaganesh)

Your support helps maintain and improve WatchTower for the developer community!

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 📊 Project Statistics

- **🏗️ Built with**: Modern web technologies
- **⭐ GitHub Stars**: Growing developer community
- **🚀 Deployment**: Production-ready architecture
- **📈 Monitoring**: 288 checks per day per server
- **🕒 Uptime**: 99.9% service availability
- **🔐 Security**: Enterprise-grade authentication

---

<div align="center">

**Made with ❤️ by [Nithya Ganesh](https://github.com/Nithyaganesh43)**

*Keep your servers awake, keep your users happy!* 🏰

[![WatchTower](https://img.shields.io/badge/WatchTower-24%2F7-blue?style=for-the-badge)](https://watchtower-24-7.vercel.app/)

</div>