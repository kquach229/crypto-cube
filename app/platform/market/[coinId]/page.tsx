import ReusablePaper from '@/app/components/ReusablePaper';
import React from 'react';

const fetchCoinData = async (coinId) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}`
  );

  return response.json();
};

const CoinPage = async ({ params }) => {
  const coinData = await fetchCoinData(params.coinId);

  console.log(coinData);

  return (
    <div>
      <ReusablePaper>{coinData.name}</ReusablePaper>
      <ReusablePaper>
        <div>{coinData.description.en}</div>
      </ReusablePaper>
    </div>
  );
};

export default CoinPage;
