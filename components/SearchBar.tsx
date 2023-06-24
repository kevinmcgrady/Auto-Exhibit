'use client';

import { SearchManufacturer } from '@/components';
import { useState } from 'react';
import Image from 'next/image';
import { SearchButton } from '@/components';
import { updateQueryParams } from '@/utils';

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState<string>('');
  const [model, setModel] = useState<string>('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === '' && model === '') return;

    const newPathname = updateQueryParams(
      model.toLowerCase(),
      manufacturer.toLowerCase(),
    );

    window.location.replace(newPathname);
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton classes='sm:hidden' />
      </div>
      <div className='searchbar__item'>
        <Image
          alt='model icon'
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
        />
        <input
          type='text'
          name='model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder='Tiguan'
          className='searchbar__input'
        />
        <SearchButton classes='sm:hidden' />
      </div>
      <SearchButton classes='max-sm:hidden' />
    </form>
  );
};

export default SearchBar;
