import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  View,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import icons from "../constants/icons";
import { useVideoPlayer, VideoView } from "expo-video";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  // Initialize the video player
  const player = useVideoPlayer(item.video, (player) => {
    player.showNowPlayingNotification = true;
    player.loop = false;
    player.allowsExternalPlayback = false;
  });

  // Monitor player status to reset playback state
  useEffect(() => {
    if (player.status === "idle" && play) {
      setPlay(false); // Reset to thumbnail when video finishes
    }
  }, [player.status, play]);

  const handlePlay = () => {
    setPlay(true);
    player.play();
  };

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <View>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen={true}
            allowsPictureInPicture={true}
            contentFit="cover"
            requiresLinearPlayback={true}
          />
        </View>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={handlePlay}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-35px my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) setActiveItem(viewableItems[0].key);
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100,
      }}
      contentOffset={{ x: 100 }}
      onViewableItemsChanged={viewableItemsChanged}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: 200,
    height: 300,
  },
});

export default Trending;
