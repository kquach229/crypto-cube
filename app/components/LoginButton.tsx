'use client';

import { Button } from '@/components/ui/button';
import { login } from '@/src/lib/actions/auth';
import React from 'react';

const LoginButton = () => {
  return <Button onClick={login}>Login</Button>;
};

export default LoginButton;
