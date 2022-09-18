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
    { slug: '/about', name: 'About' },
  ];
  return (
    <nav className="navbar sticky top-0 bg-primary px-5">
      <div className="flex-1">
        <h1 className="font-bold text-xl text-primary-content">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            SpoonBot
          </Link>
        </h1>
      </div>
      <div className="flex-none">
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
    </nav>
  );
};
export default Navbar;
