import { StyleSheet, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import "../global.css";

const RootLayout = () => {
  return (
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
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
