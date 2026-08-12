import React from 'react';

const ProgressBar = ({ percentage = 0, showLabel = true, height = 'h-3' }) => {
  const safePercent = Math.min(100, Math.max(0, Math.round(percentage)));

  let colorClass = 'bg-emerald-500 shadow-emerald-500/50';
  if (safePercent < 75) {
    colorClass = 'bg-amber-500 shadow-amber-500/50';
  }
  if (safePercent < 50) {
    colorClass = 'bg-rose-500 shadow-rose-500/50';
  }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
          <span className="text-slate-400">Attendance Ratio</span>
          <span className="text-slate-100">{safePercent}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50 p-0.5 ${height}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 shadow-sm ${colorClass}`}
          style={{ width: `${safePercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
