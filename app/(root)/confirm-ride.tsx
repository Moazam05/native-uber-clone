import { View, Text } from "react-native";
import React from "react";
import RideLayout from "@/components/RideLayout";

const ConfirmRide = () => {
  return (
    <RideLayout title="Confirm Ride" snapPoints={["55%", "75%"]}>
      <Text>ConfirmRide</Text>
    </RideLayout>
  );
};

export default ConfirmRide;
