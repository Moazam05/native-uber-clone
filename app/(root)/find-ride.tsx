import { View, Text } from "react-native";
import React from "react";
import { useUserLocationStore } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import RideLayout from "@/components/RideLayout";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useUserLocationStore();

  return (
    <RideLayout>
      <Text className="text-2xl">Find Ride</Text>
    </RideLayout>
  );
};

export default FindRide;
