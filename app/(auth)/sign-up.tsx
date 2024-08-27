import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Modal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    code: "",
    error: "",
  });

  // Loading
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  // Modals
  const [successModal, setSuccessModal] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setIsSignUpLoading(true);

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
      setVerificationModal(true);
    } catch (err) {
      Alert.alert("Error", err.errors[0].longMessage);
    } finally {
      setIsSignUpLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    setIsVerifyLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      console.log("completeSignUp", completeSignUp);

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
        setVerificationModal(false);
        setSuccessModal(true);
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    } finally {
      setIsVerifyLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="absolute text-2xl text-black font-JakartaSemiBold bottom-5 left-5">
            Create Your Account
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />

          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
            secureTextEntry={true}
          />

          <CustomButton
            title="Sign Up"
            className="mt-6"
            onPress={onSignUpPress}
            loading={isSignUpLoading}
          />

          <OAuth />

          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>

        {/* Verification Modal */}
        <Modal isVisible={verificationModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
              Verification
            </Text>

            <Text className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}
            </Text>

            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              keyboardType="numeric"
              value={verification.code}
              onChangeText={(text) =>
                setVerification({ ...verification, code: text })
              }
            />

            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}

            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
              loading={isVerifyLoading}
            />
          </View>
        </Modal>

        {/* Success Modal */}
        <Modal isVisible={successModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />

            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>

            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>

            <CustomButton
              title="Browse Home"
              className="mt-5"
              onPress={() => {
                setSuccessModal(false);
                router.push("/(root)/(tabs)/home");
              }}
            />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
