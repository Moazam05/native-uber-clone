import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { Alert } from "react-native";

const Payment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [success, setSuccess] = useState(false);

   const confirmHandler = async (paymentMethod, shouldSavePaymentMethod, intentCreationCallback) => {
    // Make a request to your own server.
    const myServerResponse = await fetch(...);
    // Call the `intentCreationCallback` with your server response's client secret or error
    const { clientSecret, error } = await response.json();
    if (clientSecret) {
      intentCreationCallback({clientSecret})
    } else {
      intentCreationCallback({error})
    }
  }

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
    });
    if (error) {
      // handle error
    }
  };



  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        Alert.alert(`Error code: ${error.code}`, `${error.message}`);
      }
    } else {
      setSuccess(true);
    }
  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;