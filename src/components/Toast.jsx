import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = () => {
  const { toast, setToast } = useAttendance();

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  let bgClass = 'bg-emerald-950 border-emerald-800 text-emerald-200';
  let Icon = CheckCircle2;

  if (isError) {
    bgClass = 'bg-rose-950 border-rose-800 text-rose-200';
    Icon = AlertCircle;
  } else if (isInfo) {
    bgClass = 'bg-slate-900 border-slate-700 text-slate-200';
    Icon = Info;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-slideUp">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md ${bgClass}`}>
        <Icon className="w-5 h-5 shrink-0" />
        <p className="text-sm font-medium pr-2">{toast.message}</p>
        <button
          onClick={() => setToast && setToast(null)}
          className="text-slate-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
