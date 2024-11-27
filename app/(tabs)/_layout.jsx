import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const TabLayout = () => {
  const TabIcon = ({name}) => (
    <MaterialIcons name={name} size={24} color={"black"} />
  );
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon:()=>( <TabIcon name={"home"} />),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon:()=>( <TabIcon name={"person"} />),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmarks",
            tabBarIcon:()=>( <TabIcon name={"bookmarks"} />),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon:()=>( <TabIcon name={"create"} />),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
