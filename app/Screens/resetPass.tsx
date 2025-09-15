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
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import api from "../utils/api";
export default function ResetPasswordScreen() {
  const { email } = useLocalSearchParams();
  const router = useRouter();

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
const handleReset = async () => {
  if (!newPass || !confirmPass) return Alert.alert("Validation Error", "Please fill both fields.");
  if (newPass !== confirmPass) return Alert.alert("Validation Error", "Passwords do not match.");

  try {
    await api.post("/resetPassword", { email, newPassword: newPass });
    Alert.alert("Success", "Password updated successfully!", [
      { text: "OK", onPress: () => router.replace("/Screens/login") },
    ]);
  } catch (error: any) {
    console.error("Reset error:", error);
    Alert.alert("Error", error?.response?.data?.message || "Failed to reset password.");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        <Text style={{ color: "#5a5dff" }}>Qui</Text>
        <Text style={{ color: "#5a5dff" }}>zio</Text>
      </Text>

      <Text style={styles.heading}>Reset Password</Text>
      <Text style={styles.subText}>You are resetting the password for:</Text>
      <Text style={styles.emailText}>{email}</Text>

      {/* New Password */}
      <View style={styles.passwordRow}>
        <TextInput
          placeholder="New Password"
          secureTextEntry={!showNew}
          value={newPass}
          onChangeText={setNewPass}
          style={styles.passwordInput}
          underlineColorAndroid="transparent"
          selectionColor="#ff5e9c"
        />
        <TouchableOpacity onPress={() => setShowNew(!showNew)}>
          <Ionicons
            name={showNew ? "eye" : "eye-off"}
            size={22}
            color="#999"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.passwordRow}>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={!showConfirm}
          value={confirmPass}
          onChangeText={setConfirmPass}
          style={styles.passwordInput}
          underlineColorAndroid="transparent"
          selectionColor="#ff5e9c"
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Ionicons
            name={showConfirm ? "eye" : "eye-off"}
            size={22}
            color="#999"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
        <Text style={styles.resetText}>RESET PASSWORD</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/Screens/login")}>
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
    marginBottom: 5,
  },
  emailText: {
    textAlign: "center",
    fontWeight: "700",
    color: "#333",
    marginBottom: 25,
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
