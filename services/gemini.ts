import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, DatasetAnalysisResult } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = "gemini-2.5-flash";

// Schema for Single Text Analysis
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    metrics: {
      type: Type.OBJECT,
      properties: {
        polarity: { type: Type.NUMBER, description: "Float between -1.0 (negative) and 1.0 (positive)" },
        subjectivity: { type: Type.NUMBER, description: "Float between 0.0 (objective) and 1.0 (subjective)" },
        compound: { type: Type.NUMBER, description: "Compound score -1.0 to 1.0" },
        pos: { type: Type.NUMBER, description: "Positive component 0.0 to 1.0" },
        neg: { type: Type.NUMBER, description: "Negative component 0.0 to 1.0" },
        neu: { type: Type.NUMBER, description: "Neutral component 0.0 to 1.0" },
        verdict: { type: Type.STRING, description: "Brief verdict like 'Highly Positive', 'Neutral', etc." },
      },
      required: ["polarity", "subjectivity", "compound", "pos", "neg", "neu", "verdict"],
    },
    keywords: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          count: { type: Type.NUMBER },
        },
      },
      description: "Extract top 10 important nouns/phrases.",
    },
    summary: { type: Type.STRING, description: "A 1-sentence summary of the sentiment." },
  },
};

export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  try {
    const response = await genAI.models.generateContent({
      model: modelName,
      contents: `Perform a detailed sentiment analysis on the following text. 
      Simulate two models: 
      1. A linguistic polarity model (like TextBlob).
      2. A valence-based model (like VADER).
      
      Text to analyze: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.1, // Low temperature for consistent scoring
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }
    throw new Error("No response from AI");
  } catch (error) {
    console.error("Analysis failed", error);
    throw error;
  }
};

// Schema for Batch/Dataset Analysis
const datasetSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    totalRecords: { type: Type.NUMBER },
    positiveCount: { type: Type.NUMBER },
    negativeCount: { type: Type.NUMBER },
    neutralCount: { type: Type.NUMBER },
    averageCompound: { type: Type.NUMBER },
    keywords: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          count: { type: Type.NUMBER }, // Frequency or Importance score
        },
      },
    },
  },
};

export const analyzeDataset = async (sampleTexts: string[]): Promise<DatasetAnalysisResult> => {
  try {
    const concatenated = sampleTexts.join("\n---\n");
    const response = await genAI.models.generateContent({
      model: modelName,
      contents: `Analyze the sentiment of the following list of comments/reviews (separated by ---).
      Provide aggregate statistics.
      
      Data:
      ${concatenated}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: datasetSchema,
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      
      // Transform for UI
      return {
        ...data,
        sentimentDistribution: [
          { name: 'Positive', value: data.positiveCount, color: '#22c55e' }, // Green
          { name: 'Neutral', value: data.neutralCount, color: '#94a3b8' },  // Slate
          { name: 'Negative', value: data.negativeCount, color: '#ef4444' }, // Red
        ]
      };
    }
    throw new Error("No response from AI");
  } catch (error) {
    console.error("Dataset analysis failed", error);
    throw error;
  }
};
