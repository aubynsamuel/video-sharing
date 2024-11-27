import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";

const RootLayout = () => {
  return (
   <Stack>
    <Stack.Screen name="(tabs)"/>
   </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
