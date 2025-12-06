Sentient – Professional Sentiment Analysis Dashboard
<p align="center"> <img src="https://img.shields.io/github/languages/top/Himajapancharatnam/Sentient-Pro-Sentiment-Dashboard?style=for-the-badge" /> <img src="https://img.shields.io/github/license/Himajapancharatnam/Sentient-Pro-Sentiment-Dashboard?style=for-the-badge" /> <img src="https://img.shields.io/github/stars/Himajapancharatnam/Sentient-Pro-Sentiment-Dashboard?style=for-the-badge" /> <img src="https://img.shields.io/github/forks/Himajapancharatnam/Sentient-Pro-Sentiment-Dashboard?style=for-the-badge" /> </p>
📌 Overview

Sentient is a portfolio-grade AI Sentiment Analysis Dashboard engineered with modern frontend architecture and advanced NLP simulation.

The system uses Google Gemini 2.5 Flash to simulate traditional sentiment engines (VADER & TextBlob) through prompt engineering and strict JSON output enforcement, ensuring predictable, type-safe AI behavior inside a real-time UI.

This is not a demo app.
This is AI Engineering in production style.

🚀 Features
✅ Dual-Model Sentiment Engine

Simulates two industry-standard approaches in parallel:

VADER Simulation – Polarity intensity score (-1.0 to +1.0)

TextBlob Simulation – Polarity & subjectivity classification

✅ CSV Batch Processing

Upload and analyze datasets instantly:

Bulk sentiment scoring

Automatic sampling

Distribution analytics

Polarity trends

✅ Interactive Data Visualizations

📊 Sentiment gauge (SVG driven)

☁ Dynamic word clouds

📈 Bar charts

🥧 Pie charts

⚡ Real-time updates

⚙️ Tech Stack
Frontend

React 18 (Hooks, Functional Design)

TypeScript (Strict Mode)

Tailwind CSS

Lucide Icons

Recharts

AI Layer

Google Gemini 2.5 Flash

@google/genai SDK

Structured JSON Schemas

Deterministic Prompt Design

📁 Project Structure
src/
├── components/
│   ├── Gauge.tsx
│   └── WordCloud.tsx
├── services/
│   └── gemini.ts
├── views/
│   ├── Home.tsx
│   ├── Analyzer.tsx
│   └── DataVisuals.tsx
├── App.tsx
├── types.ts
└── index.tsx

🧩 Installation & Setup
Prerequisites

Node.js v16+

Google Gemini API Key

Clone Repository
git clone https://github.com/Himajapancharatnam/Sentient-Pro-Sentiment-Dashboard.git
cd Sentient-Pro-Sentiment-Dashboard

Install Dependencies
npm install

Configure API Key

Create .env file:

API_KEY=your_google_gemini_api_key

Run Development Server
npm start

🧠 Engineering Philosophy

Sentient was built to showcase:

✅ Prompt Engineering
✅ Schema Enforcement
✅ Type-safe Output
✅ UI-AI Isolation
✅ LLM as deterministic function
✅ Production-style architecture

This system forces AI to behave like software — not conversation.

🎯 Use Cases

Brand reputation monitoring

Product feedback analytics

Social media analysis

AI portfolio showcase

Real-world NLP visualization

📸 Screenshots (Add soon)
![Dashboard Preview](./screenshots/dashboard.png)


(Add screenshots to improve recruiter impact.)

📜 License

MIT License

👤 Author

Himaja Pancharatnam
GitHub: https://github.com/Himajapancharatnam

Role: AI Engineer | Frontend Developer | Full-Stack Developer
