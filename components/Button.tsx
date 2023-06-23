'use client';

import Image from 'next/image';

type ButtonProps = {
  title: string;
  containerStyles?: string;
  handleClick?: () => void;
  type?: 'button' | 'submit';
};

const Button = ({
  title,
  containerStyles,
  handleClick,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      disabled={false}
      type={type}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className='flex-1'>{title}</span>
    </button>
  );
};

export default Button;
