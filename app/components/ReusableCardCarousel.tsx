import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

// Define types for the data
interface Item {
  id: string;
  thumb: string;
  name: string;
  symbol: string;
  data: {
    floor_price?: number;
    price?: number;
  };
}

interface ReusableCardCarouselProps {
  title: string;
  data: Item[]; // Array of items with the structure defined above
  isNft: boolean;
  styles?: React.CSSProperties; // Optional style prop
}

const ReusableCardCarousel: React.FC<ReusableCardCarouselProps> = ({
  title,
  data,
  isNft,
  styles,
}) => {
  return (
    <Carousel style={styles} className='w-full max-w-lg mx-auto'>
      <div className='pt-5 pb-2'>
        <div className='font-semibold'>{title}</div>
      </div>
      <CarouselContent className='-ml-2 md:-ml-4'>
        {data.map((item, index) => (
          <CarouselItem
            className='pl-2 md:pl-4'
            key={isNft ? item.id : item.id}>
            <div className='p-1'>
              <Card className='relative'>
                <span className='ml-5 font-semibold bg-red-500 w-[28px] text-center text-lg rounded-xl'>
                  {index + 1}
                </span>
                <CardContent className='items-center justify-center p-5 '>
                  <div className='flex flex-col gap-10'>
                    <div className='flex items-center w-full gap-5'>
                      <Image
                        className='w-[300] h-[100] rounded-full' // Fixed className issue
                        width={100}
                        height={100}
                        src={isNft ? item.thumb : item.thumb}
                        alt={isNft ? item.name : item.name}
                      />
                      <div className='flex-col flex'>
                        <span className='font-semibold'>
                          {isNft ? item.name : item.name}
                        </span>
                        <span className='text-sm'>
                          {isNft ? item.symbol : item.symbol}
                        </span>
                      </div>

                      <div className='absolute top-[15px] right-[25px]'>
                        <span className='flex flex-col'>
                          <span>{isNft ? 'Floor Price' : 'Price'}</span>
                          {isNft ? item.data.floor_price : item.data.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ReusableCardCarousel;
