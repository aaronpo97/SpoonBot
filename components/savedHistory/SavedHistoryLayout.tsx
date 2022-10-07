import Link from 'next/link';
import { FC, ReactNode } from 'react';
import Spinner from '../ui/Spinner';

export const SavedSidebar: FC<{
  // eslint-disable-next-line react/require-default-props
  currentSidebarItem?: 'reviews' | 'menus' | 'names';
}> = ({ currentSidebarItem }) => {
  const sidebarItems = [
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
    <div className="flex flex-col items-center h-full bg-neutral text-neutral-content w-full">
      <ul className="menu w-full focus:bg-black">
        {sidebarItems.map((item) => (
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

const SavedHistoryLayout: FC<{
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  currentSidebarItem?: 'reviews' | 'menus' | 'names';
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
}> = ({ children, currentSidebarItem, isLoading }) => {
  return (
    <div className="bg-base-100 h-full flex items-center">
      <div className="h-full md:w-3/12 md:block hidden">
        <SavedSidebar currentSidebarItem={currentSidebarItem} />
      </div>
      <div className="h-full overflow-x-auto md:w-9/12 p-7">{children}</div>
    </div>
  );
};

export default SavedHistoryLayout;
