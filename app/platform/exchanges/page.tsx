import ReusablePaper from '@/app/components/ReusablePaper';
import { Table, TableCaption } from '@/components/ui/table';
import React from 'react';

const ExchangesPage = () => {
  return (
    <div>
      <ReusablePaper>Top Cryptocurreny Spot Exchanges</ReusablePaper>
      <div>
        <Table>
          <TableCaption></TableCaption>
        </Table>
      </div>
    </div>
  );
};

export default ExchangesPage;
