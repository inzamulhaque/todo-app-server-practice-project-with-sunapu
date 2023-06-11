import mongoose from "mongoose";
import validator from "validator";
import { IUser } from "./user.interface";


const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },

    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    securityQuestion: {
      question: {
        type: String,
        required: true,
      },
      ans: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);



const User = mongoose.model("User", userSchema);

export default User;
