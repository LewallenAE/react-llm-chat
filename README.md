# 🤖 React LLM Chat UI – *Eugenius at your service...*

Welcome to the sleek, animated, markdown-ready front-end for your custom LLM chatbot: **Eugenius**.  
Named after my middle name *Eugene* (and “You Genius”), this project is designed with **personality, performance**, and a polished developer experience in mind.

---

## 📚 Table of Contents
- [🌐 Live Demo](#-live-demo)
- [✨ Features](#-features)
- [🔧 Tech Stack](#-tech-stack)
- [🚀 Getting Started (To Clone)](#-getting-started-to-clone)
- [👨‍💻 Author](#-author)
- [🧠 License](#-license)

---

![Screenshot of Eugenius UI](public/Eugenius.png)

---

## 🌐 Live Demo
👉 [Click here to try it live](https://react-llm-chat.vercel.app/)

---

## ✨ Features
- 🎨 Typewriter text animation *(coming soon!)*
- 💬 Scrollable chat history with smooth auto-scroll
- 🌗 Dark/Light mode toggle (with persistence)
- 🧠 GPT-4 replies rendered in Markdown + syntax-highlighted code blocks
- 🐱 Custom Lottie loader animation (RainbowCat!)
- 🌐 Environment-based API endpoint (via Vite)
- 🔍 Future: Indexed for public search visibility

---

## 🔧 Tech Stack

### 🖥️ Front-End
- **React 18** + **Vite**
- **TypeScript**
- **ReactMarkdown** + **Prism** for syntax highlighting
- **Lottie-React** for animated loaders
- **Custom CSS** with a responsive, minimal-glass aesthetic

### ⚙️ Back-End
- **Node.js** + **Express**
- **OpenAI API (via fetch)**
- **CORS** enabled
- **dotenv** for secure environment configs

---

## 🚀 Getting Started (To Clone)

```bash
git clone https://github.com/LewallenAE/react-llm-chat.git
cd react-llm-chat
npm install
echo "VITE_API_URL=http://localhost:3000" > .env.local
npm run dev
