export interface IUser {
  name: string;
  email: string;
  password: string;
  categories?: string[];
  securityQuestion: {
    question: string;
    ans: string;
  };
}
