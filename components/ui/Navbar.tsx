/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Page {
  slug: string;
  name: string;
}
const Navbar = () => {
  const router = useRouter();
  const [currentURL, setCurrentURL] = useState('/');

  useEffect(() => {
    setCurrentURL(router.asPath);
  }, [router.asPath]);

  const pages: readonly Page[] = [
    { slug: '/create-name', name: 'Name Generator' },
    { slug: '/create-review', name: 'Review Generator' },
    { slug: '/contact', name: 'Contact' },
    { slug: '/about', name: 'About' },
  ];
  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-3xl" href="/">
          <span className="text-xl font-bold cursor-pointer">SpoonBot</span>
        </Link>
      </div>
      <div className="flex-none lg:block hidden">
        <ul className="menu menu-horizontal p-0">
          {pages.map((page) => {
            return (
              <li key={page.slug}>
                <Link className="btn btn-secondary" tabIndex={0} href={page.slug}>
                  <span
                    className={`text-lg font-bold uppercase ${
                      currentURL === page.slug ? 'bg-primary-focus' : 'bg-primary'
                    } text-primary-content`}
                  >
                    {page.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="w-10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-48"
          >
            {pages.map((page) => (
              <li key={page.slug}>
                <Link href={page.slug}>{page.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
