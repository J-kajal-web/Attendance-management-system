import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { Menu, Calendar, Sparkles, CheckSquare, Users } from 'lucide-react';
import { formatDateDisplay } from '../utils/dateUtils';

const Header = ({ onToggleSidebar }) => {
  const { selectedDate, setSelectedDate, loadDemoData, setActiveTab, employees } = useAttendance();

  const getPageTitle = (tab) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'employees': return 'Employee Directory';
      case 'attendance': return 'Daily Attendance Marking';
      case 'history': return 'Attendance History Logs';
      case 'reports': return 'Individual Employee Summary';
      case 'monthly': return 'Monthly Attendance Report';
      case 'settings': return 'System Settings & Data';
      default: return 'Attendance Management System';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 md:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-100 hidden sm:block">
            Employee Attendance Management System
          </h2>
          <p className="text-xs text-slate-400 font-medium">Personal & Small Office Use</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Date Selector Header Shortcut */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200">
          <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-slate-100 outline-none cursor-pointer text-xs"
          />
        </div>

        {/* Quick Demo Button */}
        <button
          onClick={loadDemoData}
          title="Load 5 Sample Employees & 30 days history"
          className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Load Demo Data</span>
        </button>

        {/* Mark Attendance Shortcut CTA */}
        <button
          onClick={() => setActiveTab('attendance')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-colors"
        >
          <CheckSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Mark Today</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
