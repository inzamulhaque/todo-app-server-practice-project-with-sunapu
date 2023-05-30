import User from "../models/User";
import bcrypt from "bcryptjs";

const findUserByEmailService = async (email: string) => {
  return await User.findOne({ email: email });
};

const createNewUserService = async (
  name: string,
  email: string,
  srtPass: string,
  securityQuestion: string,
  securityAns: string
) => {
  const password = bcrypt.hashSync(srtPass);

  return await User.create({
    name,
    email,
    password,
    securityQuestion: { question: securityQuestion, ans: securityAns },
  });
};

const checkPasswordSevice = async (password: string, hash: string) => {
  const isPasswordValid = await bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const setNewPasswordService = async (email: string, srtPass: string) => {
  const password = bcrypt.hashSync(srtPass);
  return await User.findOneAndUpdate(
    { email },
    { password },
    { runValidators: true }
  );
};

export {
  findUserByEmailService,
  createNewUserService,
  checkPasswordSevice,
  setNewPasswordService,
};
