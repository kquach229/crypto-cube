import { ModeToggle } from '@/components/ModeToggle';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <nav className='flex justify-between items-center mt-[10px] mb-[10px]'>
      <div>
        <Link className='inline-flex items-center' href={'/'}>
          <Image
            className='h-[50px] w-[50px] rounded-sm hidden sm:block'
            src={'/logo.png'}
            alt='crypto-cube-logo'
            height={50}
            width={50}
          />
          <h1 className='ml-2 font-semibold'>CryptoCube</h1>
        </Link>
      </div>
      <div className='relative flex gap-5 items-center'>
        <Link href={'/platform/market'}>Market</Link>
        <Link href={'/platform/trending'}>Trending</Link>
        <Link href={'/platform/news'}>News</Link>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Header;
