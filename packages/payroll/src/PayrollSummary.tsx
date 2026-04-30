import React from 'react';
import { Card, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@hrms/ui';
import { Payroll } from '@hrms/types';
import { DollarSign, Download } from 'lucide-react';

export const PayrollSummary = ({ payrolls }: { payrolls: Payroll[] }) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/30">
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold">Payroll Summary</h2>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead>Basic</TableHead>
            <TableHead>Allowances</TableHead>
            <TableHead>Net Salary</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrolls.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{new Date(p.periodStart).toLocaleDateString()} - {new Date(p.periodEnd).toLocaleDateString()}</TableCell>
              <TableCell>${p.basicSalary}</TableCell>
              <TableCell>${p.allowances}</TableCell>
              <TableCell className="font-bold text-blue-600">${p.netSalary}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  p.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30'
                }`}>
                  {p.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
