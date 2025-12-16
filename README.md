# 🚀 AI Fusion – Multi-Model AI Chat SaaS

AI Fusion is a **full-stack Multi-AI Chat SaaS application** built with **Next.js**, **React**, **ArcJet**, and **CodeRabbit**.  
It allows users to chat with **multiple AI models (GPT, Gemini, Claude, etc.)** in a single secure, scalable platform.

By following this project, you’ll learn how to design and deploy a **production-ready AI SaaS application** with authentication, rate limiting, and real-world best practices.

---

## ✨ Features

- 🤖 **Multi-AI Model Integration**
  - Chat with GPT, Gemini, Claude, and more in one app
- 🔐 **Authentication & User Management**
  - Secure login using Clerk
- ⚡ **Rate Limiting & Security**
  - ArcJet token-bucket rate limiting per user
- 🧠 **AI-Powered Code Reviews**
  - CodeRabbit integration for smarter development
- 📊 **Usage Tracking**
  - Free plan message limits with live usage progress
- 🌗 **Dark / Light Mode**
- 🧩 **Modern UI**
  - Built using ShadCN UI + Radix
- 🚀 **Production-Ready Architecture**
  - Scalable, secure, and SaaS-friendly

---

## 🛠 Tech Stack

**Frontend**
- Next.js (App Router)
- React
- Tailwind CSS
- ShadCN UI
- Radix UI
- Lucide Icons

**Backend**
- Next.js API Routes
- Firebase Firestore
- ArcJet (Rate Limiting & Security)

**Authentication**
- Clerk

**AI & Developer Tools**
- Multiple AI Models (GPT, Gemini, Claude, etc.)
- CodeRabbit (AI code reviews)

---

## 📁 Project Structure

```text
app/
 ├─ api/                # API routes (chat, rate limit, usage)
 ├─ components/         # Reusable UI components
 ├─ config/             # Firebase & app config
 ├─ lib/                # ArcJet & utilities
 ├─ context/            # Global state
 ├─ page.jsx            # Main app page
 └─ layout.jsx          # Root layout
