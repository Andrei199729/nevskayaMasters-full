import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
  rules: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 2,
  },
  password: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    required: true,
  },
});

// export default mongoose.model<IUser, UserModel>("user", userSchema);
export default mongoose.model<IUser>("user", userSchema);
