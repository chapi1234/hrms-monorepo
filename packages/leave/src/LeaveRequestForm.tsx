import React from 'react';
import { Button, Input, Modal } from '@hrms/ui';

export const LeaveRequestForm = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Leave">
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Start Date" type="date" />
          <Input label="End Date" type="date" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Leave Type</label>
          <select className="w-full h-11 rounded-xl border border-gray-200 px-4 dark:bg-gray-950 dark:border-gray-800">
            <option>Annual Leave</option>
            <option>Sick Leave</option>
            <option>Maternity/Paternity</option>
            <option>Unpaid Leave</option>
          </select>
        </div>
        <Input label="Reason" placeholder="Brief explanation..." />
        <Button className="w-full">Submit Request</Button>
      </form>
    </Modal>
  );
};
