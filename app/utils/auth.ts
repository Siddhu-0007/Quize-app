// utils/auth.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUserLoggedIn = async (user: any) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("isLoggedIn", "true");
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

export const getUserLoggedIn = async () => {
  try {
    const data = await AsyncStorage.getItem("user");
    if (data) return JSON.parse(data);
    return null;
  } catch (error) {
    console.error("Error reading user:", error);
    return null;
  }
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem("user");
  return value !== null;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("user");
};
