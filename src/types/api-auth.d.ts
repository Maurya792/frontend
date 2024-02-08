type AccessTokenData = {
  userId: number;
  username: string;
  email: string;
};
type DataMapping = {
  accessToken: AccessTokenData;
  resetPasswordToken: Pick<AccessTokenData, "username" | "userId">;
  verifyAccountToken: AccessTokenData;
};
