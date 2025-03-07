'use client';

import ReactECharts from 'echarts-for-react';

const SparklineChart = ({ data }: { data: number[] }) => {
  const isPriceUp = data[0] < data[data.length - 1];
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
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: isPriceUp
                  ? 'rgba(111, 235, 111, 0.6)'
                  : 'rgba(238, 77, 39, 0.6)',
              },
              { offset: 1, color: 'rgba(255, 255, 255, 0)' },
            ],
          },
        },
        itemStyle: {
          color: isPriceUp ? 'rgb(111,235,111)' : 'rgb(238,77,39)',
        },
        lineStyle: { width: 2.5 },
        symbol: 'none',
      },
    ],
    grid: { left: 0, right: 0, top: 0, bottom: 0, containLabel: false },
  };

  return (
    <div>
      <ReactECharts option={option} style={{ height: '30px', width: '90px' }} />
    </div>
  );
};

export default SparklineChart;
