import React, { useState } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import StatusBadge from '../components/StatusBadge';
import { formatDateDisplay, getMonthName } from '../utils/dateUtils';
import { exportToCSV } from '../utils/exportCsv';
import {
  History,
  Search,
  Filter,
  Download,
  Calendar,
  Building2,
  User,
  RotateCcw
} from 'lucide-react';

const AttendanceHistory = () => {
  const { employees, records, departments } = useAttendance();

  // Filter States
  const [empFilter, setEmpFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState(''); // e.g. "2026-08"
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Employee Map for fast lookup
  const employeeMap = {};
  employees.forEach((emp) => {
    employeeMap[emp.id] = emp;
  });

  // Filter logic
  const filteredRecords = records.filter((rec) => {
    const emp = employeeMap[rec.employeeId] || { name: 'Unknown', department: 'General' };

    // Employee search (matches name or ID)
    const matchesEmp =
      !empFilter.trim() ||
      emp.name.toLowerCase().includes(empFilter.toLowerCase()) ||
      rec.employeeId.toLowerCase().includes(empFilter.toLowerCase());

    // Date filter
    const matchesDate = !dateFilter || rec.date === dateFilter;

    // Month filter (YYYY-MM)
    const matchesMonth = !monthFilter || rec.date.startsWith(monthFilter);

    // Department filter
    const matchesDept = deptFilter === 'ALL' || emp.department === deptFilter;

    // Status filter
    const matchesStatus = statusFilter === 'ALL' || rec.status === statusFilter;

    return matchesEmp && matchesDate && matchesMonth && matchesDept && matchesStatus;
  });

  // Sort records descending by date
  const sortedRecords = [...filteredRecords].sort((a, b) => b.date.localeCompare(a.date));

  // Reset Filters
  const resetFilters = () => {
    setEmpFilter('');
    setDateFilter('');
    setMonthFilter('');
    setDeptFilter('ALL');
    setStatusFilter('ALL');
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = ['Date', 'Employee Name', 'Employee ID', 'Department', 'Status'];
    const rows = sortedRecords.map((r) => {
      const emp = employeeMap[r.employeeId] || {};
      return [
        formatDateDisplay(r.date),
        emp.name || r.employeeId,
        r.employeeId,
        emp.department || '-',
        r.status
      ];
    });
    exportToCSV('attendance_history', rows, headers);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Attendance History Logs</h1>
          <p className="text-xs text-slate-400 mt-1">
            Filter historical logs by date, month, employee, department, or status ({sortedRecords.length} records matched)
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors shadow-md"
        >
          <Download className="w-4 h-4 text-indigo-400" />
          <span>Export History CSV</span>
        </button>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            Filter Records
          </span>
          <button
            onClick={resetFilters}
            className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Employee Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search Employee..."
              value={empFilter}
              onChange={(e) => setEmpFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Date Picker Filter */}
          <div className="relative">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setMonthFilter(''); // clear month if specific date picked
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Month Picker Filter */}
          <div>
            <input
              type="month"
              value={monthFilter}
              onChange={(e) => {
                setMonthFilter(e.target.value);
                setDateFilter(''); // clear specific date if month picked
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Department Dropdown Filter */}
          <div>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs font-semibold focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-xs font-semibold focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="Present">Present Only</option>
              <option value="Absent">Absent Only</option>
              <option value="Leave">Leave Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {sortedRecords.length === 0 ? (
          <div className="text-center py-12 px-4">
            <History className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200">No History Records Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No logs matched your selected filter criteria. Try adjusting or resetting your search filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Employee ID</th>
                  <th className="px-6 py-4">Employee Name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {sortedRecords.map((rec) => {
                  const emp = employeeMap[rec.employeeId] || { name: 'Unknown', department: '-' };
                  return (
                    <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-200">
                        {formatDateDisplay(rec.date)}
                      </td>
                      <td className="px-6 py-4 font-bold text-indigo-400 font-mono">{rec.employeeId}</td>
                      <td className="px-6 py-4 font-semibold text-slate-100">{emp.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={rec.status} />
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

export default AttendanceHistory;
