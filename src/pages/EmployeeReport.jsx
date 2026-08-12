import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import StatusBadge from '../components/StatusBadge';
import { formatDateDisplay } from '../utils/dateUtils';
import {
  UserCheck,
  Building2,
  Calendar,
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock,
  Percent,
  History,
  User
} from 'lucide-react';

const EmployeeReport = () => {
  const { employees, records, selectedEmployeeId, setSelectedEmployeeId } = useAttendance();

  const selectedEmp = employees.find((e) => e.id === selectedEmployeeId) || employees[0];

  if (!selectedEmp) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center space-y-3">
        <User className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-base font-bold text-slate-200">No Employee Selected</h3>
        <p className="text-xs text-slate-400">Please add employees or load demo data first.</p>
      </div>
    );
  }

  // Calculate metrics for selected employee
  const empRecords = records.filter((r) => r.employeeId === selectedEmp.id);
  const totalDays = empRecords.length;
  const presentDays = empRecords.filter((r) => r.status === 'Present').length;
  const absentDays = empRecords.filter((r) => r.status === 'Absent').length;
  const leaveDays = empRecords.filter((r) => r.status === 'Leave').length;

  const attendancePercent = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  // Sort employee history descending by date
  const sortedEmpHistory = [...empRecords].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Bar: Selector & Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            Individual Employee Analytics
          </span>
          <h1 className="text-xl font-bold text-slate-100 mt-1">Employee Summary Report</h1>
          <p className="text-xs text-slate-400">
            Individual attendance performance and historical log breakdown
          </p>
        </div>

        {/* Employee Dropdown Selector */}
        <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
          <User className="w-5 h-5 text-indigo-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-slate-400">Select Employee</span>
            <select
              value={selectedEmp.id}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              className="bg-transparent text-slate-100 font-bold text-sm outline-none cursor-pointer"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id} className="bg-slate-900 text-slate-100">
                  {emp.name} ({emp.id}) - {emp.department}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employee Profile Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-600/30">
              {selectedEmp.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">{selectedEmp.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  {selectedEmp.id}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  {selectedEmp.designation || 'Staff'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  {selectedEmp.department}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl text-xs space-y-1">
            <div className="flex justify-between gap-6 text-slate-400">
              <span>Joining Date:</span>
              <strong className="text-slate-200 font-mono">
                {formatDateDisplay(selectedEmp.joiningDate)}
              </strong>
            </div>
            <div className="flex justify-between gap-6 text-slate-400">
              <span>Total Recorded Days:</span>
              <strong className="text-slate-200">{totalDays} Days</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Days"
          value={totalDays}
          subtext="Working Days Logged"
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Present Days"
          value={presentDays}
          subtext={`${presentDays} Days Attended`}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Absent Days"
          value={absentDays}
          subtext={`${absentDays} Days Unattended`}
          icon={XCircle}
          color="rose"
        />
        <StatCard
          title="Leave Days"
          value={leaveDays}
          subtext={`${leaveDays} Approved Leaves`}
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Attendance %"
          value={`${attendancePercent}%`}
          subtext="Overall Score"
          icon={Percent}
          color="cyan"
        />
      </div>

      {/* Attendance Percentage Progress Bar Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100">Overall Attendance Score</h3>
            <p className="text-xs text-slate-400">Ratio calculated over {totalDays} recorded working days</p>
          </div>
          <span className="text-2xl font-black text-emerald-400">{attendancePercent}%</span>
        </div>

        <ProgressBar percentage={attendancePercent} height="h-4" />
      </div>

      {/* Individual History Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-400" />
          <span>Attendance History Log for {selectedEmp.name}</span>
        </h3>

        {sortedEmpHistory.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">
            No attendance records found for this employee yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {sortedEmpHistory.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-3 font-mono font-bold text-slate-200">
                      {formatDateDisplay(rec.date)}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={rec.status} />
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

export default EmployeeReport;
