'use client';
import React, { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ReactECharts from 'echarts-for-react';
import Loading from '../loading';
import { Button } from '@/components/ui/button';

const INTERVALS = {
  '1D': 1,
  '1W': 7,
  '1M': 30,
  '6M': 180,
  '1Y': 365,
  max: 'max',
};

const getChartData = async ({ queryKey }) => {
  const [, coinId, interval] = queryKey;
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${INTERVALS[interval]}`
  );
  const data = await response.json();

  return data.prices.map((item) => [new Date(item[0]), item[1]]);
};

const ReusableHistoryChart = ({ coinId }) => {
  const queryClient = useQueryClient();
  const [selectedInterval, setSelectedInterval] = React.useState('1D');

  const { data, isLoading, error } = useQuery({
    queryKey: ['getchartdata', coinId, selectedInterval],
    queryFn: getChartData,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
    queryClient.invalidateQueries(['getchartdata', coinId, interval]); // Forces refetch when interval changes
  };

  const isPriceUp = useMemo(() => {
    if (!data || data.length < 2) return false;
    return data[0][1] < data[data.length - 1][1];
  }, [data]);

  if (isLoading) return <Loading />;
  if (error || !data?.length) return <div>Error...</div>;

  const option = {
    animation: true,
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: (value) =>
          new Intl.DateTimeFormat('en-US', {
            month: 'short',
            year: 'numeric',
          }).format(new Date(value)),
        rich: {
          label: {
            color: '#666',
          },
        },
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
        itemStyle: {
          color: isPriceUp ? 'rgb(111,235,111)' : 'rgb(238,77,39)',
        },
        lineStyle: { width: 1.2 },
        symbol: 'none',
      },
    ],
    grid: { left: 10, right: 10, top: 20, bottom: 40, containLabel: true },
  };

  return (
    <div className='h-full w-full'>
      <div className='flex justify-end w-full gap-2'>
        {Object.keys(INTERVALS).map((interval) => (
          <Button
            key={interval}
            className={`w-6 ${
              selectedInterval === interval ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleIntervalChange(interval)}>
            {interval}
          </Button>
        ))}
      </div>

      <ReactECharts className='h-full w-full' option={option} />
    </div>
  );
};

export default ReusableHistoryChart;
