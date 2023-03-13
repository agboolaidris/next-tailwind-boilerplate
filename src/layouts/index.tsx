import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div>
      <div>Header</div>
      {children}
      <footer>footer</footer>
    </div>
  );
};
