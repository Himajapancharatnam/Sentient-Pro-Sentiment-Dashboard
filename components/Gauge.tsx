import React from 'react';

interface GaugeProps {
  value: number; // -1 to 1
  label: string;
}

export const Gauge: React.FC<GaugeProps> = ({ value, label }) => {
  // Normalize value from [-1, 1] to [0, 1] for calculations
  const normalized = (value + 1) / 2;
  
  // Angle calculations (semi-circle)
  const radius = 80;
  const stroke = 15;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // We only want a semi-circle (180 deg), so we display half the circumference
  // But strictly utilizing stroke-dasharray for a full circle masked is easier usually.
  // Let's do a simple path arc approach for better control.

  // Arc path generator
  const arcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(80, 80, 65, endAngle);
    const end = polarToCartesian(80, 80, 65, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y, 
      "A", 65, 65, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  // Value maps to degree 0 (left) to 180 (right)
  const needleAngle = normalized * 180;
  
  // Color determination
  let color = '#94a3b8';
  if (value > 0.05) color = '#22c55e';
  else if (value < -0.05) color = '#ef4444';
  
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</h3>
      <div className="relative w-40 h-24 overflow-hidden">
        <svg width="160" height="160" className="absolute top-0 left-0">
           {/* Background Track */}
           <path d={arcPath(0, 180)} fill="none" stroke="#e2e8f0" strokeWidth="15" strokeLinecap="round" />
           {/* Colored Value Bar - Masked or Simple? Let's use Gradient or Segments */}
           {/* Simplified: 3 Segments */}
           <path d={arcPath(0, 60)} fill="none" stroke="#fca5a5" strokeWidth="15" />
           <path d={arcPath(60, 120)} fill="none" stroke="#f1f5f9" strokeWidth="15" />
           <path d={arcPath(120, 180)} fill="none" stroke="#86efac" strokeWidth="15" />
           
           {/* Needle */}
           <g transform={`rotate(${needleAngle}, 80, 80)`}>
             <line x1="80" y1="80" x2="30" y2="80" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
             <circle cx="80" cy="80" r="4" fill="#334155" />
           </g>
        </svg>
      </div>
      <div className="mt-1 text-2xl font-bold" style={{ color }}>
        {value.toFixed(2)}
      </div>
    </div>
  );
};
