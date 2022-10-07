import { FC } from 'react';
import { NameResultT } from '../../util/APIResponseSchema';
import SavedResultCard, { SavedResultLeft, SavedResultRight } from './SavedResultCard';

const SavedNameCard: FC<{
  name: NameResultT;
  // eslint-disable-next-line no-unused-vars
  handleDelete: (id: string) => Promise<void>;
}> = ({ name, handleDelete }) => {
  return (
    <SavedResultCard
      handleDelete={handleDelete}
      resource={name}
      deleteTooltipLabel="Delete Name"
    >
      <SavedResultLeft>
        <div className="w-full p-2">
          <h3 className="font-bold uppercase my-1 text-xl">Cuisine</h3>
          <p className="font-semibold text-lg">{name.input.cuisine}</p>
        </div>
        <div className="w-full p-2">
          <h3 className="font-bold uppercase my-1 text-xl">Keywords/Phrases</h3>
          <ul className="list-disc list-inside">
            {name.input.keywords.map((keyword) => (
              <li className="text-lg">{keyword}</li>
            ))}
          </ul>
        </div>
      </SavedResultLeft>
      <SavedResultRight>
        <div className="w-full p-2">
          <h3 className="font-bold uppercase my-1 text-xl">Name</h3>
          <p className="font-semibold text-6xl italic">{name.result}</p>
        </div>
      </SavedResultRight>
    </SavedResultCard>
  );
};

export default SavedNameCard;
