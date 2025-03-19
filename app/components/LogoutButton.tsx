'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/src/lib/actions/auth';
import React from 'react';

const LogoutButton = ({ styles }: { styles?: React.CSSProperties }) => {
  return (
    <Button
      style={styles}
      className='h-10 w-32 md:h-20 md:w-52'
      onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
