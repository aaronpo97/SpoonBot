import { Schema, model, models } from 'mongoose';
import { NameResultT } from '../util/APIResponseSchema';

// create a schema based off of the interface
const nameResultSchema = new Schema<NameResultT>({
  input: {
    cuisine: Schema.Types.String,
    keywords: [Schema.Types.String],
  },
  result: Schema.Types.String,
  metadata: {
    createdAt: Schema.Types.Date,
    createdBy: Schema.Types.String,
  },
});

const NameResultModel = models.NameResult || model('NameResult', nameResultSchema);

export default NameResultModel;
