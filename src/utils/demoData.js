import { getPastNDays } from './dateUtils';

export const INITIAL_DEPARTMENTS = ['IT', 'HR', 'Sales', 'Marketing', 'Finance'];

export const DEMO_EMPLOYEES = [
  {
    id: 'EMP001',
    name: 'Kajal',
    department: 'IT',
    designation: 'Lead Developer',
    joiningDate: '2024-01-15'
  },
  {
    id: 'EMP002',
    name: 'Rahul',
    department: 'HR',
    designation: 'HR Manager',
    joiningDate: '2024-03-01'
  },
  {
    id: 'EMP003',
    name: 'Priya',
    department: 'Sales',
    designation: 'Account Executive',
    joiningDate: '2024-02-10'
  },
  {
    id: 'EMP004',
    name: 'Amit',
    department: 'Marketing',
    designation: 'Content Specialist',
    joiningDate: '2024-04-20'
  },
  {
    id: 'EMP005',
    name: 'Sneha',
    department: 'Finance',
    designation: 'Financial Analyst',
    joiningDate: '2024-05-12'
  }
];

export const generateDemoAttendanceRecords = () => {
  const past30Days = getPastNDays(30);
  const records = [];

  // Deterministic seed pattern so data is clean and predictable
  past30Days.forEach((dateStr, dayIdx) => {
    DEMO_EMPLOYEES.forEach((emp, empIdx) => {
      let status = 'Present';

      // Simulate realistic attendance pattern
      // Weekends (Sunday/Saturday optional, or just general workdays)
      const seed = (dayIdx * 7 + empIdx * 13) % 100;
      if (seed > 85) {
        status = 'Leave';
      } else if (seed > 75) {
        status = 'Absent';
      } else {
        status = 'Present';
      }

      // Today's specific example matching prompt request if possible
      // e.g. Kajal = Present, Rahul = Absent, Priya = Leave, Amit = Present, Sneha = Present
      if (dayIdx === past30Days.length - 1) {
        if (emp.id === 'EMP001') status = 'Present';
        if (emp.id === 'EMP002') status = 'Absent';
        if (emp.id === 'EMP003') status = 'Leave';
        if (emp.id === 'EMP004') status = 'Present';
        if (emp.id === 'EMP005') status = 'Present';
      }

      records.push({
        id: `${dateStr}_${emp.id}`,
        date: dateStr,
        employeeId: emp.id,
        status: status
      });
    });
  });

  return records;
};
