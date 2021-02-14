export const createCategory = async (_parent, args, { services, user }) => {
  const { title, type } = args;

  const createdBy = user.id;

  const category = await services.categories.createCategory({
    title,
    type: type.toLowerCase(),
    createdBy,
  });

  return category;
};
