import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import StatusBadge from '../components/StatusBadge';
import { formatDateDisplay, getTodayString } from '../utils/dateUtils';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Sparkles,
  RotateCcw,
  CheckCheck,
  Building2
} from 'lucide-react';

const MarkAttendance = () => {
  const {
    employees,
    records,
    selectedDate,
    setSelectedDate,
    markAttendance,
    markAllPresent,
    clearDateAttendance
  } = useAttendance();

  // Current date's records map for fast lookup
  const todayRecordsMap = {};
  records
    .filter((r) => r.date === selectedDate)
    .forEach((r) => {
      todayRecordsMap[r.employeeId] = r.status;
    });

  const markedCount = Object.keys(todayRecordsMap).length;
  const presentCount = Object.values(todayRecordsMap).filter((s) => s === 'Present').length;
  const absentCount = Object.values(todayRecordsMap).filter((s) => s === 'Absent').length;
  const leaveCount = Object.values(todayRecordsMap).filter((s) => s === 'Leave').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Date Selector Toolbar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Daily Attendance Sheet
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-100">Mark Attendance</h1>
          <p className="text-xs text-slate-400 mt-1">
            Select a date and click status buttons for each employee. Changes save instantly to browser LocalStorage.
          </p>
        </div>

        {/* Date Selector Box */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-slate-400">Select Date</span>
              <span className="text-sm font-extrabold text-white font-mono">
                {formatDateDisplay(selectedDate)}
              </span>
            </div>
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-100 text-xs font-semibold px-2.5 py-1.5 rounded-lg outline-none cursor-pointer focus:border-indigo-500"
          />

          <button
            onClick={() => setSelectedDate(getTodayString())}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      {/* Counter Summary Strip & Bulk Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span>Roster:</span>
            <span className="text-white font-bold">{employees.length}</span>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Present: {presentCount}</span>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5 text-rose-400">
            <XCircle className="w-4 h-4" />
            <span>Absent: {absentCount}</span>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5 text-amber-400">
            <Clock className="w-4 h-4" />
            <span>Leave: {leaveCount}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => markAllPresent(selectedDate)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All Present</span>
          </button>
          <button
            onClick={() => clearDateAttendance(selectedDate)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Clear Date</span>
          </button>
        </div>
      </div>

      {/* Main Attendance Marking Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {employees.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200">No Employees Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Please add employees in the Employee Management section or load demo data first.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Employee ID</th>
                  <th className="px-6 py-4">Employee Name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Current Status</th>
                  <th className="px-6 py-4 text-center">Action / Status Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {employees.map((emp) => {
                  const currentStatus = todayRecordsMap[emp.id];
                  const isPresent = currentStatus === 'Present';
                  const isAbsent = currentStatus === 'Absent';
                  const isLeave = currentStatus === 'Leave';

                  return (
                    <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-indigo-400 font-mono text-sm">
                        {emp.id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-100 text-sm">
                        {emp.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={currentStatus} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* Present Button */}
                          <button
                            onClick={() => markAttendance(selectedDate, emp.id, 'Present')}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-all duration-150 ${
                              isPresent
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                                : 'bg-slate-800/80 hover:bg-emerald-950/40 text-emerald-400 border border-slate-700 hover:border-emerald-500/40'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Present</span>
                          </button>

                          {/* Absent Button */}
                          <button
                            onClick={() => markAttendance(selectedDate, emp.id, 'Absent')}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-all duration-150 ${
                              isAbsent
                                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-105'
                                : 'bg-slate-800/80 hover:bg-rose-950/40 text-rose-400 border border-slate-700 hover:border-rose-500/40'
                            }`}
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Absent</span>
                          </button>

                          {/* Leave Button */}
                          <button
                            onClick={() => markAttendance(selectedDate, emp.id, 'Leave')}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-all duration-150 ${
                              isLeave
                                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 scale-105'
                                : 'bg-slate-800/80 hover:bg-amber-950/40 text-amber-400 border border-slate-700 hover:border-amber-500/40'
                            }`}
                          >
                            <Clock className="w-4 h-4" />
                            <span>Leave</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkAttendance;
