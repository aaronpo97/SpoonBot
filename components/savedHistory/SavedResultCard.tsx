/* eslint-disable no-underscore-dangle */
import { FC, ReactNode } from 'react';
import { BsTrash } from 'react-icons/bs';
import { formatDistanceStrict, format } from 'date-fns';
import { ReviewResultT, NameResultT, MenuResultT } from '../../util/APIResponseSchema';

const SavedResultCard: FC<{
  children: [ReactNode, ReactNode];
  // eslint-disable-next-line no-unused-vars
  handleDelete: (id: string) => Promise<void>;
  resource: ReviewResultT | NameResultT | MenuResultT;
  deleteTooltipLabel: string;
}> = ({ children, handleDelete, resource, deleteTooltipLabel }) => {
  const timeDiff = formatDistanceStrict(
    new Date(resource.metadata.createdAt),
    new Date(),
    { addSuffix: true },
  );
  return (
    <div className="bg-base-200 w-full flex flex-col my-7 rounded-xl items-end static animate-in fade-in select-none">
      <div className="px-5 pt-5 flex flex-col lg:flex-row w-full">{children}</div>
      <div className="pr-2 pb-2 flex items-center justify-between w-full">
        <div
          className="tooltip tooltip-right tooltip-primary"
          data-tip={format(
            new Date(resource.metadata.createdAt),
            'MMMM do yyyy – h:mm a',
          )}
        >
          <p className="pl-7 pr-2 text-sm italic font-bold text-left">
            created {timeDiff}
          </p>
        </div>
        <div
          className="tooltip tooltip-left tooltip-primary"
          data-tip={deleteTooltipLabel}
        >
          <button
            className="btn btn-circle btn-ghost"
            type="button"
            onClick={() => {
              handleDelete(resource._id as string);
            }}
          >
            <BsTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedResultCard;

export const SavedResultLeft: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-col lg:w-[30%]">{children}</div>
);
export const SavedResultRight: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-col lg:w-[70%]">{children}</div>
);
