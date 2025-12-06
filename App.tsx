import React, { useState } from 'react';
import { View } from './types';
import { Home } from './views/Home';
import { Analyzer } from './views/Analyzer';
import { DataVisuals } from './views/DataVisuals';
import { LucideLayoutDashboard, LucideSearch, LucideBarChart2, LucideInfo, LucideBrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg mb-1
        ${currentView === view 
          ? 'bg-primary-600 text-white shadow-md' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 flex-shrink-0 flex flex-col border-r border-slate-800">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <LucideBrainCircuit className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Sentient</span>
        </div>

        <nav className="flex-1 px-4 py-4">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Core Modules</p>
          <NavItem view={View.HOME} icon={LucideLayoutDashboard} label="Home" />
          <NavItem view={View.ANALYZER} icon={LucideSearch} label="Analyzer" />
          <NavItem view={View.DATA_VISUALS} icon={LucideBarChart2} label="Data Visuals" />
          
          <div className="mt-8">
             <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">System</p>
             <NavItem view={View.ABOUT} icon={LucideInfo} label="About" />
          </div>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white font-bold">JD</div>
             <div className="flex flex-col">
               <span className="text-sm text-white font-medium">Jane Developer</span>
               <span className="text-xs text-slate-500">Senior Engineer</span>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {currentView === View.HOME && <Home setView={setCurrentView} />}
        {currentView === View.ANALYZER && <Analyzer />}
        {currentView === View.DATA_VISUALS && <DataVisuals />}
        {currentView === View.ABOUT && (
          <div className="p-10 max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">About Sentient</h1>
            <p className="text-slate-600 leading-relaxed mb-4">
              Sentient is a state-of-the-art Sentiment Analysis Dashboard designed to showcase the power of combining traditional NLP concepts with modern Generative AI. 
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Built using <strong>React</strong>, <strong>TypeScript</strong>, and the <strong>Gemini API</strong>, it simulates multi-model analysis (VADER & TextBlob architectures) while providing deep semantic understanding that older libraries cannot match.
            </p>
            <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-2">Technical Architecture</h3>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
                <li><strong>Frontend:</strong> React 18 with Hooks & Functional Components</li>
                <li><strong>Styling:</strong> Tailwind CSS for responsive, mobile-first design</li>
                <li><strong>AI Engine:</strong> Google Gemini 2.5 Flash via @google/genai</li>
                <li><strong>Visualization:</strong> Recharts & Custom D3-based Scalable Vector Graphics</li>
                <li><strong>Data Processing:</strong> Client-side CSV parsing & Batch Inference</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;