import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Permission,
  Role,
  Storage,
} from "react-native-appwrite";

import config from "../appwriteConfig"

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function register(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    console.log("New Account: ", newAccount);
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        username: username,
        email: email,
        avatar: avatarUrl,
        accountId: newAccount.$id,
      },
      [Permission.write(Role.any())]
    );
    console.log("New User: ", JSON.stringify(newUser));
    return newUser;
  } catch (error) {
    console.log("Register user error: ", error);
    throw error;
  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session: ", session);
    return session;
  } catch (error) {
    console.log("Sign In Error: ", error);
    throw error;
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw error;
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    // console.log("Current Account: ", currentAccount);
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    // console.log("Current User: ", currentUser);
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log("Get current user error: ", error);
    return null;
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    // console.log("All Posts: ", posts.documents)
    return posts.documents;
  } catch (error) {
    console.log("Error getting all posts: ", error);
    throw error;
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    // console.log("Latest Posts: ", posts.documents)
    return posts.documents;
  } catch (error) {
    console.log("Error getting latest posts: ", error);
    throw error;
  }
};

export const searchPost = async (query) => {
  try {
    console.log("Searching for post:", query);
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );
    // console.log("Search Posts: ", posts.documents)
    return posts.documents;
  } catch (error) {
    console.log("Error searching for post: ", error);
    throw error;
  }
};

export const getUserPost = async (userId) => {
  try {
    console.log("Fetching posts for user: ", userId);
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    // console.log("Search Posts: ", posts.documents)
    return posts.documents;
  } catch (error) {
    console.log("Error fetching user's posts: ", error);
    throw error;
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      console.log("Invalid file type: " + type);
    }
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;
  const { mimeType, ...rest } = file;
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  console.log("File: ", file);
  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    console.log("Uploaded: ", uploadedFile);
    const fileUrl = await getFilePreview(uploadedFile?.$id, type);
    return fileUrl;
  } catch (error) {
    console.log("Error uploading video: ", error);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);
    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );
    return newPost;
  } catch (error) {
    console.log("Error creating videos: ", error);
  }
};
