'use client';

import { ColorType, createChart, LineSeries } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

const TradingViewContainer = ({ data }) => {
  const chartRefCointainer = useRef();
  const chartRef = useRef();
  const [lineColor, setLineColor] = useState('rgb(0, 204, 255)'); // Default color

  useEffect(() => {
    const chart = createChart(chartRefCointainer.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
      },
      width: 500,
      height: 200,
      timeScale: true,
    });

    chartRef.current = chart;

    const newSeries = chart.addSeries(LineSeries, {
      lineWidth: 2,
      color: lineColor, // Set dynamic color
      title: 'Hello',
    });
    console.log('data', data);
    newSeries.setData(data);

    // Cleanup chart on component unmount or when data changes
    return () => {
      chartRef.current?.remove();
    };
  }, [data, lineColor]); // Re-run the effect when data or lineColor changes

  // Functions to update the chart style dynamically
  const changeLineColor = (color) => {
    setLineColor(color);
  };

  const zoomIn = () => {
    const chart = chartRef.current;
    const range = chart.timeScale().getVisibleRange();
    chart.timeScale().setVisibleRange({
      from: range.from,
      to: range.to + 5 * 60 * 1000, // Increase the range by 5 minutes
    });
  };

  const zoomOut = () => {
    const chart = chartRef.current;
    const range = chart.timeScale().getVisibleRange();
    chart.timeScale().setVisibleRange({
      from: range.from,
      to: range.to - 5 * 60 * 1000, // Decrease the range by 5 minutes
    });
  };

  return (
    <div>
      <div ref={chartRefCointainer}></div>
      <div className='toolbar'>
        <button onClick={() => changeLineColor('rgb(255, 99, 132)')}>
          Change Line Color to Red
        </button>
        <button onClick={() => changeLineColor('rgb(0, 204, 255)')}>
          Change Line Color to Blue
        </button>
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomOut}>Zoom Out</button>
      </div>
    </div>
  );
};

const TradingViewChart = ({ data }) => {
  console.log(data);
  return <TradingViewContainer data={data} />;
};

export default TradingViewChart;
