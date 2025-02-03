const typeDefs = `#graphql
  type Video {
    id: ID!
    youtube_id: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    videos: [Video!]!
  }
`;

export { typeDefs };
