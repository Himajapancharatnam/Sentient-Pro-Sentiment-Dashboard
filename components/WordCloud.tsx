import React from 'react';
import { Keyword } from '../types';

interface WordCloudProps {
  keywords: Keyword[];
}

export const WordCloud: React.FC<WordCloudProps> = ({ keywords }) => {
  if (keywords.length === 0) return null;

  // Find max count to normalize sizes
  const maxCount = Math.max(...keywords.map(k => k.count));
  const minCount = Math.min(...keywords.map(k => k.count));

  const getSize = (count: number) => {
    // Linear scale between 0.8rem and 2.5rem
    const minSize = 0.8;
    const maxSize = 2.5;
    if (maxCount === minCount) return (minSize + maxSize) / 2;
    return minSize + ((count - minCount) / (maxCount - minCount)) * (maxSize - minSize);
  };

  const getOpacity = (count: number) => {
    const minOp = 0.6;
    const maxOp = 1;
    if (maxCount === minCount) return 1;
    return minOp + ((count - minCount) / (maxCount - minCount)) * (maxOp - minOp);
  };

  // Color palette
  const colors = [
    'text-blue-600', 'text-indigo-600', 'text-sky-600', 'text-cyan-600', 'text-teal-600'
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/></svg>
        Key Topics Extracted
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 min-h-[200px] content-center">
        {keywords.map((k, idx) => (
          <span
            key={idx}
            className={`${colors[idx % colors.length]} font-medium transition-all duration-300 hover:scale-110 cursor-default`}
            style={{
              fontSize: `${getSize(k.count)}rem`,
              opacity: getOpacity(k.count)
            }}
          >
            {k.text}
          </span>
        ))}
      </div>
    </div>
  );
};
