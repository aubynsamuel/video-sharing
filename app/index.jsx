import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import images from "../constants/images";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ justifyContent: "center", flex: 1 }}>
        <View>
          <Image
            source={images.logo}
            style={{
              resizeMode: "contain",
              height: 35,
              alignSelf: "center",
            }}
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            style={{ height: 340, width: 340, alignSelf: "center" }}
          />
        </View>

        <View style={{ alignSelf: "center", width: "95%" }}>
          <Text style={styles.TextStyle}>
            Discover Endless Possibilities With{" "}
            <Text style={[styles.TextStyle, { color: "#FFA001" }]}>Aora</Text>
          </Text>
          <Image
            source={images.path}
            style={{
              resizeMode: "contain",
              height: 12,
              left: 103,
              top: 54,
              position: "absolute",
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "#FFFFFF",
              marginTop: 30,
              width: "100%",
              alignSelf: "center",
            }}
          >
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title={"Continue with Email"}
            containerStyles="mt-10"
            handlePress={() => router.navigate("/sign-in")}
          ></CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  TextStyle: {
    textAlign: "center",
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default App;
