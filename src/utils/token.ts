import jwt from "jsonwebtoken";

const generateToken = (email:string) => {
  const token = jwt.sign({email}, process.env.TOKEN_KEY, {
    expiresIn: "20days",
  });

  return token;
};

export default generateToken;