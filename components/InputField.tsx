import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { InputFieldProps } from "@/types/type";
import { icons } from "@/constants";

const InputField = ({
  label,
  labelStyle,
  icon,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  secureTextEntry = false, // Determines if the field is a password field
  ...props
}: InputFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={!isPasswordVisible} // Conditionally set secureTextEntry based on visibility
              {...props}
            />
            {secureTextEntry && (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                className="absolute right-4"
              >
                <Image
                  source={isPasswordVisible ? icons.eye : icons.eyeHide}
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
