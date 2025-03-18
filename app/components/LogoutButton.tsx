'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/src/lib/actions/auth';
import React from 'react';

const LogoutButton = () => {
  return <Button onClick={logout}>Logout</Button>;
};

export default LogoutButton;
