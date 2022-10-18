import { FC } from 'react';
import { MenuResult } from '../../util/ResultType';

const MenuResultInfo: FC<{ result: MenuResult }> = ({ result }) => {
  const menu = result.menu.split('\n').filter((item) => item.trim() !== '');

  return (
    <div className="w-10/12 select-none rounded-2xl bg-primary py-12 px-8 shadow-lg animate-in fade-in">
      <p className="mb-3 text-xl font-bold italic text-primary-content">
        The SpoonBot AI created a new menu for you!
      </p>
      <div className="text-xl text-primary-content">
        {menu.map((line) => {
          const lineSaysAppetizer = line.toLowerCase().includes('appetizer');
          const lineSaysEntree = line.toLowerCase().includes('entree');
          const lineSaysDessert = line.toLowerCase().includes('dessert');
          const lineSaysDrink = line.toLowerCase().includes('drink');

          const isHeading =
            lineSaysAppetizer || lineSaysEntree || lineSaysDessert || lineSaysDrink;

          return isHeading ? (
            <h5 className="my-2 text-xl font-bold uppercase">{line}</h5>
          ) : (
            <p className="">{line}</p>
          );
        })}
      </div>
    </div>
  );
};

export default MenuResultInfo;
