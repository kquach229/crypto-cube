import { ModeToggle } from '@/components/ModeToggle';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { auth } from '@/auth';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { AvatarFallback } from '@/components/ui/avatar';
import LoginButton from './LoginButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import LogoutButton from './LogoutButton';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';

const Header = async () => {
  const session = await auth();
  return (
    <nav className='flex justify-between items-center mt-[10px] mb-[10px]'>
      <div>
        <Link className='inline-flex items-center' href={'/'}>
          <Image
            className='h-[50px] w-[50px] rounded-sm'
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
        <Link href={'/platform/nfts'}>Nfts</Link>
        <Link href={'/platform/trending'}>Trending</Link>
        <Link href={'/platform/news'}>News</Link>
        <Link href={'/platform/watchlist'}>Watchlist</Link>
        <ModeToggle />

        {session?.user ? (
          <Popover>
            <PopoverTrigger className='h-10 w-10'>
              <Avatar className='cursor-pointer'>
                <AvatarImage
                  className='rounded-full'
                  src={session.user.image || ''}
                />
                <AvatarFallback>
                  {session.user.name?.split(' ')[0][0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <DropdownMenu>
                <LogoutButton />
              </DropdownMenu>
            </PopoverContent>
          </Popover>
        ) : (
          <LoginButton styles={{ height: '40px', width: '100px' }} />
        )}
      </div>
    </nav>
  );
};

export default Header;
