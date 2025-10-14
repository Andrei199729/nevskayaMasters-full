import { JWT_REFRESH_SECRET } from ".";
import UserToken from "../models/userToken";
import jwt from "jsonwebtoken";

const verifyRefreshToken = (refreshToken: string) => {
  const privateKey = JWT_REFRESH_SECRET;

  return new Promise(async (resolve, reject) => {
    try {
      const doc = await UserToken.findOne({ token: refreshToken });
      if (!doc) {
        return reject({ error: true, message: "Invalid refresh token" });
      }

      jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
        if (err) {
          return reject({ error: true, message: "Invalid refresh token" });
        }
        resolve({
          tokenDetails,
          error: false,
          message: "Valid refresh token",
        });
      });
    } catch (err) {
      reject({ error: true, message: "Invalid refresh token" });
    }
  });
};

export default verifyRefreshToken;
