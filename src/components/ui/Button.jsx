import React from 'react';

const VARIANTS = {
  primary: 'bg-main text-black hover:opacity-90 active:opacity-80',

  secondary:
    'bg-black border border-gray-100 text-gray-100 hover:opacity-80 active:opacity-70',

  tertiary: 'bg-gray-400 text-gray-300 hover:opacity-90 active:opacity-80',
};

const HEIGHT_SIZES = {
  40: 'h-[40px] px-3 text-sm',
  50: 'h-[50px] px-4 text-sm',
  55: 'h-[55px] px-5 text-base',
  60: 'h-[60px] px-6 text-base',
  75: 'h-[75px] px-6 text-lg',
  80: 'h-[80px] px-8 text-xl',
};

export default function Button({
  children,
  variant = 'primary',
  height = '55',
  className = '',
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center font-bold transition-all w-full ${VARIANTS[variant]} ${HEIGHT_SIZES[height]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
