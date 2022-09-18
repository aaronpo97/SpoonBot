import { FC, ReactNode } from 'react';
import Navbar from './Navbar';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 h-full">{children}</div>
    </div>
  );
};

export default Layout;
