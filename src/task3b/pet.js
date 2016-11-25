import mongoose from 'mongoose';
import _ from 'lodash';
const {Schema} = mongoose;

const PetSchema = new Schema({
  _id: Number,
  id: Number,
  userId: Number,
  type: String,
  color: String,
  age: Number,
  user: {type: Number, ref: 'User' }
}, {
  timestamps: true,
});
PetSchema.methods.toJSON = function () {
  return _.pick(this, ['id', 'userId', 'type', 'color', 'age', 'user'])
};
export default mongoose.model('Pet', PetSchema);
