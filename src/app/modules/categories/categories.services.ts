import User from "../user/user.model";

export const createCategoryServices = async (user: object, cat: string) => {
  const addCategory = (user as any).categories;
  addCategory.push(cat);
  const result = await User.findOneAndUpdate(
    { email: (user as any).email },
    { categories: addCategory },
    {
      runValidators: true,
    }
  );

  return result;
};
