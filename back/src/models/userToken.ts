import mongoose from "mongoose";

interface IUserToken {
  userId: string;
  token: string;
  createdAt: number;
}

const userTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 days
});

export default mongoose.model<IUserToken>("userToken", userTokenSchema);
