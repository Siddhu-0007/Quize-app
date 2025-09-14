import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from 'expo-router';
export default function Index() {

  const { api } = useLocalSearchParams();

  const router = useRouter();
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Quiz Application</Text>
      </View>


      <View style={styles.page}>
        <View style={styles.body}>
          <Text style={styles.welcomeText}>Welcome to the Quiz App!</Text>
          <Text style={styles.description}>
            This Quiz application check your knownleadge.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push({
                pathname: '/Screens/questions',
                params: {
                  api: api,
                },
              });
            }}
          >

            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF2E0",
    alignItems: "center",
    paddingTop: 60,
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "#7965C1",
    paddingVertical: 20,
    paddingHorizontal: 10,
    zIndex: 10,
    marginTop: 40,
  },
  headerText: {
    fontSize: 24,
    color: "#FFF2E0",
    fontWeight: "bold",
    textAlign: "center",
  },
  page: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 250,
    alignContent: "center",
  },
  body: {
    padding: 25,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4E6C50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF2E0",
    fontSize: 16,
    fontWeight: "bold",
  },
})