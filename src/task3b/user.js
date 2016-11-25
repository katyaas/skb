import mongoose from 'mongoose';
import _ from 'lodash';
const {Schema} = mongoose;

const UserSchema = new Schema({
  id: Number,
  _id: Number,
  username: String,
  fullname: String,
  password: String,
  values: {
    money: String,
    origin: String
  },
  pets: [{type: Number, ref: "Pet"}]
}, {
  timestamps: true,
});
UserSchema.methods.toJSON = function () {
  return _.pick(this, ['id', 'username', 'fullname', 'password', 'values', 'values.money', 'values.origin', 'pets'])
};

export default mongoose.model('User', UserSchema);
