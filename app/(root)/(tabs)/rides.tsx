// React Import
import React from "react";
// React Native
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
// SafeAreaView
import { SafeAreaView } from "react-native-safe-area-context";
// API
import { useFetch } from "@/lib/fetch";
// Types
import { Ride } from "@/types/type";
// Clerk for Authentication
import { useUser } from "@clerk/clerk-expo";
// Custom Components
import RideCard from "@/components/RideCard";
// Constants
import { images } from "@/constants";

const Rides = () => {
  const { user } = useUser();

  const { data: recentRides, loading } = useFetch<Ride[]>(
    // eslint-disable-next-line prettier/prettier
    `/(api)/ride/${user?.id}`
  );

  return (
    <SafeAreaView>
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              All Rides
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Rides;
