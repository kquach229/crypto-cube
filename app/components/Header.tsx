import { ModeToggle } from '@/components/ModeToggle';
import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <nav className='flex justify-between items-center mt-[10px] mb-[10px]'>
      <div className='inline-flex items-center'>
        <Image
          className='h-[50px] w-[50px] rounded-sm'
          src={'/logo.png'}
          alt='crypto-cube-logo'
          height={50}
          width={50}
        />
        <h1 className='ml-2 font-bold'>CryptoCube</h1>
      </div>
      <div className='relative flex gap-5 items-center'>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Header;
