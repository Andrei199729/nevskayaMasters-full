import mongoose from "mongoose";

export interface IAdmin {
  email: string;
  password: string;
}

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 2,
  },
  password: {
    type: String,
    required: true,
  },
});

// export default mongoose.model<IUser, UserModel>("user", userSchema);
export default mongoose.model<IAdmin>("admin", adminSchema);
