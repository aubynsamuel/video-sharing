import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress, textStyles, containerStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.buttonContainer]}
      className={`${containerStyles}`}
      disabled={isLoading}
    >
      <Text style={[styles.TextStyles, textStyles ]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#FFA001",
    height: 60,
    borderRadius: 15,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  TextStyles:{
    fontWeight:"500", 
    fontSize:18,
    textAlign: "center",
  }
});
