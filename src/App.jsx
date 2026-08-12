import React, { useState } from 'react';
import { AttendanceProvider, useAttendance } from './context/AttendanceContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';

import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import MarkAttendance from './pages/MarkAttendance';
import AttendanceHistory from './pages/AttendanceHistory';
import EmployeeReport from './pages/EmployeeReport';
import MonthlyReport from './pages/MonthlyReport';
import Settings from './pages/Settings';

const MainContent = () => {
  const { activeTab } = useAttendance();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <Employees />;
      case 'attendance':
        return <MarkAttendance />;
      case 'history':
        return <AttendanceHistory />;
      case 'reports':
        return <EmployeeReport />;
      case 'monthly':
        return <MonthlyReport />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 md:pl-64 flex flex-col min-w-0 transition-all duration-300">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      <Toast />
    </div>
  );
};

function App() {
  return (
    <AttendanceProvider>
      <MainContent />
    </AttendanceProvider>
  );
}

export default App;
