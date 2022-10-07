import { connectMongo } from '../../config/database/connectMongo';
import MenuResultModel from '../../models/MenuResultModel';
import { MenuResultT } from '../../util/APIResponseSchema';

export const getAllUserMenus = async (userId: string): Promise<MenuResultT[]> => {
  await connectMongo();
  const menus = await MenuResultModel.find<MenuResultT>(
    { 'metadata.createdBy': userId },
    null,
    {
      sort: { 'metadata.createdAt': -1 },
    },
  );

  return menus;
};

export const deleteMenuById = async (id: string): Promise<void> => {
  await connectMongo();
  await MenuResultModel.findByIdAndDelete(id);
};

export const getMenuById = async (id: string): Promise<MenuResultT | null> => {
  await connectMongo();
  const menu = await MenuResultModel.findById<MenuResultT>(id);

  return menu;
};

export const createNewSavedMenu = async (menu: MenuResultT): Promise<MenuResultT> => {
  await connectMongo();
  const newSavedMenu = await MenuResultModel.create<MenuResultT>(menu);

  return newSavedMenu;
};
