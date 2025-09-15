// ProfileWithDrawer.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import api from "../utils/api";
const Drawer = createDrawerNavigator();

// ---------------- Auth Helpers ----------------
const setUserLoggedIn = async (user: any) => {
  await AsyncStorage.setItem("user", JSON.stringify(user));
  await AsyncStorage.setItem("isLoggedIn", "true");
};

const getUserLoggedIn = async () => {
  const data = await AsyncStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

// ---------------- Profile Screen ----------------
const ProfileContent = ({ navigation, route }: any) => {
  const [user, setUser] = useState<any>({
    userName: "",
    email: "",
    address: "",
    school: "",
    image: "",
    _id: "",
  });
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  // Fetch user from backend
const loadUserData = async () => {
  try {
    const loggedUser = await getUserLoggedIn();
    if (!loggedUser) return;

    const res = await api.get(`/getUser/${loggedUser._id}`);
    const data = res.data;
    setUser({
      username: data.userName || data.username,
      email: data.email,
      address: data.address || "",
      school: data.school || "",
      image: data.image || "",
      _id: data._id,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    Alert.alert("Error", "Failed to load user data");
  }
};

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const selectedImage = result.assets[0].uri;
        setUser((prev: any) => ({ ...prev, image: selectedImage }));
      }
    } catch {
      Alert.alert("Error", "Failed to pick image.");
    }
  };

const handleSave = async () => {
  try {
    if (!user._id) return;
    const res = await api.put(`/update/${user._id}`, user);
    if (res.status === 200) {
      Alert.alert("Success", "Profile updated.");
      setEditMode(false);
      await loadUserData();
    } else {
      Alert.alert("Error", "Failed to update profile");
    }
  } catch (err) {
    console.error("Error updating user:", err);
    Alert.alert("Error", "Failed to update profile");
  }
};

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("user");
    router.replace("/Screens/login");
  };

  useEffect(() => {
    loadUserData();

    if (route.params?.edit) {
      setEditMode(true);
      navigation.setParams({ edit: false });
    }

    if (route.params?.logout) {
      handleLogout();
      navigation.setParams({ logout: false });
    }
  }, [route.params]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={28} color="#7965C1" />
        </TouchableOpacity>
        <Text style={styles.headerText}>                 My Profile</Text>
      </View>

      <View style={styles.box}>
        <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
          {user.image ? (
            <Image source={{ uri: user.image }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={{ color: "#888" }}>Choose Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={user.username}
            editable={editMode}
            onChangeText={(text) => setUser({ ...user, username: text })}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput style={[styles.input, styles.disabledInput]} value={user.email} editable={false} />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={user.address}
            editable={editMode}
            onChangeText={(text) => setUser({ ...user, address: text })}
          />

          <Text style={styles.label}>School</Text>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={user.school}
            editable={editMode}
            onChangeText={(text) => setUser({ ...user, school: text })}
          />
        </View>

        {editMode && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

// ---------------- Results Screen ----------------
const ResultsScreen = () => (
  <View style={styles.resultsContainer}>
    <Text style={styles.resultsText}>Your Results Will Appear Here</Text>
  </View>
);

// ---------------- Custom Drawer ----------------
const CustomDrawerContent = (props: any) => (
  <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, paddingTop: 40 }}>
    <DrawerItem
      label="My Profile"
      icon={({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} />}
      onPress={() => props.navigation.navigate("Profile")}
    />
    <DrawerItem
      label="Edit Profile"
      icon={({ color, size }) => <MaterialIcons name="edit" size={size} color={color} />}
      onPress={() => props.navigation.navigate("Profile", { edit: true })}
    />
    <DrawerItem
      label="Results"
      icon={({ color, size }) => <Ionicons name="stats-chart-outline" size={size} color={color} />}
      onPress={() => props.navigation.navigate("Results")}
    />
    <DrawerItem
      label="Logout"
      icon={({ color, size }) => <MaterialIcons name="logout" size={size} color={color} />}
      onPress={() => props.navigation.navigate("Profile", { logout: true })}
    />
  </DrawerContentScrollView>
);

// ---------------- Drawer Navigator ----------------
const ProfileWithDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#ff5e9c",
        drawerLabelStyle: { fontSize: 16, fontWeight: "600" },
        drawerStyle: { width: 200 },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Profile" component={ProfileContent} />
      <Drawer.Screen name="Results" component={ResultsScreen} />
    </Drawer.Navigator>
  );
};

export default ProfileWithDrawer;

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#fff8f9",
  },
  header: {
    position: "absolute",
    top: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerText: { fontSize: 22, fontWeight: "bold", color: "#333", marginLeft: 15 },
  box: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  imageContainer: { marginBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: "#ff5e9c" },
  placeholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: "#eee", alignItems: "center", justifyContent: "center" },
  inputSection: { marginTop: 10, width: "100%" },
  label: { fontSize: 14, color: "#555", marginBottom: 5 },
  input: { height: 50, backgroundColor: "#f1ebebff", borderRadius: 10, paddingHorizontal: 12, marginBottom: 15, fontSize: 16 },
  disabledInput: { color: "black", backgroundColor: "#f1ebebff" },
  saveButton: { backgroundColor: "#7965C1", paddingVertical: 12, borderRadius: 25, marginTop: 20, width: 140, alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  resultsContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff8f9" },
  resultsText: { fontSize: 20, fontWeight: "bold", color: "#333" },
});