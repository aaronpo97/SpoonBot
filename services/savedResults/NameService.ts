import { connectMongo } from '../../config/database/connectMongo';
import NameResultModel from '../../models/NameResultModel';
import { NameResultT } from '../../util/APIResponseSchema';

export const getAllUserSavedNames = async (userId: string): Promise<NameResultT[]> => {
  await connectMongo();
  return NameResultModel.find<NameResultT>({ 'metadata.createdBy': userId }, null, {
    sort: { 'metadata.createdAt': -1 },
  });
};

export const getNameById = async (id: string): Promise<NameResultT | null> => {
  await connectMongo();
  return NameResultModel.findById<NameResultT>(id);
};

export const deleteNameById = async (id: string): Promise<NameResultT | null> => {
  await connectMongo();
  return NameResultModel.findByIdAndDelete<NameResultT>(id);
};

export const createNewSavedName = async (name: NameResultT): Promise<NameResultT> => {
  await connectMongo();
  return NameResultModel.create<NameResultT>(name);
};
