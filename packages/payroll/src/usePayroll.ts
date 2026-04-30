import { useState, useEffect } from 'react';
import { apiClient } from '@hrms/api-client';
import { Payroll } from '@hrms/types';

export const usePayroll = () => {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/payroll')
      .then(res => setPayrolls(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { payrolls, loading };
};
