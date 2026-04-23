import React, { useState } from 'react';
import { Card, Button } from '@hrms/ui';
import { Clock, CheckCircle2, LogOut } from 'lucide-react';

export const AttendanceWidget = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleCheckAction = () => {
    setIsCheckedIn(!isCheckedIn);
    setLastAction(new Date().toLocaleTimeString());
  };

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900/30">
          <Clock className="h-5 w-5 text-orange-600" />
        </div>
        <h3 className="font-bold">Attendance</h3>
      </div>
      
      <div className="text-center py-4">
        <div className="text-3xl font-bold mb-1">08:45 AM</div>
        <p className="text-sm text-gray-500">Current Time</p>
      </div>

      <Button 
        variant={isCheckedIn ? 'outline' : 'primary'} 
        className="w-full gap-2"
        onClick={handleCheckAction}
      >
        {isCheckedIn ? (
          <>
            <LogOut className="h-4 w-4" />
            Check Out
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4" />
            Check In
          </>
        )}
      </Button>

      {lastAction && (
        <p className="text-xs text-center text-gray-500">
          Last action: {lastAction}
        </p>
      )}
    </Card>
  );
};
