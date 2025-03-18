'use client';

import { Button } from '@/components/ui/button';
import { login } from '@/src/lib/actions/auth';
import React from 'react';

const LoginButton = ({ styles }: { styles?: React.CSSProperties }) => {
  return (
    <Button
      style={styles}
      className='h-10 w-32 md:h-20 md:w-52'
      onClick={login}>
      Get Started
    </Button>
  );
};

export default LoginButton;
