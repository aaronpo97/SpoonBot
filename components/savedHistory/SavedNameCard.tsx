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
          <h3 className="my-1 text-xl font-bold uppercase">Cuisine</h3>
          <p className="text-lg font-semibold">{name.input.cuisine}</p>
        </div>{' '}
        <div className="w-full p-2">
          <h3 className="my-1 text-xl font-bold uppercase">Location</h3>
          <p className="text-lg font-semibold">{name.input.location}</p>
        </div>
        <div className="w-full p-2">
          <h3 className="my-1 text-xl font-bold uppercase">Keywords/Phrases</h3>
          <ul className="list-inside list-disc">
            {name.input.keywords.map((keyword) => (
              <li className="text-lg">{keyword}</li>
            ))}
          </ul>
        </div>
      </SavedResultLeft>
      <SavedResultRight>
        <div className="w-full p-2">
          <h3 className="my-1 text-xl font-bold uppercase">Spoonbot&apos;s Name</h3>
          <p className="text-6xl font-semibold italic">{name.result}</p>
        </div>
      </SavedResultRight>
    </SavedResultCard>
  );
};

export default SavedNameCard;
