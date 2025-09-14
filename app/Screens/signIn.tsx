import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleSignUp = async () => {
    if (!form.userName || !form.email || !form.password || !form.confirmPassword) {
      Alert.alert("Validation", "All fields are required!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert("Validation", "Passwords do not match!");
      return;
    }
    if (!agree) {
      Alert.alert("Validation", "You must agree to terms & conditions");
      return;
    }

    try {
      await axios.post("http://10.206.158.131:5000/api/quiz/create", {
        ...form,
      });

      Alert.alert("Success", "Account created successfully!");
      router.push("/Screens/login");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", "Failed to create account");
    }
  };

  return (
    <View style={styles.container}>
            <Text style={styles.logo}>
        <Text style={{ color: "#5a5dff" }}>Qui</Text>
        <Text style={{ color: "#5a5dff" }}>zio</Text>
      </Text>

      <Text style={styles.heading}>Create New Account</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={form.userName}
        onChangeText={(val) => setForm({ ...form, userName: val })}
        underlineColorAndroid="transparent"
        selectionColor="#ff5e9c"
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={form.email}
        onChangeText={(val) => setForm({ ...form, email: val })}
        underlineColorAndroid="transparent"
        selectionColor="#ff5e9c"
        keyboardType="email-address"
      />

      {/* Password */}
      <View style={styles.passwordRow}>
        <TextInput
          placeholder="Type Password"
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          value={form.password}
          onChangeText={(val) => setForm({ ...form, password: val })}
          selectionColor="#ff5e9c"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={22}
            color="#999"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.passwordRow}>
        <TextInput
          placeholder="Re-enter Password"
          style={styles.passwordInput}
          secureTextEntry={!showConfirmPassword}
          value={form.confirmPassword}
          onChangeText={(val) => setForm({ ...form, confirmPassword: val })}
          selectionColor="#ff5e9c"
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons
            name={showConfirmPassword ? "eye" : "eye-off"}
            size={22}
            color="#999"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>

      {/* Terms & Conditions */}
      <View style={styles.checkboxRow}>
        <Switch
          value={agree}
          onValueChange={setAgree}
          trackColor={{ true: "#ff5e9c", false: "#aaa" }}
          thumbColor={agree ? "#fff" : "#fff"}
        />
        <Text style={styles.terms}> I agree with terms & conditions</Text>
      </View>

      <TouchableOpacity style={styles.registerBtn} onPress={handleSignUp}>
        <Text style={styles.registerText}>REGISTER</Text>
      </TouchableOpacity>

      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/Screens/login")}>
          <Text style={styles.link}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 30 },
    logo: {
    fontSize: 42,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 40,
  },

  heading: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
  },
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  terms: { color: "#555", marginLeft: 8 },
  registerBtn: {
    backgroundColor: "#ff5e9c",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
  },
  registerText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  bottomText: { textAlign: "center", color: "#555" },
  link: { color: "#5a5dff", fontWeight: "600" },
});
