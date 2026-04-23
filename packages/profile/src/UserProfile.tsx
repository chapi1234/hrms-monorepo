import React from 'react';
import { Card, Button, Input } from '@hrms/ui';
import { User, Mail, Phone, MapPin } from 'lucide-react';

export const UserProfile = ({ user }: { user: any }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 flex flex-col items-center text-center">
        <div className="h-32 w-32 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
          <User className="h-16 w-16 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
        <p className="text-slate-500 mb-6 capitalize">{user.role}</p>
        <Button variant="outline" className="w-full">Change Avatar</Button>
      </Card>
      
      <Card className="lg:col-span-2 space-y-6">
        <h3 className="text-xl font-bold">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="First Name" defaultValue={user.firstName} />
          <Input label="Last Name" defaultValue={user.lastName} />
          <Input label="Email" defaultValue={user.email} disabled />
          <Input label="Phone" placeholder="+1 (555) 000-0000" />
        </div>
        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
};
