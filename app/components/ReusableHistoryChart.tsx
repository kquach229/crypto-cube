'use client';
import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactECharts from 'echarts-for-react';
import Loading from '../loading';
import { Button } from '@/components/ui/button';

const INTERVALS = {
  '1D': 1,
  '1W': 7,
  '1M': 30,
  '3M': 90,
  '6M': 180,
  '1Y': 365,
};

// API Fetch Function
const getChartData = async ({ queryKey }) => {
  const [, coinId, interval] = queryKey;
  const days = INTERVALS[interval];

  if (!days) {
    console.error(`Invalid interval: ${interval}`);
    return [];
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.prices.map((item) => [new Date(item[0]), item[1]]);
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

const ReusableHistoryChart = ({ coinId }) => {
  const [selectedInterval, setSelectedInterval] = useState('1D');
  const [disableIntervalSet, setDisableIntervalSet] = useState(false);

  // Fetch Data with Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['getchartdata', coinId, selectedInterval],
    queryFn: getChartData,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    refetchOnWindowFocus: false,
    enabled: !!coinId && !!INTERVALS[selectedInterval], // Ensure valid interval
  });

  const isPriceUp = useMemo(() => {
    if (!data || data.length < 2) return false;
    return data[0][1] < data[data.length - 1][1];
  }, [data]);

  const handleIntervalChange = (interval) => {
    if (interval !== selectedInterval) {
      setSelectedInterval(interval);
    }
    setDisableIntervalSet(true);
    setTimeout(() => {
      setDisableIntervalSet(false);
    }, 10000);
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className='text-red-500'>Failed to fetch data. Try again later.</div>
    );

  const option = {
    animation: true,
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: (value) => {
          const date = new Date(value);

          // For 1D, display the time (hour:minute) if the time is available
          if (INTERVALS['1D'] === 1) {
            return new Intl.DateTimeFormat('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false, // 24-hour time format
            }).format(date);
          }

          // For 1W, display the day of MM-DD-YYYY (showing full date)
          if (INTERVALS['1W'] === 7) {
            return new Intl.DateTimeFormat('en-US', {
              weekday: 'short',
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            }).format(date);
          }

          // For 1M, display every 7 days (month-day format)
          if (INTERVALS['1M'] === 30) {
            return new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: '2-digit',
            }).format(date);
          }

          // For 3M, display every 20 days (month-day format)
          if (INTERVALS['3M'] === 90) {
            return new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: '2-digit',
            }).format(date);
          }

          // For 6M, display every 50 days (month-day format)
          if (INTERVALS['6M'] === 180) {
            return new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: '2-digit',
            }).format(date);
          }

          // For 1Y, display every 2 months (month-year format)
          if (INTERVALS['1Y'] === 365) {
            return new Intl.DateTimeFormat('en-US', {
              month: 'short',
              year: 'numeric',
            }).format(date);
          }

          // Default format for other intervals (month-year)
          return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            year: 'numeric',
          }).format(date);
        },
        rich: { label: { color: '#666' } },
      },
    },

    yAxis: { type: 'value', show: true },
    series: [
      {
        data,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 5,
            colorStops: [
              {
                offset: 0,
                color: isPriceUp
                  ? 'rgba(111, 235, 111, 0.6)'
                  : 'rgba(238, 77, 39, 0.6)',
              },
              { offset: 0.3, color: 'rgba(255, 255, 255, 0)' },
            ],
          },
        },
        itemStyle: { color: isPriceUp ? 'rgb(111,235,111)' : 'rgb(238,77,39)' },
        lineStyle: { width: 1.2 },
        symbol: 'none',
      },
    ],
    grid: { left: 10, right: 10, top: 20, bottom: 40, containLabel: true },
  };

  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      <div className='flex justify-end w-full gap-2'>
        {Object.keys(INTERVALS).map((interval) => (
          <Button
            disabled={disableIntervalSet}
            key={interval}
            className={`w-6 ${
              selectedInterval === interval ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleIntervalChange(interval)}>
            {interval}
          </Button>
        ))}
      </div>
      <ReactECharts
        style={{ height: '100%', width: '100%' }}
        className='h-full w-full'
        option={option}
      />
    </div>
  );
};

export default ReusableHistoryChart;
