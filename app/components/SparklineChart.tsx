'use client';

import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

const SparklineChart = ({ data }: { data: number[] }) => {
  const isPriceUp = useMemo(() => data[0] < data[data.length - 1], [data]);
  const option = {
    animation: true,
    xAxis: { type: 'category', show: false },
    yAxis: { type: 'value', show: false },
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
            y2: 1.2,
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
    grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
  };

  return (
    <ReactECharts option={option} style={{ height: '120px', width: '70px' }} />
  );
};

export default SparklineChart;
