import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Permission,
  Role,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aubynsamuel.aora",
  projectId: "674be03d003bb2502178",
  databaseId: "674be1f1002003ccf782",
  userCollectionId: "674e2ad6002b651c09fa",
  videoCollectionId: "674be261001907112d58",
  storageId: "674be40b0020accc1539",
};

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

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
      }
      ,
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
    console.log("Current Account: ", currentAccount);
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    console.log("Current User: ", currentUser);
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log("Get current user error: ", error);
    return null;
  }
};
