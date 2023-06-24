'use client';

import { Button } from '@/components';
import { updateSearchParams } from '@/utils';

type ShowMoreProps = {
  pageNumber: number;
  isNext: boolean;
};

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathname = updateSearchParams('limit', String(newLimit));
    window.location.replace(newPathname);
  };

  return (
    <div className='w-full flex-center gap-5 mt-10'>
      {!isNext && (
        <Button
          title='Show more'
          type='button'
          containerStyles='bg-primary-blue rounded-full text-white'
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
