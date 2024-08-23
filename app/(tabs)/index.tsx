import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text className="text-3xl text-red-500">HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
