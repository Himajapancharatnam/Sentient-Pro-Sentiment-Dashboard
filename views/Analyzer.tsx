import React, { useState } from 'react';
import { analyzeText } from '../services/gemini';
import { AnalysisResult } from '../types';
import { Gauge } from '../components/Gauge';
import { WordCloud } from '../components/WordCloud';
import { LucidePlay, LucideLoader, LucideAlertCircle, LucideCheckCircle2 } from 'lucide-react';

export const Analyzer: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeText(input);
      setResult(data);
    } catch (err) {
      setError("Failed to analyze text. Please check your connection or API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sentiment Analyzer</h1>
          <p className="text-slate-500">Dual-model NLP inference engine</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Input Text</label>
            <textarea 
              className="w-full h-64 p-4 text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-all"
              placeholder="Paste product reviews, social media comments, or any text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-slate-400">{input.length} chars</span>
              <button
                onClick={handleAnalyze}
                disabled={loading || !input.trim()}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white transition-all
                  ${loading || !input.trim() 
                    ? 'bg-slate-300 cursor-not-allowed' 
                    : 'bg-primary-600 hover:bg-primary-700 shadow-md shadow-primary-500/20 active:scale-95'}`}
              >
                {loading ? <LucideLoader className="animate-spin" size={18} /> : <LucidePlay size={18} />}
                {loading ? 'Processing...' : 'Analyze Sentiment'}
              </button>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                <LucideAlertCircle size={16} />
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2">
          {!result && !loading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <LucideLoader size={48} className="mb-4 opacity-20" />
              <p>Ready to analyze. Enter text to begin.</p>
            </div>
          )}

          {loading && !result && (
             <div className="h-full min-h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                  <p className="text-slate-500 font-medium">Running VADER & TextBlob Simulation...</p>
                </div>
             </div>
          )}

          {result && (
            <div className="space-y-6 animate-fade-in">
              {/* Top Banner Verdict */}
              <div className={`p-6 rounded-xl border flex items-center gap-4
                ${result.metrics.compound > 0.05 ? 'bg-green-50 border-green-200 text-green-800' : 
                  result.metrics.compound < -0.05 ? 'bg-red-50 border-red-200 text-red-800' : 
                  'bg-slate-50 border-slate-200 text-slate-800'}`}>
                <LucideCheckCircle2 size={32} />
                <div>
                  <h2 className="text-lg font-bold">Verdict: {result.metrics.verdict}</h2>
                  <p className="text-sm opacity-80">{result.summary}</p>
                </div>
              </div>

              {/* Gauges Row */}
              <div className="grid sm:grid-cols-2 gap-6">
                <Gauge value={result.metrics.compound} label="VADER Compound Score" />
                <Gauge value={result.metrics.polarity} label="TextBlob Polarity" />
              </div>

              {/* Detailed Metrics & Word Cloud */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Detailed Breakdowns */}
                <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Component Analysis</h3>
                  
                  <div className="space-y-5">
                    <MetricBar label="Subjectivity" value={result.metrics.subjectivity} color="bg-purple-500" />
                    <MetricBar label="Positivity" value={result.metrics.pos} color="bg-green-500" />
                    <MetricBar label="Negativity" value={result.metrics.neg} color="bg-red-500" />
                    <MetricBar label="Neutrality" value={result.metrics.neu} color="bg-slate-400" />
                  </div>
                </div>

                {/* Keywords */}
                <WordCloud keywords={result.keywords} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MetricBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium text-slate-700">{label}</span>
      <span className="text-slate-500">{(value).toFixed(2)}</span>
    </div>
    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
      <div 
        className={`h-2.5 rounded-full ${color} transition-all duration-1000 ease-out`} 
        style={{ width: `${Math.min(Math.max(value, 0), 1) * 100}%` }}
      ></div>
    </div>
  </div>
);
