import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import { VideoView } from "expo-video";
import icons from "../../constants/icons";
import CustomButton from "../../components/CustomButton";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const submit = () => {
    setUploading(true);
  };

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
          <Text className="text-base font-semibold text-green-100 mb-3">
            Upload Video
          </Text>
          <TouchableOpacity>
            {form.video ? (
              <VideoView />
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
          <Text className="text-base font-semibold text-green-100 mb-3">
            Thumbnail Image
          </Text>
          <TouchableOpacity>
            {form.thumbnail ? (
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

export default Create;