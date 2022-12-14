/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import { BiMenu } from 'react-icons/bi';
import { useUser } from '@auth0/nextjs-auth0';
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

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    setCurrentURL(router.asPath);
  }, [router.asPath]);

  const authenticatedPages: readonly Page[] = [
    { slug: '/create-name', name: 'Create Name' },
    { slug: '/create-review', name: 'Create Review' },
    { slug: '/create-menu', name: 'Create Menu' },
    { slug: '/account', name: 'Account' },
    { slug: '/api/auth/logout', name: 'Logout' },
  ];

  const unauthenticatedPages: readonly Page[] = [
    { slug: '/api/auth/login', name: 'Login' },
  ];

  const nonAuthenticatedPages: readonly Page[] = [{ slug: '/about', name: 'About' }];

  // pages should combine authenticated pages and non authenticated pages if user is authenticated
  const pages =
    !isLoading && user && !error
      ? [...nonAuthenticatedPages, ...authenticatedPages]
      : [...nonAuthenticatedPages, ...unauthenticatedPages];

  return (
    <nav className="navbar bg-primary">
      <div className="flex-1">
        <Link className="btn btn-ghost text-3xl normal-case" href="/">
          <span className="cursor-pointer text-xl font-bold text-primary-content">
            SpoonBot
          </span>
        </Link>
      </div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal p-0">
          {pages.map((page) => {
            return (
              <li key={page.slug}>
                <Link tabIndex={0} href={page.slug}>
                  <span
                    className={`text-lg font-bold uppercase lg:hover:bg-primary-focus ${
                      currentURL.includes(page.slug) ? 'bg-primary-focus' : 'bg-primary'
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
            <BiMenu size={23} className="text-white" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-48 bg-base-100 p-2 shadow"
          >
            {pages.map((page) => (
              <li key={page.slug}>
                <Link href={page.slug}>
                  <span className="select-none">{page.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
