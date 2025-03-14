import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';

const ReusableSearch = ({ placeholder = 'Search' }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('query', searchTerm);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className='relative flex items-center'>
      <Search className='absolute left-2.5 h-4 w-4 text-primary' />
      <input
        onChange={(e) => handleSearch(e.target.value)}
        type='search'
        placeholder={placeholder}
        className='pl-8 border-none shadow-none w-[300px]'
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
};

export default ReusableSearch;
