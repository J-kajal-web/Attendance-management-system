import React from 'react';

const StatCard = ({ title, value, subtext, icon: Icon, color = 'blue', trend }) => {
  const colorStyles = {
    blue: {
      bg: 'bg-slate-800/80 hover:bg-slate-800 border-indigo-500/20 hover:border-indigo-500/40',
      iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      text: 'text-indigo-400'
    },
    emerald: {
      bg: 'bg-slate-800/80 hover:bg-slate-800 border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      text: 'text-emerald-400'
    },
    rose: {
      bg: 'bg-slate-800/80 hover:bg-slate-800 border-rose-500/20 hover:border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      text: 'text-rose-400'
    },
    amber: {
      bg: 'bg-slate-800/80 hover:bg-slate-800 border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      text: 'text-amber-400'
    },
    cyan: {
      bg: 'bg-slate-800/80 hover:bg-slate-800 border-cyan-500/20 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      text: 'text-cyan-400'
    }
  };

  const currentStyle = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`relative p-5 rounded-2xl border backdrop-blur-xl transition-all duration-200 shadow-lg shadow-black/20 ${currentStyle.bg}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-50 tracking-tight">{value}</h3>
          {subtext && <p className="text-xs text-slate-400 mt-1 font-medium">{subtext}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${currentStyle.iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
