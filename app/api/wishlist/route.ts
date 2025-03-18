import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json(
      {
        error: 'unauthorized',
      },
      { status: 401 }
    );

  const { coinId } = await req.json();

  // Ensure the coin exists
  const coin = await prisma.coin.upsert({
    where: { id: coinId },
    update: {},
    create: { id: coinId },
  });

  // Connect the coin to the user's watchlist
  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      watchlistCoins: {
        connect: { id: coin.id },
      },
    },
  });

  return NextResponse.json({ message: 'Coin added to wishlist' });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { coinId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  await prisma.user.update({
    where: { email: user?.email },
    data: {
      watchlistCoins: {
        disconnect: { id: coinId },
      },
    },
  });

  return NextResponse.json({ message: 'Coin removed from wishlist' });
}
