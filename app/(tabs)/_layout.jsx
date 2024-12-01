import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

const TabLayout = () => {
  const TabIcon = ({ name, focused }) => (
    <MaterialIcons
      name={name}
      size={28}
      color={focused ? "#FFA001" : "white"}
    />
  );
  return (
    <View className="flex-1 bg-primary">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarIconStyle: { top: 15 },
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTitColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
          tabBarLabelStyle: {
            top: 18,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name={"home"} />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmarks",
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name={"bookmark"} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name={"add-circle"} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name={"person"} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabLayout;
