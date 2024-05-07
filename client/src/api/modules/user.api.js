import privateClient from "./../client/private.client";
import publicClient from "./../client/public.client";

const userEndpoint = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

const useApi = {
  signin: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoint.signin, {
        username,
        password,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoint.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getInfo: async ({}) => {
    try {
      const response = await privateClient.get(userEndpoint.getInfo);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoint.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });
    } catch (error) {
      return { error };
    }
  },
};
