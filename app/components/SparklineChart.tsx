'use client';

import ReactECharts from 'echarts-for-react';

const SparklineChart = ({ data }: { data: number[] }) => {
  const isPriceUp = data[0] < data[data.length - 1];
  const option = {
    lineStyle: {
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowBlur: 8,
    },
    animation: true,
    xAxis: {
      type: 'category',
      show: false, // Hide x-axis
    },
    yAxis: {
      type: 'value',
      show: false, // Hide y-axis
    },
    series: [
      {
        data,
        type: 'line',
        areaStyle: {},
        itemStyle: {
          color: isPriceUp ? 'rgb(111,235,111)' : 'rgb(238,77,39)',
        },
        lineStyle: {
          width: 1.5, // Makes the sparkline cleaner
        },
        symbol: 'none', // Removes points from the line
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  };

  console.log(data);
  return (
    <div>
      <ReactECharts option={option} style={{ height: '30px', width: '90px' }} />
    </div>
  );
};

export default SparklineChart;
