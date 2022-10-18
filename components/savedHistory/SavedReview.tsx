/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable no-underscore-dangle */
import { FC } from 'react';
import { ReviewResultT } from '../../util/APIResponseSchema';
import SavedResultCard, { SavedResultLeft, SavedResultRight } from './SavedResultCard';

const SavedReview: FC<{
  review: ReviewResultT;
  // eslint-disable-next-line no-unused-vars
  handleDelete: (id: string) => Promise<void>;
}> = ({ review, handleDelete }) => {
  return (
    <SavedResultCard
      resource={review}
      handleDelete={handleDelete}
      deleteTooltipLabel="Delete Review"
    >
      <SavedResultLeft>
        <div className="w-full p-2">
          <h3 className="my-1 text-xl font-bold uppercase">Restaurant Name</h3>
          <p className="text-lg font-semibold">{review.input.name}</p>
        </div>
        <div className="w-full p-2">
          <h3 className="my-1 text-xl font-bold uppercase">Keywords/Phrases</h3>
          <ul className="list-inside list-disc">
            {review.input.keywords.map((keyword) => (
              <li className="text-lg">{keyword}</li>
            ))}
          </ul>
        </div>
      </SavedResultLeft>
      <SavedResultRight>
        <div className="w-full p-2">
          <h3 className="my-1 text-xl font-bold uppercase">Spoonbot&apos;s Review</h3>
          <p className="text-lg italic">{review.result}</p>
        </div>
      </SavedResultRight>
    </SavedResultCard>
  );
};

export default SavedReview;
