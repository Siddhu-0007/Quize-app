import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { isUserLoggedIn } from "./utils/auth";

export default function SplashScreen() {
  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await isUserLoggedIn();
      if (loggedIn) {
        router.replace("/(tabs)/Home"); // go to Home
      } else {
        router.replace("/Screens/login"); // go to login
      }
    };
    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#ff5e9c" />
    </View>
  );
}
