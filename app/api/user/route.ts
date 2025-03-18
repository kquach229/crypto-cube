'use server';
import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { auth } from '@/auth';

export const GET = async () => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { watchlistCoins: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
};

export async function POST(request: Request) {
  const session = await auth();

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: session?.user?.email || '' },
    });

    // If session doesn't exist, return an error response
    if (!session?.user) {
      return NextResponse.json(
        { error: 'User not signed in' },
        { status: 401 } // Unauthorized
      );
    }

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        },
      });
      return NextResponse.json({ data: 'User created!', user: newUser });
    }

    return NextResponse.json({ data: 'User already exists!' });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to create user',
      },
      { status: 500 }
    );
  }
}
