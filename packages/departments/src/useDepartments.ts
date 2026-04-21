import { useState, useEffect } from 'react';
import { apiClient } from '@hrms/api-client';
import { Department } from '@hrms/types';

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      apiClient.get('/departments')
        .then(res => setDepartments(res.data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return { departments, loading };
};
