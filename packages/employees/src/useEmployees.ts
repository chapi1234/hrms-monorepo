import { useState, useEffect } from 'react';
import { apiClient } from '@hrms/api-client';
import { Employee } from '@hrms/types';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/employees');
      setEmployees(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      fetchEmployees();
    } else {
      setLoading(false);
    }
  }, []);

  return { employees, loading, error, refresh: fetchEmployees };
};
