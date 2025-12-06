import React from 'react';
import { View } from '../types';
import { LucideArrowRight, LucideZap, LucideFileText, LucidePieChart } from 'lucide-react';

interface HomeProps {
  setView: (view: View) => void;
}

export const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Understand Emotion in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Real-Time</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          A professional dashboard for deep sentiment analysis. 
          Process text or datasets instantly using advanced dual-metric AI models.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setView(View.ANALYZER)}
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 transition-all flex items-center gap-2 group"
          >
            Start Analyzing
            <LucideArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setView(View.DATA_VISUALS)}
            className="px-8 py-4 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl font-semibold transition-all"
          >
            Upload Dataset
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <FeatureCard 
          icon={LucideZap}
          title="Dual-Model Inference"
          description="Simulates VADER and TextBlob architectures simultaneously for robust polarity and subjectivity scoring."
          color="bg-amber-100 text-amber-600"
        />
        <FeatureCard 
          icon={LucideFileText}
          title="Intelligent NLP"
          description="Automated noun phrase extraction and context-aware summary generation for instant insights."
          color="bg-blue-100 text-blue-600"
        />
        <FeatureCard 
          icon={LucidePieChart}
          title="Visual Analytics"
          description="Interactive distribution charts, custom gauges, and dynamic word clouds for data storytelling."
          color="bg-emerald-100 text-emerald-600"
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }: any) => (
  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);
