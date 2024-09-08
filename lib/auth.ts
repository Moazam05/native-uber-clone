// API
import { fetchAPI } from "./fetch";
// Expo Secure Store
import * as SecureStore from "expo-secure-store";
// Expo Linking
import * as Linking from "expo-linking";

export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err: any) {
      console.error("SecureStore set item error: ", err);
      return;
    }
  },
};

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, signUp, setActive } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(root)/(tabs)/home", {
        scheme: "myapp",
      }),
    });

    if (!createdSessionId) {
      return {
        success: false,
        code: "error",
        message: "Authentication failed",
      };
    }

    if (setActive) {
      await setActive({ session: createdSessionId });
    }

    const { createdUserId, firstName, lastName } = signUp;
    if (createdUserId) {
      await fetchAPI("/(api)/user", {
        method: "POST",
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email: signUp.emailAddress,
          clerkId: createdUserId,
        }),
      });
    }

    return {
      success: true,
      code: "success",
      message: "You have successfully authenticated",
    };
  } catch (error: any) {
    console.error("OAuth error", error);
    return {
      success: false,
      code: "error",
      message: error?.errors[0]?.longMessage,
    };
  }
};
