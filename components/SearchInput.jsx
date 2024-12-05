import { TextInput, TouchableOpacity, View, Image, Alert } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";
import { router, usePathname } from "expo-router";

const SearchInput = ({initialQuery, className}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View
      className={`w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row
    space-x-4 ${className}`}
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1"
        value={query}
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#CDCDE0"}
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Error", "Please enter a search query");
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image
          source={icons.search}
          className="w-5 h-5 z-10"
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
