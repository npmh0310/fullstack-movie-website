import publicClient from "../client/public.client";

const genreEndpoinst = {
  list: ({ mediaType }) => `${mediaType}/genres`,
};

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(
        genreEndpoinst.list({ mediaType })
      );
    } catch (error) {
      return { error };
    }
  },
};
