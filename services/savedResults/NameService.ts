import { connectMongo } from '../../config/database/connectMongo';
import NameResultModel from '../../models/NameResultModel';
import { NameResultT } from '../../util/APIResponseSchema';

export const getAllUserSavedNames = async (userId: string): Promise<NameResultT[]> => {
  await connectMongo();
  const names = await NameResultModel.find<NameResultT>(
    { 'metadata.createdBy': userId },
    null,
    {
      sort: { 'metadata.createdAt': -1 },
    },
  );

  return names;
};

export const getNameById = async (id: string): Promise<NameResultT | null> => {
  await connectMongo();
  const name = await NameResultModel.findById<NameResultT>(id);

  return name;
};

export const deleteNameById = async (id: string): Promise<void> => {
  await connectMongo();
  await NameResultModel.findByIdAndDelete<NameResultT>(id);
};

export const createNewSavedName = async (name: NameResultT): Promise<NameResultT> => {
  await connectMongo();
  const newSavedName = await NameResultModel.create<NameResultT>(name);

  return newSavedName;
};
