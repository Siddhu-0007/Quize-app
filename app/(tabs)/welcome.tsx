import React from "react";
import { Text, StyleSheet, View, TouchableOpacity ,Image} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router=useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>QUIZY</Text>
      </View>
<View style={styles.page}>
        <View style={styles.body}>
          <Text style={styles.welcomeText}>Welcome to the Quiz App!</Text>
        <Image style={{height:300,width:300}}
         source={{
        uri: "https://lh3.googleusercontent.com/0RNnmYbeY5_gfjbh7ULwc-xraAJYVusjvgpnMsHygjf0CVZBITNiz6athzg3Xg4U4g",
        }}
        />
          <Text style={styles.description}>
            This Quiz application check your knownleadge.
          </Text>

          <TouchableOpacity style={styles.button} onPress={()=>{router.push("./screens/quizScreen")}}>
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
    backgroundColor: "#E3E4FA",
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
  },
 headerText: {
    fontSize: 30,
    color: "#FFF2E0",
    fontWeight: "bold",
    textAlign: "center",
    padding:20
  },
 page: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 100, 
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
    backgroundColor: "#2C497F",
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