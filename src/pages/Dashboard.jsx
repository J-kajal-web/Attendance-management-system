import React from 'react';
import { useAttendance } from '../context/AttendanceContext';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import StatusBadge from '../components/StatusBadge';
import { formatDateDisplay, getMonthName } from '../utils/dateUtils';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Percent,
  CalendarDays,
  ArrowRight,
  Sparkles,
  Briefcase
} from 'lucide-react';

const Dashboard = () => {
  const {
    employees,
    records,
    selectedDate,
    setSelectedDate,
    setActiveTab,
    departments
  } = useAttendance();

  // Records for selectedDate
  const todayRecords = records.filter((r) => r.date === selectedDate);
  const presentCount = todayRecords.filter((r) => r.status === 'Present').length;
  const absentCount = todayRecords.filter((r) => r.status === 'Absent').length;
  const leaveCount = todayRecords.filter((r) => r.status === 'Leave').length;

  const totalEmployees = employees.length;
  const markedTotal = todayRecords.length;
  
  // Today's attendance % = (Present Today / Total Employees) * 100 or if empty, 0
  const attendancePercentage = totalEmployees > 0 
    ? Math.round((presentCount / totalEmployees) * 100) 
    : 0;

  // Total Working Days (Unique dates in attendance records)
  const uniqueWorkingDates = Array.from(new Set(records.map(r => r.date)));
  const totalWorkingDays = uniqueWorkingDates.length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner Greeting */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/20 p-6 md:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Quick Overview
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Attendance Dashboard
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Showing attendance stats for <strong className="text-indigo-300">{formatDateDisplay(selectedDate)}</strong>.
              Select any date to view historical metrics.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
            <CalendarDays className="w-5 h-5 text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Selected Date</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-slate-100 font-bold text-sm outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Primary Summary Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          subtext="Active Directory"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Present Today"
          value={presentCount}
          subtext={`${markedTotal} Marked`}
          icon={UserCheck}
          color="emerald"
        />
        <StatCard
          title="Absent Today"
          value={absentCount}
          subtext={`${absentCount} Unattended`}
          icon={UserX}
          color="rose"
        />
        <StatCard
          title="Leave Today"
          value={leaveCount}
          subtext="Approved Absences"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Attendance %"
          value={`${attendancePercentage}%`}
          subtext="Present Ratio"
          icon={Percent}
          color="cyan"
        />
        <StatCard
          title="Working Days"
          value={totalWorkingDays}
          subtext="Recorded Days"
          icon={CalendarDays}
          color="blue"
        />
      </div>

      {/* Middle Section: Progress & Quick Action Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Attendance Progress Card */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-100">Today's Attendance Ratio</h3>
              <p className="text-xs text-slate-400">Visual status breakdown for {formatDateDisplay(selectedDate)}</p>
            </div>
            <button
              onClick={() => setActiveTab('attendance')}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>Mark Attendance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-6">
            <ProgressBar percentage={attendancePercentage} height="h-4" />

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="bg-emerald-950/30 border border-emerald-800/40 p-3.5 rounded-xl text-center">
                <span className="text-2xl font-extrabold text-emerald-400">{presentCount}</span>
                <p className="text-xs font-medium text-emerald-300/80 mt-0.5">Present</p>
              </div>
              <div className="bg-rose-950/30 border border-rose-800/40 p-3.5 rounded-xl text-center">
                <span className="text-2xl font-extrabold text-rose-400">{absentCount}</span>
                <p className="text-xs font-medium text-rose-300/80 mt-0.5">Absent</p>
              </div>
              <div className="bg-amber-950/30 border border-amber-800/40 p-3.5 rounded-xl text-center">
                <span className="text-2xl font-extrabold text-amber-400">{leaveCount}</span>
                <p className="text-xs font-medium text-amber-300/80 mt-0.5">Leave</p>
              </div>
            </div>
          </div>
        </div>

        {/* Departments Summary Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-slate-100">Departments Overview</h3>
            </div>

            <div className="space-y-3">
              {departments.map((dept) => {
                const deptEmps = employees.filter((e) => e.department === dept);
                const count = deptEmps.length;
                return (
                  <div
                    key={dept}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/50 border border-slate-800 text-xs font-medium"
                  >
                    <span className="text-slate-300 font-semibold">{dept}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-bold">
                      {count} {count === 1 ? 'Emp' : 'Emps'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('employees')}
            className="w-full mt-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700 text-center"
          >
            Manage Employees
          </button>
        </div>
      </div>

      {/* Bottom Section: Recent Daily Attendance Live Preview Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100">Attendance Preview ({formatDateDisplay(selectedDate)})</h3>
            <p className="text-xs text-slate-400">Current recorded statuses for today's roster</p>
          </div>
          <button
            onClick={() => setActiveTab('attendance')}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-colors"
          >
            Edit Attendance Table
          </button>
        </div>

        {employees.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            No employees found. Please add employees or load demo data.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Employee ID</th>
                  <th className="px-4 py-3">Employee Name</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Designation</th>
                  <th className="px-4 py-3 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {employees.map((emp) => {
                  const rec = todayRecords.find((r) => r.employeeId === emp.id);
                  return (
                    <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-bold text-indigo-400">{emp.id}</td>
                      <td className="px-4 py-3 font-semibold text-slate-100">{emp.name}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400">{emp.designation || '-'}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={rec ? rec.status : null} />
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

export default Dashboard;
