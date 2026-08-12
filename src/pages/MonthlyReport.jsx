import React, { useState } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';
import { getMonthName, getTodayString } from '../utils/dateUtils';
import { exportToCSV } from '../utils/exportCsv';
import { CalendarDays, Download, Building2, Users } from 'lucide-react';

const MonthlyReport = () => {
  const { employees, records } = useAttendance();

  // Current month string format: "YYYY-MM"
  const todayMonth = getTodayString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(todayMonth);

  // Filter records for selected month
  const monthRecords = records.filter((r) => r.date.startsWith(selectedMonth));

  // Compute stats per employee
  const monthlyData = employees.map((emp) => {
    const empMonthRecs = monthRecords.filter((r) => r.employeeId === emp.id);
    const totalRecordedDays = empMonthRecs.length;
    const presentCount = empMonthRecs.filter((r) => r.status === 'Present').length;
    const absentCount = empMonthRecs.filter((r) => r.status === 'Absent').length;
    const leaveCount = empMonthRecs.filter((r) => r.status === 'Leave').length;

    const percentage = totalRecordedDays > 0 ? Math.round((presentCount / totalRecordedDays) * 100) : 0;

    return {
      emp,
      totalRecordedDays,
      presentCount,
      absentCount,
      leaveCount,
      percentage
    };
  });

  // Export Monthly Report CSV
  const handleExportCSV = () => {
    const headers = [
      'Employee ID',
      'Employee Name',
      'Department',
      'Present Days',
      'Absent Days',
      'Leave Days',
      'Total Recorded Days',
      'Attendance Percentage'
    ];

    const rows = monthlyData.map((d) => [
      d.emp.id,
      d.emp.name,
      d.emp.department,
      d.presentCount,
      d.absentCount,
      d.leaveCount,
      d.totalRecordedDays,
      `${d.percentage}%`
    ]);

    exportToCSV(`monthly_report_${selectedMonth}`, rows, headers);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Monthly Attendance Report</h1>
          <p className="text-xs text-slate-400 mt-1">
            Aggregated attendance performance report for <strong className="text-indigo-300">{getMonthName(selectedMonth)}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Month Selector */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
            <CalendarDays className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-300">Month:</span>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-slate-100 text-xs font-bold outline-none cursor-pointer"
            />
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors shadow-md"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Monthly Aggregate Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {employees.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-200">No Employees Found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Add employees or load demo data to view monthly reports.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4 text-center">Present</th>
                  <th className="px-6 py-4 text-center">Absent</th>
                  <th className="px-6 py-4 text-center">Leave</th>
                  <th className="px-6 py-4 text-center">Total Recorded</th>
                  <th className="px-6 py-4 w-48">Attendance %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {monthlyData.map((d) => (
                  <tr key={d.emp.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-semibold text-slate-100 text-sm block">{d.emp.name}</span>
                        <span className="font-mono text-[11px] text-indigo-400 font-bold">{d.emp.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                        {d.emp.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {d.presentCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                        {d.absentCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                        {d.leaveCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-300">
                      {d.totalRecordedDays} Days
                    </td>
                    <td className="px-6 py-4">
                      <ProgressBar percentage={d.percentage} height="h-3" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyReport;
