import React from 'react';
import { Card } from '@hrms/ui';
import { Department } from '@hrms/types';
import { Users, Briefcase } from 'lucide-react';

export const DepartmentList = ({ departments }: { departments: Department[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((dept) => (
        <Card key={dept.id} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/30">
              <Briefcase className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-xs font-bold text-gray-400">{dept.code}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold">{dept.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{dept.description}</p>
          </div>
          <div className="mt-auto flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{(dept as any).headcount || 0} Employees</span>
          </div>
        </Card>
      ))}
    </div>
  );
};
