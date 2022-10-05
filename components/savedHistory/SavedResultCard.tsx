/* eslint-disable no-underscore-dangle */
import { FC, ReactNode } from 'react';
import { BsTrash } from 'react-icons/bs';
import { ReviewResultT, NameResultT, MenuResultT } from '../../util/APIResponseSchema';

const SavedResultCard: FC<{
  children: [ReactNode, ReactNode];
  // eslint-disable-next-line no-unused-vars
  handleDelete: (id: string) => Promise<void>;
  resource: ReviewResultT | NameResultT | MenuResultT;
  deleteTooltipLabel: string;
}> = ({ children, handleDelete, resource, deleteTooltipLabel }) => (
  <div className="bg-slate-200 w-full flex flex-col my-7 rounded-xl items-end static">
    <div className="px-5 pt-5 flex flex-col lg:flex-row w-full">{children}</div>
    <div className="tooltip tooltip-left pr-2 pb-2" data-tip={deleteTooltipLabel}>
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
);

export default SavedResultCard;

export const SavedResultLeft: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-col lg:w-[30%]">{children}</div>
);
export const SavedResultRight: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-col lg:w-[70%]">{children}</div>
);
