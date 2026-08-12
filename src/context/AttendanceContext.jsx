import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initializeOrLoadData,
  saveStoredEmployees,
  saveStoredRecords,
  saveStoredDepartments,
  resetToDemoData,
  clearAllDataFromStorage
} from '../utils/storage';
import { getTodayString } from '../utils/dateUtils';

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [toast, setToast] = useState(null);

  // Initialize data on mount
  useEffect(() => {
    const { employees: initEmp, records: initRec, departments: initDept } = initializeOrLoadData();
    setEmployees(initEmp);
    setRecords(initRec);
    setDepartments(initDept);
    if (initEmp && initEmp.length > 0) {
      setSelectedEmployeeId(initEmp[0].id);
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Add Employee
  const addEmployee = (empData) => {
    const trimmedId = empData.id.trim().toUpperCase();
    const trimmedName = empData.name.trim();

    if (!trimmedId || !trimmedName) {
      showToast('Employee ID and Name are required!', 'error');
      return false;
    }

    // Check duplicate ID
    const exists = employees.some(e => e.id.toLowerCase() === trimmedId.toLowerCase());
    if (exists) {
      showToast(`Employee ID "${trimmedId}" already exists! Please use a unique ID.`, 'error');
      return false;
    }

    const newEmp = {
      ...empData,
      id: trimmedId,
      name: trimmedName,
      department: empData.department || 'General',
      designation: empData.designation || 'Staff',
      joiningDate: empData.joiningDate || getTodayString()
    };

    const updated = [...employees, newEmp];
    setEmployees(updated);
    saveStoredEmployees(updated);

    // Auto add department if new
    if (empData.department && !departments.includes(empData.department)) {
      const updatedDepts = [...departments, empData.department];
      setDepartments(updatedDepts);
      saveStoredDepartments(updatedDepts);
    }

    showToast(`Employee ${newEmp.name} (${newEmp.id}) added successfully!`, 'success');
    return true;
  };

  // Edit Employee
  const updateEmployee = (empData) => {
    const updated = employees.map(emp => emp.id === empData.id ? empData : emp);
    setEmployees(updated);
    saveStoredEmployees(updated);
    showToast(`Employee ${empData.name} updated successfully!`, 'success');
    return true;
  };

  // Delete Employee
  const deleteEmployee = (empId) => {
    const empToDelete = employees.find(e => e.id === empId);
    const updatedEmps = employees.filter(emp => emp.id !== empId);
    const updatedRecs = records.filter(rec => rec.employeeId !== empId);

    setEmployees(updatedEmps);
    setRecords(updatedRecs);
    saveStoredEmployees(updatedEmps);
    saveStoredRecords(updatedRecs);

    if (selectedEmployeeId === empId) {
      setSelectedEmployeeId(updatedEmps.length > 0 ? updatedEmps[0].id : null);
    }

    showToast(`Employee ${empToDelete ? empToDelete.name : empId} deleted.`, 'info');
  };

  // Mark single attendance record
  const markAttendance = (dateStr, employeeId, status) => {
    const recordId = `${dateStr}_${employeeId}`;
    const existingIndex = records.findIndex(r => r.id === recordId || (r.date === dateStr && r.employeeId === employeeId));

    let updatedRecords = [...records];
    if (existingIndex >= 0) {
      updatedRecords[existingIndex] = {
        ...updatedRecords[existingIndex],
        status: status
      };
    } else {
      updatedRecords.push({
        id: recordId,
        date: dateStr,
        employeeId: employeeId,
        status: status
      });
    }

    setRecords(updatedRecords);
    saveStoredRecords(updatedRecords);
  };

  // Bulk mark all present for a date
  const markAllPresent = (dateStr) => {
    let updatedRecords = [...records];
    employees.forEach(emp => {
      const recordId = `${dateStr}_${emp.id}`;
      const existingIndex = updatedRecords.findIndex(r => r.id === recordId || (r.date === dateStr && r.employeeId === emp.id));
      if (existingIndex >= 0) {
        updatedRecords[existingIndex] = {
          ...updatedRecords[existingIndex],
          status: 'Present'
        };
      } else {
        updatedRecords.push({
          id: recordId,
          date: dateStr,
          employeeId: emp.id,
          status: 'Present'
        });
      }
    });

    setRecords(updatedRecords);
    saveStoredRecords(updatedRecords);
    showToast(`All employees marked Present for ${dateStr}!`, 'success');
  };

  // Clear attendance for a specific date
  const clearDateAttendance = (dateStr) => {
    const updatedRecords = records.filter(r => r.date !== dateStr);
    setRecords(updatedRecords);
    saveStoredRecords(updatedRecords);
    showToast(`Cleared attendance records for ${dateStr}.`, 'info');
  };

  // Reset to Demo Data
  const handleLoadDemoData = () => {
    const { employees: demoE, records: demoR, departments: demoD } = resetToDemoData();
    setEmployees(demoE);
    setRecords(demoR);
    setDepartments(demoD);
    if (demoE.length > 0) setSelectedEmployeeId(demoE[0].id);
    showToast('Loaded demo data (5 employees & 30-day attendance history)!', 'success');
  };

  // Clear All Data
  const handleClearAllData = () => {
    clearAllDataFromStorage();
    setEmployees([]);
    setRecords([]);
    setSelectedEmployeeId(null);
    showToast('All employee and attendance data cleared.', 'info');
  };

  return (
    <AttendanceContext.Provider
      value={{
        employees,
        records,
        departments,
        activeTab,
        setActiveTab,
        selectedEmployeeId,
        setSelectedEmployeeId,
        selectedDate,
        setSelectedDate,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        markAttendance,
        markAllPresent,
        clearDateAttendance,
        loadDemoData: handleLoadDemoData,
        clearAllData: handleClearAllData,
        toast,
        showToast
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => useContext(AttendanceContext);
