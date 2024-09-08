// React Import
import React from "react";
// Expo Router
import { Redirect } from "expo-router";
// Clerk for Authentication
import { useAuth } from "@clerk/clerk-expo";
import * as Sentry from "@sentry/react-native";

const Home = () => {
  const { isSignedIn } = useAuth();

  Sentry.init({
    dsn: "https://8ded61bfb686a3a17377e497101e88be@o4507917711900672.ingest.de.sentry.io/4507917721010256",
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    _experiments: {
      // profilesSampleRate is relative to tracesSampleRate.
      // Here, we'll capture profiles for 100% of transactions.
      profilesSampleRate: 1.0,
    },
  });

  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }

  return <Redirect href="/(auth)/welcome" />;
};

export default Sentry.wrap(Home);
