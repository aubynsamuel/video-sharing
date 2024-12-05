import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import EmptyState from "../../components/EmptyState";
import { getUserPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import icons from "../../constants/icons";
import InfoBox from "../../components/InfoBox";
import { signOut } from "../../lib/appwrite";

const Profile = () => {
    const { user, setIsLoggedIn, setUser } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPost(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/");
  };

  console.log(posts);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard Video={item} />}
        className="mb-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border-secondary rounded-lg justify-center items-center">
              <Image
                source={user.avatar ? { uri: user.avatar } : icons.profile}
                resizeMode="contain"
                className="w-[90%] h-[90%] rounded-lg"
              />
            </View>
            <InfoBox
              title={user?.username}
              subtitle={user?.email}
              containerStyles={"mt-2"}
              titleStyles={"text-lg"}
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle={"Posts"}
                containerStyles={"mr-5"}
                titleStyles={"text-xl"}
              />
              <InfoBox
                title={"1.2k"}
                subtitle={"Followers"}
                titleStyles={"text-lg"}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
