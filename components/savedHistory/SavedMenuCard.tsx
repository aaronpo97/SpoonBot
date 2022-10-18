import { FC } from 'react';
import { MenuResultT } from '../../util/APIResponseSchema';
import SavedResultCard, { SavedResultLeft, SavedResultRight } from './SavedResultCard';

const SavedMenuCard: FC<{
  menu: MenuResultT;
  // eslint-disable-next-line no-unused-vars
  handleDelete: (id: string) => Promise<void>;
}> = ({ menu, handleDelete }) => {
  const menuData = menu.result.split('\n').filter((item) => item.trim() !== '');
  return (
    <SavedResultCard
      resource={menu}
      handleDelete={handleDelete}
      deleteTooltipLabel="Delete Menu"
    >
      <SavedResultLeft>
        <div className="w-full p-2">
          <h3 className="my-1 text-xl font-bold uppercase">Restaurant Name</h3>
          <p className="text-lg font-semibold">{menu.input.name}</p>
        </div>
        <div className="w-full p-2">
          <h3 className="my-1 text-xl font-bold uppercase">Cuisine</h3>
          <p className="text-lg font-semibold">{menu.input.cuisine}</p>
        </div>
      </SavedResultLeft>
      <SavedResultRight>
        <div className="w-full p-2">
          <h3 className="my-1 text-xl font-bold uppercase">Spoonbot&apos;s Menu</h3>
          {menuData.map((line) => {
            const lineSaysAppetizer = line.toLowerCase().includes('appetizer');
            const lineSaysEntree = line.toLowerCase().includes('entree');
            const lineSaysDessert = line.toLowerCase().includes('dessert');
            const lineSaysDrink = line.toLowerCase().includes('drink');

            const isHeading =
              lineSaysAppetizer || lineSaysEntree || lineSaysDessert || lineSaysDrink;

            return isHeading ? (
              <h5 className="my-2 text-lg font-bold uppercase">{line}</h5>
            ) : (
              <p className="text-lg italic">{line}</p>
            );
          })}
        </div>
      </SavedResultRight>
    </SavedResultCard>
  );
};

export default SavedMenuCard;
