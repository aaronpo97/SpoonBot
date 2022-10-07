import { FC } from 'react';
import { MenuResult } from '../../util/ResultType';

const MenuResultInfo: FC<{ result: MenuResult }> = ({ result }) => {
  const menu = result.menu.split('\n').filter((item) => item.trim() !== '');

  return (
    <div className="bg-primary shadow-lg rounded-2xl w-10/12 py-12 px-8 animate-in fade-in select-none">
      <p className="text-xl font-bold mb-3 italic text-primary-content">
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
            <h5 className="font-bold text-xl my-2 uppercase">{line}</h5>
          ) : (
            <p className="">{line}</p>
          );
        })}
      </div>
    </div>
  );
};

export default MenuResultInfo;
