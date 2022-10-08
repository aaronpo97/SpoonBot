import Link from 'next/link';
import { FC, ReactNode } from 'react';
import Spinner from '../ui/Spinner';

export const SavedSidebar: FC<{
  navigationItems: { name: string; href: string; current: boolean }[];
}> = ({ navigationItems }) => {
  return (
    <div className="flex flex-col items-center h-full bg-neutral text-neutral-content w-full">
      <ul className="menu w-full focus:bg-black">
        {navigationItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href}>
              <span className={`${item.current ? 'active' : ''} uppercase font-bold`}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SavedHistoryMobileNav: FC<{
  navigationItems: { name: string; href: string; current: boolean }[];
}> = ({ navigationItems }) => {
  return (
    <div className="tabs justify-center md:hidden">
      {navigationItems.map((item) => (
        <span
          className={`uppercase font-bold cursor-pointer tab tab-lg ${
            item.current ? 'tab-active' : ''
          } tab-lifted`}
          key={item.href}
        >
          <Link href={item.href}>{item.name}</Link>
        </span>
      ))}
    </div>
  );
};

const SavedHistoryLayout: FC<{
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  currentSidebarItem?: 'reviews' | 'menus' | 'names';
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
}> = ({ children, currentSidebarItem, isLoading }) => {
  const navigationItems = [
    {
      name: 'Reviews',
      href: '/account/history/reviews',
      current: currentSidebarItem === 'reviews',
    },
    {
      name: 'Menus',
      href: '/account/history/menus',
      current: currentSidebarItem === 'menus',
    },
    {
      name: 'Names',
      href: '/account/history/names',
      current: currentSidebarItem === 'names',
    },
  ];

  return (
    <div className="bg-base-100 h-full flex items-center">
      <div className="h-full md:w-3/12 md:block hidden">
        <SavedSidebar navigationItems={navigationItems} />
      </div>
      <div className="h-full overflow-x-auto md:w-9/12 w-full p-7">
        <SavedHistoryMobileNav navigationItems={navigationItems} />

        {isLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <Spinner />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default SavedHistoryLayout;
