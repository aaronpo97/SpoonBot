import Link from 'next/link';
import { FC, ReactNode } from 'react';
import Spinner from '../ui/Spinner';

export const SavedSidebar: FC<{
  navigationItems: { name: string; href: string; current: boolean }[];
}> = ({ navigationItems }) => {
  return (
    <div className="flex h-full w-full flex-col items-center bg-neutral text-neutral-content">
      <ul className="menu w-full focus:bg-black">
        {navigationItems.map((item) => (
          <li key={item.name}>
            <Link href={item.href}>
              <span className={`${item.current ? 'active' : ''} font-bold uppercase`}>
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
          className={`tab tab-lg cursor-pointer font-bold uppercase ${
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
    <div className="flex h-full items-center bg-base-100">
      <div className="hidden h-full md:block md:w-3/12">
        <SavedSidebar navigationItems={navigationItems} />
      </div>
      <div className="h-full w-full overflow-x-auto p-7 md:w-9/12">
        <SavedHistoryMobileNav navigationItems={navigationItems} />

        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
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
