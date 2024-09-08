// React Import
import React, { useCallback } from "react";
// React Native
import { View, Text, Image } from "react-native";
// Custom
import CustomButton from "./CustomButton";
// Constants
import { icons } from "@/constants";
// Clerk for Authentication
import { useOAuth } from "@clerk/clerk-expo";
// OAuth
import { googleOAuth } from "@/lib/auth";
// Expo Router
import { router } from "expo-router";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);
      if (result.code === "session_exists" || result.code === "success") {
        router.push("/(root)/(tabs)/home");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => {
          return (
            <Image
              source={icons.google}
              className="w-5 h-5 mx-2"
              resizeMode="contain"
            />
          );
        }}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
