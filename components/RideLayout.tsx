import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons } from "@/constants";
import Map from "./Map";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const RideLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity>
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
        <BottomSheet ref={bottomSheetRef} snapPoints={["40%, 85%"]} index={0}>
          <BottomSheetScrollView
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            {children}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
