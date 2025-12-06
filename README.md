# Sentient | Professional Sentiment Analysis Dashboard

![Status](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-purple)

**Sentient** is a portfolio-grade AI application designed to demonstrate advanced Natural Language Processing (NLP) capabilities wrapped in a modern, high-performance user interface. It leverages **Google's Gemini 2.5 Flash** model to simulate traditional Python NLP architectures (VADER and TextBlob) while providing the semantic depth of Large Language Models.

---

## 🚀 Core Features

### 1. Dual-Model Inference Engine
Unlike standard dashboards that rely on a single metric, Sentient performs a multi-dimensional analysis:
- **VADER Simulation (Valence Aware Dictionary and sEntiment Reasoner):** Calculates a compound score (-1.0 to 1.0) focusing on polarity intensity.
- **TextBlob Simulation:** Evaluates linguistic polarity and subjectivity to determine if text is factual or opinionated.

### 2. Batch Dataset Processing
- **CSV Ingestion:** Users can upload large datasets (e.g., product reviews, social media comments).
- **Automated Sampling:** The system intelligently samples and aggregates data to provide instant distribution insights without server overload.

### 3. Interactive Data Visualization
- **Real-time Gauges:** Custom SVG D3-style gauges for immediate sentiment feedback.
- **Dynamic Word Clouds:** Semantic extraction of key nouns and phrases, visualized by frequency and importance.
- **Distribution Charts:** Interactive Pie and Bar charts using `Recharts` for dataset analytics.

---

## 🛠️ Technical Stack

### Frontend Architecture
- **Framework:** React 18 (Functional Components, Hooks)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Utility-first, Responsive Design)
- **Icons:** Lucide React

### AI & Data Layer
- **Model:** Google Gemini 2.5 Flash (`gemini-2.5-flash`) via `@google/genai`
- **Output Handling:** Structured JSON Enforcing (Schema Validation)
- **Visualization Library:** Recharts & Custom SVG Components

---

## 📂 Project Structure

```bash
├── components/          # Reusable UI components
│   ├── Gauge.tsx        # D3-style sentiment gauge
│   └── WordCloud.tsx    # Keyword visualization engine
├── services/            # API integration layer
│   └── gemini.ts        # Google Gemini AI configuration & prompts
├── views/               # Page-level components
│   ├── Analyzer.tsx     # Single-text analysis logic
│   ├── DataVisuals.tsx  # Batch CSV processing logic
│   └── Home.tsx         # Landing page
├── App.tsx              # Main routing and layout controller
├── types.ts             # TypeScript interfaces and shared types
└── index.tsx            # Application entry point
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js v16+
- Google Cloud API Key with Gemini API access.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sentient-dashboard.git
   cd sentient-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   API_KEY=your_google_gemini_api_key
   ```

4. **Run Development Server**
   ```bash
   npm start
   ```

---

## 🧠 Design Philosophy

This project was built to showcase **"AI Engineering"**—the practice of engineering prompts and schemas to force LLMs to behave like deterministic software functions.

By defining strict `JSON Schemas` in the `gemini.ts` service, we ensure the AI returns type-safe data that can be immediately consumed by the frontend visualization components, eliminating the need for complex intermediate parsing logic.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
