import { DEMO_EMPLOYEES, generateDemoAttendanceRecords, INITIAL_DEPARTMENTS } from './demoData';

const KEYS = {
  EMPLOYEES: 'attendance_system_employees',
  RECORDS: 'attendance_system_records',
  DEPARTMENTS: 'attendance_system_departments'
};

export const getStoredEmployees = () => {
  try {
    const data = localStorage.getItem(KEYS.EMPLOYEES);
    if (!data) return null;
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse employees from LocalStorage:', err);
    return null;
  }
};

export const saveStoredEmployees = (employees) => {
  try {
    localStorage.setItem(KEYS.EMPLOYEES, JSON.stringify(employees));
  } catch (err) {
    console.error('Failed to save employees to LocalStorage:', err);
  }
};

export const getStoredRecords = () => {
  try {
    const data = localStorage.getItem(KEYS.RECORDS);
    if (!data) return null;
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse attendance records from LocalStorage:', err);
    return null;
  }
};

export const saveStoredRecords = (records) => {
  try {
    localStorage.setItem(KEYS.RECORDS, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save attendance records to LocalStorage:', err);
  }
};

export const getStoredDepartments = () => {
  try {
    const data = localStorage.getItem(KEYS.DEPARTMENTS);
    if (!data) return INITIAL_DEPARTMENTS;
    return JSON.parse(data);
  } catch (err) {
    return INITIAL_DEPARTMENTS;
  }
};

export const saveStoredDepartments = (departments) => {
  try {
    localStorage.setItem(KEYS.DEPARTMENTS, JSON.stringify(departments));
  } catch (err) {
    console.error('Failed to save departments to LocalStorage:', err);
  }
};

export const initializeOrLoadData = () => {
  let employees = getStoredEmployees();
  let records = getStoredRecords();
  let departments = getStoredDepartments();

  // If completely empty first-time user, load demo data so app works immediately
  if (!employees || employees.length === 0) {
    employees = DEMO_EMPLOYEES;
    records = generateDemoAttendanceRecords();
    departments = INITIAL_DEPARTMENTS;
    saveStoredEmployees(employees);
    saveStoredRecords(records);
    saveStoredDepartments(departments);
  }

  return { employees, records, departments };
};

export const resetToDemoData = () => {
  const employees = DEMO_EMPLOYEES;
  const records = generateDemoAttendanceRecords();
  const departments = INITIAL_DEPARTMENTS;
  saveStoredEmployees(employees);
  saveStoredRecords(records);
  saveStoredDepartments(departments);
  return { employees, records, departments };
};

export const clearAllDataFromStorage = () => {
  localStorage.removeItem(KEYS.EMPLOYEES);
  localStorage.removeItem(KEYS.RECORDS);
  localStorage.removeItem(KEYS.DEPARTMENTS);
};
