'use client';

import Image from 'next/image';

type ButtonProps = {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  rightIcon?: string;
  handleClick?: () => void;
  type?: 'button' | 'submit';
  isDisabled?: boolean;
};

const Button = ({
  title,
  containerStyles,
  handleClick,
  type = 'button',
  textStyles,
  rightIcon,
  isDisabled,
}: ButtonProps) => {
  return (
    <button
      disabled={false}
      type={type}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className='relative w-6 h-6'>
          <Image
            src={rightIcon}
            alt='right icon'
            fill
            className='object-contain'
          />
        </div>
      )}
    </button>
  );
};

export default Button;
