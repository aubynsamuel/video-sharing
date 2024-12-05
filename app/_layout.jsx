import { View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import GlobalProvider from "../context/GlobalProvider";

const RootLayout = () => {
  return (
    <GlobalProvider>
      <View className="flex-1 bg-primary">
        <Stack
          screenOptions={{
            headerShown: false,
            navigationBarColor: "#161622",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="search/[query]" />
        </Stack>
      </View>
    </GlobalProvider>
  );
};

export default RootLayout;