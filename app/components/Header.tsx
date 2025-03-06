import { ModeToggle } from '@/components/ModeToggle';
import { Search } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <nav className='flex justify-between items-center p-2'>
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
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-primary' />
        <input
          type='search'
          placeholder='Search for a coin'
          className='pl-8 border-none shadow-none w-[300px]'
        />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Header;
