import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import api from "../utils/api";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

 const handleRecovery = async () => {
  if (!email) return Alert.alert("Validation Error", "Please enter your email.");

  try {
    const response = await api.post("/checkEmail", { email });

    if (response.data.exists) {
      Alert.alert("Success", "Email found. Proceeding to reset...");
      router.push({ pathname: "/Screens/resetPass", params: { email } });
    } else {
      Alert.alert("Error", "Email not found in our records.");
    }
  } catch (error: any) {
    console.error("Error checking email:", error);
    Alert.alert(
      "Server Error",
      error?.response?.data?.message || "Something went wrong."
    );
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        <Text style={{ color: "#5a5dff" }}>Qui</Text>
        <Text style={{ color: "#5a5dff" }}>zio</Text>
      </Text>

      <Text style={styles.heading}>Forgot Password</Text>
      <Text style={styles.subText}>
        Enter your registered email to reset your password
      </Text>

      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        underlineColorAndroid="transparent"
        selectionColor="#ff5e9c"
      />

      <TouchableOpacity style={styles.resetBtn} onPress={handleRecovery}>
        <Text style={styles.resetText}>RESET PASSWORD</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/Screens/login")}>
        <Text style={styles.backLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  logo: {
    fontSize: 42,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#ff5e9c",
    marginBottom: 25,
    fontSize: 16,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
    outlineStyle: "none",
  },
  resetBtn: {
    backgroundColor: "#ff5e9c",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 25,
  },
  resetText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  backLogin: {
    textAlign: "center",
    color: "#5a5dff",
    fontWeight: "600",
  },
});
