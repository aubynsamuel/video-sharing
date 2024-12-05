import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { StatusBar } from "react-native";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const setUpHome = async () => {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      setIsLoggedIn(true);
      setUser(currentUser);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        for (let i = 1; i <= 5; i++) {
          if (isLoggedIn === false) {
            setTimeout(setUpHome, 3000);
            console.log(`Checking for the ${i}th time`);
          }
        }
      } catch (error) {
        console.error("Error checking current user:", error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkCurrentUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    >
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"#161622"}
      ></StatusBar>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
