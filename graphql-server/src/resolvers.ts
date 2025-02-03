export const resolvers = {
  Query: {
    hello: (_: any, { name }: { name: string }) => {
      return `Hello ${name}!`;
    },
  },
};
