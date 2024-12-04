import { FlatList, SafeAreaView, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, reFetch } = useAppwrite(
    useCallback(() => searchPost(query))
  );

  useEffect(() => {
    reFetch();
  }, [query]);

  console.log(posts);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        className="mb-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="my-4 px-4">
            <View className="mb-3">
              <SearchInput initialQuery={query} />
            </View>
            <Text className="font-medium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-white text-2xl font-semibold">{query}</Text>
            {/* <View className="mt-1.5">
              <Image
                source={images.logoSmall}
                className="w-9 h-10"
                resizeMode="contain"
              />
            </View> */}
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

export default Search;
