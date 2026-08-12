import React, { useState } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import ConfirmModal from '../components/ConfirmModal';
import { exportToCSV } from '../utils/exportCsv';
import {
  Settings as SettingsIcon,
  Sparkles,
  Trash2,
  Download,
  HardDrive,
  CheckCircle2,
  Database,
  Building2,
  Users
} from 'lucide-react';

const Settings = () => {
  const { employees, records, departments, loadDemoData, clearAllData } = useAttendance();

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const handleExportAllBackup = () => {
    const headers = ['Record Type', 'Data JSON'];
    const rows = [
      ['Employees', JSON.stringify(employees)],
      ['Records', JSON.stringify(records)],
      ['Departments', JSON.stringify(departments)]
    ];
    exportToCSV('attendance_system_full_backup', rows, headers);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-indigo-400" />
          <span>System Settings & Data Management</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage sample data, exports, local storage state, and system defaults.
        </p>
      </div>

      {/* Demo Data Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-100">Load Sample / Demo Data</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Populate the system with 5 sample employees (IT, HR, Sales, Marketing, Finance) and 30 days of realistic attendance history to immediately evaluate dashboards, filtering, individual summaries, and monthly reports.
            </p>

            <button
              onClick={loadDemoData}
              className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Load 5 Demo Employees & 30-Day Records</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Backup & Export Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-100">Full System Data Backup</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Download a complete JSON CSV backup of all current employee profiles, departments, and historical attendance logs.
            </p>

            <button
              onClick={handleExportAllBackup}
              className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors shadow-md"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Download System Backup CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clear Data Section */}
      <div className="bg-slate-900 border border-rose-900/40 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0">
            <Trash2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-rose-300">Clear All LocalStorage Data</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Reset the application state and erase all employee profiles and attendance history saved in your browser.
            </p>

            <button
              onClick={() => setIsClearModalOpen(true)}
              className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-semibold text-xs transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Erase All Saved Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* LocalStorage Status Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-indigo-400" />
          <span>Browser Storage Storage Metrics</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold pt-2">
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase">Stored Employees</span>
            <span className="text-slate-100 text-base font-bold">{employees.length} Records</span>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase">Attendance Logs</span>
            <span className="text-slate-100 text-base font-bold">{records.length} Logs</span>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase">Departments</span>
            <span className="text-slate-100 text-base font-bold">{departments.length} Depts</span>
          </div>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      <ConfirmModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={clearAllData}
        title="Clear All Local Storage Data"
        message="Are you sure you want to delete all employee records, departments, and attendance history? This operation cannot be undone."
      />
    </div>
  );
};

export default Settings;
