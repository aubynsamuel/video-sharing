import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import { useVideoPlayer, VideoView } from "expo-video";
import icons from "../../constants/icons";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { MaterialIcons } from "@expo/vector-icons";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  // console.log("user: ", user)

  const openPicker = async (SelectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [SelectType],
      quality: 1,
      aspect: [4, 3],
      allowsEditing: true,
    });
    if (!result.canceled) {
      if (SelectType === "images") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (SelectType === "videos") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("Error", "Please fill in all the fields");
    }
    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  // Initialize the video player
  const player = useVideoPlayer(form.video?.uri, (player) => {
    player.showNowPlayingNotification = true;
    player.loop = false; // No looping
    player.allowsExternalPlayback = false;
  });

  return (
    <SafeAreaView className="bg-primary h-full  ">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl font-semibold text-white">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder={"Give your video a title"}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={"mt-7"}
        />
        <View className="mt-7 space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-base font-semibold text-green-100 mb-3">
              Upload Video
            </Text>
            {form.video && (
              <MaterialIcons
                onPress={() => setForm({ ...form, video: null })}
                name="delete-forever"
                color={"#ffffff"}
                size={24}
              />
            )}
          </View>

          <TouchableOpacity onPress={() => openPicker("videos")}>
            {form?.video ? (
              <VideoView
                style={styles.video}
                player={player}
                allowsFullscreen={true}
                allowsPictureInPicture={true}
                contentFit="cover"
                requiresLinearPlayback={true}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl items-center justify-center">
                <View className="w-14 h-14 border-dashed border border-secondary-100 items-center justify-center">
                  <Image
                    source={icons.upload}
                    className="w-10 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-base font-semibold text-green-100 mb-3">
              Thumbnail Image
            </Text>
            {form.thumbnail && (
              <MaterialIcons
                onPress={() => setForm({ ...form, thumbnail: null })}
                name="delete-forever"
                color={"#ffffff"}
                size={24}
              />
            )}
          </View>
          <TouchableOpacity onPress={() => openPicker("images")}>
            {form?.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-16 px-4 border-2 border-black-200 flex-row gap-2 space-x-2 bg-black-100 rounded-2xl items-center justify-center">
                <Image
                  source={icons.upload}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
                <Text className="text-sm text-green-100 font-medium">
                  Select Thumbnail
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI prompt"
          value={form.prompt}
          placeholder={"The prompts you used to create this video"}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={"mt-7"}
        />
        <CustomButton
          title={"Submit & Publish"}
          handlePress={submit}
          containerStyles={"mt-7"}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 210,
    borderRadius: 12,
    // marginTop: 24,
  },
});

export default Create;
