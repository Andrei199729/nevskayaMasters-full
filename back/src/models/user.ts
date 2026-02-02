import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
  roles: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    enum: ["manager", "supervisor"],
    required: true,
    default: "manager",
  },
});

// export default mongoose.model<IUser, UserModel>("user", userSchema);
export default mongoose.model<IUser>("User", userSchema, "users");
