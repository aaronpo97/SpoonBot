/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
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
        <Link className="btn btn-ghost normal-case text-3xl" href="/">
          <span className="text-xl font-bold cursor-pointer text-primary-content">
            SpoonBot
          </span>
        </Link>
      </div>
      <div className="flex-none lg:block hidden">
        <ul className="menu menu-horizontal p-0">
          {pages.map((page) => {
            return (
              <li key={page.slug}>
                <Link tabIndex={0} href={page.slug}>
                  <span
                    className={`text-lg font-bold lg:hover:bg-primary-focus uppercase ${
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
                className="inline-block w-5 h-5 stroke-white"
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
    </nav>
  );
};
export default Navbar;
