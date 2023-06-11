export interface IUser {
  name: string;
  email: string;
  password: string;
  securityQuestion: {
    question: string;
    ans: string;
  };
}
