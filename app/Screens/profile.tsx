import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const ProfileContent = ({ navigation, route }: any) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    address: "",
    school: "",
    image: "",
  });
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  const loadUserData = async () => {
    const data = await AsyncStorage.getItem("user");
    if (data) setUser(JSON.parse(data));
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
        setUser((prev) => ({ ...prev, image: selectedImage }));
      }
    } catch (err) {
      Alert.alert("Error", "Failed to pick image.");
    }
  };

  const handleSave = async () => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    Alert.alert("Success", "Profile updated.");
    setEditMode(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    Alert.alert("Logged Out", "You have been logged out.");
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.box}>
        <TouchableOpacity
          onPress={handleImagePick}
          style={styles.imageContainer}
        >
          {user.image ? (
            <Image source={{ uri: user.image }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text>Choose Image</Text>
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
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={user.email}
            editable={false}
          />

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
    </View>
  );
};

const ProfileWithDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#4E6C50",
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileContent}
        options={{ drawerLabel: "My Profile" }}
      />
      <Drawer.Screen
        name="Edit Profile"
        component={ProfileContent}
        initialParams={{ edit: true }}
        listeners={({ navigation }) => ({
          drawerItemPress: (e) => {
            e.preventDefault();
            navigation.navigate("Profile", { edit: true });
          },
        })}
      />
      <Drawer.Screen
        name="Logout"
        component={ProfileContent}
        listeners={({ navigation }) => ({
          drawerItemPress: (e) => {
            e.preventDefault();
            navigation.navigate("Profile", { logout: true });
          },
        })}
        options={{ drawerLabel: "Logout" }}
      />
    </Drawer.Navigator>
  );
};

export default ProfileWithDrawer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF2E0",

  },
  menuIcon: {
    fontSize: 20,
    color: "#FFF2E0",
    zIndex: 1,
    left: 10,
    top:4,
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#7965C1",
    paddingVertical: 20,
    marginTop: 40,
    flexDirection: "row",
    gap: 20,
  },
  headerText: {
    fontSize: 24,
    color: "#FFF2E0",
    fontWeight: "bold",
  },
  box: {
    marginTop: 120,
    padding: 20,
  },
  imageContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#7965C1",
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  inputSection: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  disabledInput: {
    backgroundColor: "#C0C9EE",
    color: "#000",
  },
  saveButton: {
    backgroundColor: "#4E6C50",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    left: 150,
    width: 100,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
