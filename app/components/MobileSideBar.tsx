'use client';
import { ModeToggle } from '@/components/ModeToggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

export default function MobileSideBar() {
  const { toggleSidebar } = useSidebar();
  const { data: userSession } = useSession();
  return (
    <Sidebar>
      <SidebarHeader className='p-3'>
        <div className='flex w-full flex-row justify-between items-center'>
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
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent className='p-3'>
        <SidebarGroup className='mt-5'>
          <div className='relative flex flex-col gap-5'>
            <Link onClick={toggleSidebar} href={'/platform/market'}>
              Market
            </Link>
            <Link onClick={toggleSidebar} href={'/platform/nfts'}>
              Nfts
            </Link>
            <Link onClick={toggleSidebar} href={'/platform/trending'}>
              Trending
            </Link>
            <Link onClick={toggleSidebar} href={'/platform/news'}>
              News
            </Link>
            <Link onClick={toggleSidebar} href={'/platform/watchlist'}>
              Watchlist
            </Link>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          {' '}
          {userSession?.user ? <LogoutButton /> : <LoginButton />}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
