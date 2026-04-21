import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Button } from '@hrms/ui';
import { Employee } from '@hrms/types';
import { User, MoreVertical, Edit2, Trash2 } from 'lucide-react';

interface EmployeeTableProps {
  employees: Employee[];
  loading?: boolean;
}

export const EmployeeTable = ({ employees, loading }: EmployeeTableProps) => {
  if (loading) return <div className="p-8 text-center">Loading employees...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((emp) => (
          <TableRow key={emp.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">{(emp.user as any)?.firstName} {(emp.user as any)?.lastName}</div>
                  <div className="text-xs text-gray-500">{(emp.user as any)?.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{emp.employeeId}</TableCell>
            <TableCell>{(emp.department as any)?.name}</TableCell>
            <TableCell>{emp.position}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                emp.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-gray-100 text-gray-700 dark:bg-gray-800'
              }`}>
                {emp.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon"><Edit2 className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
