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
    {
      addSuffix: true,
    },
  );
  return (
    <div className="static my-7 flex w-full select-none flex-col items-end rounded-xl bg-base-200 animate-in fade-in">
      <div className="flex w-full flex-col px-5 pt-5 lg:flex-row">{children}</div>
      <div className="flex w-full items-center justify-between pr-2 pb-2">
        <div
          className="tooltip tooltip-right tooltip-primary"
          data-tip={format(
            new Date(resource.metadata.createdAt),
            'MMMM do yyyy – h:mm a',
          )}
        >
          <p className="pl-7 pr-2 text-left text-sm font-bold italic">
            created {timeDiff}
          </p>
        </div>
        <div
          className="tooltip tooltip-left tooltip-primary"
          data-tip={deleteTooltipLabel}
        >
          <button
            className="btn btn-ghost btn-circle"
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
