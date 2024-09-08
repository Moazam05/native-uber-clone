// React Import
import React, { useRef } from "react";
// React Native
import { View, Text, TouchableOpacity, Image } from "react-native";
// Expo Router
import { router } from "expo-router";
// Gesture Handler
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Constants
import { icons } from "@/constants";
// Custom Components
import Map from "./Map";
// Bottom Sheet NPM
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const RideLayout = ({
  title,
  children,
  snapPoints,
}: {
  title: string;
  children: React.ReactNode;
  snapPoints?: string[];
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-10 h-10 bg-white items-center justify-center rounded-full">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-JakartaSemiBold ml-5">
              {title || "Go Back"}
            </Text>
          </View>
          {/* MAPS */}
          <Map />
        </View>

        {/* Bottom sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["40%", "75%"]}
          index={0}
        >
          <BottomSheetView
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
