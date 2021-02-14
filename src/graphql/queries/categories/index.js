export default {
  Query: {
    getCategories: (_p, { type }, ctx) => {
      const categories = ctx.services.categories.getCategoriesByType(type.toLowerCase());
      return categories;
    },
  },
  Category: {
    type: (parent) => parent.type.toUpperCase(),
    createdBy: async (parent, args, ctx) => {
      if (!parent.createdBy) {
        return null;
      }
      return ctx.services.users.getUserById(parent.createdBy);
    },
  },
};
