import mongoose, { model, models, Schema } from 'mongoose';
import { MenuResultT } from '../util/APIResponseSchema';

// mongoose schema
const menuResultSchema = new Schema<MenuResultT>({
  input: {
    cuisine: Schema.Types.String,
    name: Schema.Types.String,
  },
  result: Schema.Types.String,
  metadata: {
    createdAt: Schema.Types.Date,
    createdBy: Schema.Types.String,
  },
});

const MenuResultModel = models.MenuResult || model('MenuResult', menuResultSchema);

export default MenuResultModel;
