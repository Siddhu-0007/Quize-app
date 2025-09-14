import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUserLoggedIn = async (user: object) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem("user");
  return value !== null;
};

export const getLoggedInUser = async () => {
  const value = await AsyncStorage.getItem("user");
  return value ? JSON.parse(value) : null;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("user");
};
