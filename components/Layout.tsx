import { FC, ReactNode } from 'react';
import Navbar from './Navbar';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="h-[5%]">
        <Navbar />
      </div>
      <div className="h-[95%]">{children}</div>
    </div>
  );
};

export default Layout;
