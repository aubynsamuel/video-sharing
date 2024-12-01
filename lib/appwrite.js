import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Client, Account, ID, Models } from "react-native-appwrite";
import React, { useState } from "react";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aubynsamuel.aora",
  projectId: "674be03d003bb2502178",
  databaseId: "674be1f1002003ccf782",
  userCollectionId: "674be23c000141dea966",
  videoCollectionId: "674be261001907112d58",
  storageId: "674be40b0020accc1539",
};

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);

// async function login(email, password) {
//   await account.createEmailPasswordSession(email, password);
//   setLoggedInUser(await account.get());
// }

export async function register(email, password, name) {
  await account.create(ID.unique(), email, password, name).then(
    (response) => {
      console.log(response);
    },
    (err) => {
      console.log(err);
    }
  );
}
    