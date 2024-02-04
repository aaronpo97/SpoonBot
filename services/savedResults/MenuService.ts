import { connectMongo } from '../../config/database/connectMongo';
import MenuResultModel from '../../models/MenuResultModel';
import { MenuResultT } from '../../util/APIResponseSchema';

export const getAllUserMenus = async (userId: string): Promise<MenuResultT[]> => {
  await connectMongo();
  return MenuResultModel.find<MenuResultT>({ 'metadata.createdBy': userId }, null, {
    sort: { 'metadata.createdAt': -1 },
  });
};

export const deleteMenuById = async (id: string) => {
  await connectMongo();
  return MenuResultModel.findByIdAndDelete(id);
};

export const getMenuById = async (id: string): Promise<MenuResultT | null> => {
  await connectMongo();
  return MenuResultModel.findById<MenuResultT>(id);
};

export const createNewSavedMenu = async (menu: MenuResultT): Promise<MenuResultT> => {
  await connectMongo();
  return MenuResultModel.create<MenuResultT>(menu);
};
