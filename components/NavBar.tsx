import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components';

const NavBar = () => {
  return (
    <header className='w-full absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-end items-center sm:px-16 px-6 py-4'>
        <Button
          title='Sign In'
          type='submit'
          containerStyles='text-primary-blue rounded-full bg-white min-w-[130px]'
        />
      </nav>
    </header>
  );
};

export default NavBar;
