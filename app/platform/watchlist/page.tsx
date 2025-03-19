'use server';

import { prisma } from '@/src/lib/prisma';
import { auth } from '@/auth';
import LoginButton from '@/app/components/LoginButton';
import ReusablePaper from '@/app/components/ReusablePaper';
import WishlistSection from './WishlistSection';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const DashboardPage = async () => {
  // Fetch session details on the server side
  const session = await auth();

  if (!session?.user) {
    return (
      <div className='relative h-screen w-screen flex items-center justify-center'>
        {/* Background with Blur */}
        <div className="absolute blur-xs inset-0 bg-[url('/wishlist.png')] bg-cover bg-center bg-no-repeat backdrop-blur-sm"></div>

        {/* Content without Blur */}

        <Card className='flex flex-col justify-around z-10 border-muted-foreground border-1 drop-shadow-lg h-[20rem] rounded-lg w-xs md:w-md max-w-shadow-l'>
          <CardHeader className='text-center text-3xl font-semibold'>
            Login or Register
          </CardHeader>
          <CardContent className='text-center'>
            <div>
              Create an account to access our watchlist functionality. Why not,
              it is FREE!
            </div>
            <div className='mt-10'>
              <LoginButton styles={{ height: '55px' }} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Ensure user exists in database
  let user = await prisma.user.findUnique({
    where: { email: session?.user.email || '' },
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
