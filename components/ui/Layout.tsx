import { FC, ReactNode } from 'react';
import Navbar from './Navbar';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <header className="top-0">
        <Navbar />
      </header>
      <div className="flex-1 h-full top-0">{children}</div>
    </div>
  );
};

export default Layout;
