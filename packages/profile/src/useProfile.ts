import { useState, useEffect } from 'react';
import { apiClient } from '@hrms/api-client';
import { User } from '@hrms/types';

export const useProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/profile')
      .then(res => setProfile(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading };
};
