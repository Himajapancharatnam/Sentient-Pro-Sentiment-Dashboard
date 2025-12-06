import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { analyzeDataset } from '../services/gemini';
import { DatasetAnalysisResult } from '../types';
import { WordCloud } from '../components/WordCloud';
import { LucideUploadCloud, LucideFileSpreadsheet, LucideLoader } from 'lucide-react';

export const DataVisuals: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<DatasetAnalysisResult | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setResult(null); // Reset previous results
    }
  };

  const processFile = async () => {
    if (!file) return;

    setProcessing(true);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      if (!text) return;

      // Simple CSV parsing (assuming standard format with header)
      const rows = text.split('\n');
      if (rows.length < 2) {
        setProcessing(false);
        alert("CSV is empty or invalid.");
        return;
      }

      // Heuristic to find the 'text' or 'comment' column
      const headers = rows[0].toLowerCase().split(',');
      let textColIndex = headers.findIndex(h => h.includes('text') || h.includes('comment') || h.includes('review') || h.includes('content'));
      
      // Default to first column if no obvious text column found
      if (textColIndex === -1) textColIndex = 0;

      // Extract first 30 valid rows for sampling to avoid token limits in this demo
      const sampleTexts = rows.slice(1, 31)
        .map(row => {
            // rudimentary CSV row split handling quotes
            const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); 
            return cols[textColIndex]?.replace(/"/g, '').trim();
        })
        .filter(t => t && t.length > 5);

      try {
        const analysis = await analyzeDataset(sampleTexts);
        setResult(analysis);
      } catch (err) {
        alert("Failed to analyze dataset.");
      } finally {
        setProcessing(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dataset Visualization</h1>
        <p className="text-slate-500">Upload CSV files to visualize sentiment distribution across large datasets.</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-8 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center transition-colors hover:bg-slate-50">
        {!result && !processing ? (
          <>
            <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-4">
              <LucideUploadCloud size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Upload your CSV Data</h3>
            <p className="text-slate-500 mb-6 text-center max-w-md">Ensure your CSV has a column named 'text', 'comment', or 'review'. We will sample the dataset for rapid analysis.</p>
            
            <div className="flex gap-4 items-center">
              <input 
                type="file" 
                accept=".csv" 
                onChange={handleFileUpload}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary-50 file:text-primary-700
                  hover:file:bg-primary-100
                "
              />
              {file && (
                <button 
                  onClick={processFile}
                  className="bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
                >
                  Analyze CSV
                </button>
              )}
            </div>
          </>
        ) : processing ? (
          <div className="flex flex-col items-center">
            <LucideLoader className="animate-spin text-primary-600 mb-4" size={40} />
            <p className="text-slate-600 font-medium">Processing Dataset & Generating Insights...</p>
          </div>
        ) : (
          <div className="w-full flex justify-between items-center">
             <div className="flex items-center gap-3">
                <LucideFileSpreadsheet className="text-green-600" size={24}/>
                <div>
                   <p className="font-semibold text-slate-900">{file?.name}</p>
                   <p className="text-sm text-slate-500">{result?.totalRecords} Records Analyzed (Sampled)</p>
                </div>
             </div>
             <button onClick={() => {setResult(null); setFile(null);}} className="text-sm text-slate-400 hover:text-slate-600 underline">Upload New</button>
          </div>
        )}
      </div>

      {result && (
        <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
           {/* Chart 1: Distribution Pie */}
           <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
             <h3 className="text-lg font-bold text-slate-800 mb-6">Sentiment Distribution</h3>
             <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={result.sentimentDistribution}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {result.sentimentDistribution.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="flex justify-center gap-6 mt-4">
                {result.sentimentDistribution.map(d => (
                   <div key={d.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                      <span className="text-sm text-slate-600">{d.name}</span>
                   </div>
                ))}
             </div>
           </div>

           {/* Chart 2: Stats Bar */}
           <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
             <h3 className="text-lg font-bold text-slate-800 mb-6">Count Analytics</h3>
             <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={result.sentimentDistribution}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {result.sentimentDistribution.map((entry, index) => (
                        <Cell key={`bar-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
           </div>

           {/* Row 3: Keywords */}
           <div className="lg:col-span-2">
             <WordCloud keywords={result.keywords} />
           </div>

           {/* Summary Stats Card */}
           <div className="lg:col-span-2 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 text-white flex flex-col md:flex-row justify-around items-center gap-6">
              <div className="text-center">
                 <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Average Compound Score</p>
                 <p className="text-4xl font-bold">{result.averageCompound.toFixed(3)}</p>
              </div>
              <div className="w-px h-12 bg-slate-700 hidden md:block"></div>
              <div className="text-center">
                 <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Dominant Sentiment</p>
                 <p className="text-4xl font-bold text-primary-400">
                    {result.positiveCount > result.negativeCount && result.positiveCount > result.neutralCount ? 'Positive' :
                     result.negativeCount > result.positiveCount ? 'Negative' : 'Neutral'}
                 </p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
