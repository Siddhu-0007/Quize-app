import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,

} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { setUserLoggedIn } from "../utils/auth";
import api from "../utils/api";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

 const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Validation", "Please enter both email and password");
    return;
  }

  try {
    const res = await api.post("/login", { email, password });

    if (res.data.success) {
      await setUserLoggedIn(res.data.user);
      Alert.alert("Login Successful", `Welcome ${res.data.user}`);
      router.push("/(tabs)/Home");
    } else {
      Alert.alert("Login Failed", res.data.message || "Invalid credentials");
    }
  } catch (error: any) {
    console.error("Login error:", error);
    Alert.alert(
      "Error",
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        <Text style={{ color: "#5a5dff" }}>Qui</Text>
        <Text style={{ color: "#5a5dff" }}>zio</Text>
      </Text>

      <View style={styles.form}>
        {/* Email Input */}
        <TextInput
          placeholder="Email"
          style={styles.input}
          underlineColorAndroid="transparent"
          selectionColor="#ff5e9c"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password with Eye Icon */}
        <View style={styles.passwordRow}>
          <TextInput
            placeholder="Type Password"
            secureTextEntry={!showPass}
            style={styles.passwordInput}
            underlineColorAndroid="transparent"
            selectionColor="#ff5e9c"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Ionicons
              name={showPass ? "eye" : "eye-off"}
              size={22}
              color="#999"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInBtn} onPress={handleLogin}>
          <Text style={styles.signInText}>SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("./forgetPass")}>
          <Text style={styles.forgot}>forgot password?</Text>
        </TouchableOpacity>

        {/* Bottom text */}
        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => router.push("./signIn")}>
            <Text style={styles.link}>Register here</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  form: { marginTop: 10 },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#ff5e9c",
    marginBottom: 25,
    fontSize: 16,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
    outlineStyle: "none",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "#ff5e9c",
    marginBottom: 25,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
    outlineStyle: "none",
  },
  signInBtn: {
    backgroundColor: "#ff5e9c",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
  },
  signInText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  forgot: {
    textAlign: "center",
    color: "#888",
    marginBottom: 20,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: { textAlign: "center", color: "#555" },
  link: { color: "#5a5dff", fontWeight: "600" },
});
