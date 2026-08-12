import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

const StatusBadge = ({ status, size = 'md' }) => {
  if (!status) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
        <AlertCircle className="w-3.5 h-3.5" />
        Unmarked
      </span>
    );
  }

  const isPresent = status === 'Present';
  const isAbsent = status === 'Absent';
  const isLeave = status === 'Leave';

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs sm:text-sm';

  if (isPresent) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 ${sizeClasses}`}>
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        Present
      </span>
    );
  }

  if (isAbsent) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 ${sizeClasses}`}>
        <XCircle className="w-4 h-4 text-rose-400" />
        Absent
      </span>
    );
  }

  if (isLeave) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 ${sizeClasses}`}>
        <Clock className="w-4 h-4 text-amber-400" />
        Leave
      </span>
    );
  }

  return <span className="text-slate-400">{status}</span>;
};

export default StatusBadge;
