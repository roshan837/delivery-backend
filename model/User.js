import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  pickup: {
    type: String,
  },
  drop: {
    type: String,
  },
  number: {
    type: String,
  },
  name: {
    type: String,
  },
});

export default mongoose.model("User", UserSchema);
