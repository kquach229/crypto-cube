'use server';

import { prisma } from '@/src/lib/prisma';
import { auth } from '@/auth';
import LogoutButton from '@/app/components/LogoutButton';
import LoginButton from '@/app/components/LoginButton';
import ReusablePaper from '@/app/components/ReusablePaper';
import WishlistSectionWrapper from './WishlistSectionWrapper';
import WishlistSection from './WishlistSection';
import Image from 'next/image';

const DashboardPage = async () => {
  // Fetch session details on the server side
  const session = await auth();

  if (!session?.user) {
    return (
      <div
        className={`h-screen w-screen flex items-center justify-center bg-[url('/wishlist.png')] bg-cover bg-center blur-xs`}></div>
    );
  }

  // Ensure user exists in database
  let user = await prisma.user.findUnique({
    where: { email: session?.user.email },
    include: { watchlistCoins: true },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
      include: { watchlistCoins: true },
    });
  }

  return (
    <div>
      <p className='text-2xl mb-5'>Hello {session.user.name}</p>
      <ReusablePaper>
        <div>
          <h5>Watchlist</h5>
        </div>
      </ReusablePaper>
      <ReusablePaper styles={{ marginTop: 15, minHeight: '70vh' }}>
        <WishlistSection initialWatchlist={user.watchlistCoins} />
      </ReusablePaper>
    </div>
  );
};

export default DashboardPage;
