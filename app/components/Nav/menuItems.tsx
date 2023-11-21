import React from 'react';

interface MenuProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const MenuItems: React.FC<MenuProps> = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className='px-4 py-3 hover:bg-neutral-100 transition'>
      {children}
    </div>
  );
};
