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

export const updateCatNameService = async (
  user: object,
  oldCatName: string,
  newCatName: string
) => {
  const updateCategory = (user as any).categories;
  const catIndex = updateCategory.indexOf(oldCatName);

  if (catIndex !== -1) {
    updateCategory[catIndex] = newCatName;
  }

  const result = await User.findOneAndUpdate(
    { email: (user as any).email },
    { categories: updateCategory },
    {
      runValidators: true,
    }
  );

  return result;

};
