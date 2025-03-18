'use client';
import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactECharts from 'echarts-for-react';
import Loading from '../loading';
import { Button } from '@/components/ui/button';
import Error from '../error';
import { ChartDataResponse, ReusableHistoryChartProps } from '../types/types';
import { EChartsOption } from 'echarts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';
const INTERVALS = {
  '1D': 1,
  '1W': 7,
  '1M': 30,
  '3M': 90,
  '6M': 180,
  '1Y': 365,
};

const getChartData = async ({
  queryKey,
}: {
  queryKey: [string, string, string];
}): Promise<[number, number][]> => {
  const [, coinId, interval] = queryKey;
  const days = INTERVALS[interval as keyof typeof INTERVALS];

  if (!days) {
    console.error(`Invalid interval: ${interval}`);
    return [];
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );

    if (!response.ok)
      throw Error('Failed fetching chart data. Please try again later');

    const data: ChartDataResponse = await response.json();
    return data.prices.map((item) => [new Date(item[0]).getTime(), item[1]]);
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

const ReusableHistoryChart: React.FC<ReusableHistoryChartProps> = ({
  coinId,
}) => {
  const [selectedInterval, setSelectedInterval] = useState<string>('1D');
  const [disableIntervalSet, setDisableIntervalSet] = useState(false);

  // Fetch Data with Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['getchartdata', coinId, selectedInterval],
    queryFn: getChartData,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    refetchOnWindowFocus: false,
    enabled:
      !!coinId && !!INTERVALS[selectedInterval as keyof typeof INTERVALS], // Ensure valid interval
  });

  const isPriceUp = useMemo(() => {
    if (!data || data.length < 2) return false;
    return data[0][1] < data[data.length - 1][1];
  }, [data]);

  const handleIntervalChange = (interval: string) => {
    if (interval !== selectedInterval) {
      setSelectedInterval(interval);
    }
    setDisableIntervalSet(true);
    setTimeout(() => {
      setDisableIntervalSet(false);
    }, 30000);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  // Formatter function
  const getDateFormatter = (interval: string) => {
    switch (interval) {
      case '1D':
        return (value: number) => {
          const date = new Date(value);
          return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(date);
        };
      case '1W':
        return (value: number) => {
          const date = new Date(value);
          return new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          }).format(date);
        };
      case '1M':
      case '3M':
      case '6M':
        return (value: number) => {
          const date = new Date(value);
          return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit',
          }).format(date);
        };
      case '1Y':
        return (value: number) => {
          const date = new Date(value);
          return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            year: 'numeric',
          }).format(date);
        };
      default:
        return (value: number) => {
          const date = new Date(value);
          return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            year: 'numeric',
          }).format(date);
        };
    }
  };

  // Limit the x-axis labels to 5-6 entries
  const getLimitedData = (data: [number, number][]) => {
    const maxLabels = 6;
    const interval = Math.ceil(data.length / maxLabels);
    return data.filter((_, index) => index % interval === 0);
  };

  const limitedData = getLimitedData(data || []);

  const option: EChartsOption = {
    animation: true,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {},
      },
      bottom: 2,
    },
    xAxis: {
      type: 'time',
      splitNumber: 5, // Change this to 'time' to indicate that you're working with time-based data
      axisLabel: {
        formatter: getDateFormatter(selectedInterval),
        rich: { label: { color: '#666' } },
      },

      interval: Math.ceil((data || []).length / 6),
    },

    yAxis: { type: 'value', show: true },
    series: [
      {
        data: limitedData,
        type: 'line',
        showSymbol: true, // Ensure points are always visible
        symbol: 'circle', // Shape of the data points
        symbolSize: 6, // Size of the points
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
      },
    ],
    grid: { left: 10, right: 10, top: 20, bottom: 40, containLabel: true },
  };

  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      <div className='flex justify-end w-full gap-2'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className='w-5 h-5' />
            </TooltipTrigger>
            <TooltipContent>
              Due to API plan limitations, interval switching has been rate
              limited to 30 seconds.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
