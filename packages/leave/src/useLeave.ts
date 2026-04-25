import { useState, useEffect } from 'react';
import { apiClient } from '@hrms/api-client';
import { Leave } from '@hrms/types';

export const useLeave = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/leave')
      .then(res => setLeaves(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { leaves, loading };
};
