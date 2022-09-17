import Link from 'next/link';

const Navbar = () => {
  const pages = [{ slug: '/about', name: 'About' }];
  return (
    <div className="navbar sticky top-0 bg-primary px-5 h-full">
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
                <Link className="btn btn-ghost" tabIndex={0} href={page.slug}>
                  <span className="text-lg font-bold uppercase text-primary-content">
                    {page.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
