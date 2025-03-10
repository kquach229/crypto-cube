'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ReusablePaper from '@/app/components/ReusablePaper';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';
import { ellipse } from '@/src/lib/utils';
import Link from 'next/link';

const fetchNews = async () => {
  const response = await fetch(
    'https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=50'
  );

  const data = await response.json();

  return data;
};

const NewsPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchnews'],
    queryFn: fetchNews,
    refetchInterval: 100000,
  });

  console.log(data);

  return (
    <div>
      <ReusablePaper
        styles={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <div>Crypto News</div>
        <div>{new Date().toDateString()}</div>
      </ReusablePaper>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
        {data &&
          data.Data.map((news) => {
            const date = new Date(news.PUBLISHED_ON * 1000).toLocaleDateString(
              'en-US'
            );

            return (
              <Card>
                <CardContent className='mx-auto'>
                  <div className='h-[200] w-auto'>
                    <Image
                      className='rounded-sm'
                      src={news.IMAGE_URL}
                      height={300}
                      width={700}
                      alt={news.TITLE}
                    />
                  </div>
                  <div>
                    <h1 className='font-bold mt-5 text-left'>{news.TITLE}</h1>
                    <div className='mt-5'>{ellipse(news.BODY, 155)}</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className='flex justify-between w-full'>
                    <Link href={news.URL} target='_blank'>
                      <h5 className='text-blue-500 font-sans'>Learn More</h5>
                    </Link>
                    <h5>{date}</h5>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default NewsPage;
