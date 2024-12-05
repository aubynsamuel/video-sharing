import { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import icons from "../constants/icons";
import { useVideoPlayer, VideoView } from "expo-video";

const VideoCard = ({
  Video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);

  // Initialize the video player
  const player = useVideoPlayer(video, (player) => {
    player.showNowPlayingNotification = true;
    player.loop = false; // No looping
    player.allowsExternalPlayback = false;
  });

  useEffect(() => {
    if (player.status === "idle") {
      setPlay(false); // Reset to thumbnail when video finishes
    }
  }, [player.status]);
  // Monitor player status to reset playback state

  const handlePlay = () => {
    setPlay(true);
    player.play();
  };

  return (
    <View className="flex-col items-center px-4 mb-7">
      {play ? (
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen={true}
          allowsPictureInPicture={true}
          contentFit="cover"
          requiresLinearPlayback={true}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={handlePlay}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      )}
      <View className="flex-row gap-3 items-start mt-4">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1 ">
            <Text
              className="text-white font-semibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-xs text-gray-100" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 210,
    borderRadius: 12,
    marginTop: 24,
  },
});
export default VideoCard;
