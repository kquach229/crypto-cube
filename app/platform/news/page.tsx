'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ReusablePaper from '@/app/components/ReusablePaper';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { ellipse } from '@/src/lib/utils';
import Link from 'next/link';
import Loading from '@/app/loading';
import Error from '@/app/error';

interface SourceData {
  TYPE: string;
  ID: number;
  NAME: string;
  IMAGE_URL: string;
  SOURCE_KEY: string; // Allowing for additional properties in the future
}

interface CategoryData {
  CATEGORY: string;
  ID: number;
  NAME: string;
  TYPE: string; // Adjust type as needed based on the structure of individual category items
}

interface NewsItem {
  BODY: string;
  CATEGORY_DATA: CategoryData[];
  CREATED_ON: number;
  DOWNVOTES: number;
  GUID: string;
  ID: number;
  IMAGE_URL: string;
  KEYWORDS: string;
  LANG: string;
  PUBLISHED_ON: number;
  SCORE: number;
  SENTIMENT: 'NEGATIVE' | 'POSITIVE' | 'NEUTRAL';
  SOURCE_DATA: SourceData;
  SOURCE_ID: number;
  STATUS: 'ACTIVE' | 'INACTIVE';
  TITLE: string;
  TYPE: string;
  UPDATED_ON: number;
  UPVOTES: number;
  URL: string;
}

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

  if (isLoading) return <Loading />;
  if (error) return <Error />;

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
          data.Data.map((news: NewsItem) => {
            const publishedDate = new Date(
              news.PUBLISHED_ON * 1000
            ).toLocaleDateString('en-US');

            return (
              <Card key={news.ID}>
                <CardContent>
                  <div className='h-[200]'>
                    <Image
                      className='rounded-sm'
                      src={news.IMAGE_URL}
                      height={700}
                      width={700}
                      style={{ objectFit: 'contain' }}
                      alt={news.TITLE}
                    />
                  </div>
                  <div>
                    <h1 className='font-bold mt-5 text-left'>{news.TITLE}</h1>
                    <div className='mt-2 text-xs opacity-75'>
                      <h5>Published {publishedDate}</h5>
                    </div>
                    <div className='mt-5'>{ellipse(news.BODY, 155)}</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className='flex justify-between w-full'>
                    <Link href={news.URL} target='_blank'>
                      <h5 className='text-blue-500 font-sans'>Read More</h5>
                    </Link>
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
