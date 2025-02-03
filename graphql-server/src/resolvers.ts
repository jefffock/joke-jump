export const resolvers = {
  Query: {
    videos: async (_: any, __: any, { grpcClient }: any) => {
      return new Promise((resolve, reject) => {
        grpcClient.GetVideos({}, (error: any, response: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(response.videos);
          }
        });
      });
    },
  },
};
