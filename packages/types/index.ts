export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'hr' | 'employee';
  avatar?: string;
  isActive: boolean;
}

export interface Employee {
  id: string;
  user: User | string;
  employeeId: string;
  department: Department | string;
  position: string;
  hireDate: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  status: 'active' | 'inactive' | 'on-leave' | 'terminated';
  salary: {
    basic: number;
    currency: string;
    paymentFrequency: 'monthly' | 'bi-weekly' | 'weekly';
  };
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  head?: Employee | string;
  isActive: boolean;
}

export interface Attendance {
  id: string;
  employee: Employee | string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  workHours: number;
}

export interface Leave {
  id: string;
  employee: Employee | string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Payroll {
  id: string;
  employee: Employee | string;
  periodStart: string;
  periodEnd: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'pending' | 'paid';
}

export interface Recruitment {
  id: string;
  title: string;
  department: Department | string;
  description: string;
  status: 'open' | 'closed' | 'on-hold';
}

export interface Performance {
  id: string;
  employee: Employee | string;
  reviewDate: string;
  rating: number;
  comments: string;
}
