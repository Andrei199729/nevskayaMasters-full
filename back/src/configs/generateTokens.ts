import jwt from "jsonwebtoken";
import UserToken from "../models/userToken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from ".";
import { log } from "console";
import { Types } from "mongoose";

export enum ChoiceRights {
  Supervisor = "supervisor",
  Manager = "manager",
}

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  roles: string;
  __v?: number;
}

const generateTokens = async (user: IUser) => {
  try {
    const payload = { _id: user._id, roles: user.roles };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.deleteOne();

    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateTokens;
