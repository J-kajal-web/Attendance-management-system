import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  History,
  UserCheck,
  CalendarDays,
  Settings,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { activeTab, setActiveTab, employees } = useAttendance();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users, count: employees.length },
    { id: 'attendance', label: 'Mark Attendance', icon: CheckSquare, highlight: true },
    { id: 'history', label: 'Attendance History', icon: History },
    { id: 'reports', label: 'Employee Summary', icon: UserCheck },
    { id: 'monthly', label: 'Monthly Report', icon: CalendarDays },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900 border-r border-slate-800/80 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Header */}
          <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-800">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-xl text-white shadow-md shadow-indigo-500/20">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-100 leading-tight">AttendEase</h1>
              <p className="text-[11px] font-medium text-slate-400">Attendance Manager</p>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Main Menu
            </div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.count !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-indigo-700 text-indigo-100'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}

                  {item.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Demo Footer Banner */}
          <div className="p-4 border-t border-slate-800/80">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Local Storage Mode
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                100% Offline & Private. All data saved securely in your browser.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
