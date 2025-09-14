import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,Image,
  Touchable
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
export default function QuizPage() {
  const [selected, setSelected] = useState("All");
  const router = useRouter();
const categories = [
  {
    id: 1,
    name: "Sport",
    image: require("@/assets/images/image.png"),
    api: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dsports&psig=AOvVaw0JgLEQXKeM3cBAJWDH-1af&ust=1757970931202000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDZia2W2Y8DFQAAAAAdAAAAABAE"
  },
  {
    id: 2,
    name: "GK",
    image: require("@/assets/images/image.png"),
    api: "https://opentdb.com/api.php?amount=10&category=9"
  },
  {
    id: 3,
    name: "Politics",
    image: require("@/assets/images/image.png"),
    api: "https://opentdb.com/api.php?amount=10&category=24"
  },
  {
    id: 4,
    name: "Educational",
    image: require("@/assets/images/image.png"),
    api: "https://opentdb.com/api.php?amount=10&category=18"
  },
  {
    id: 5,
    name: "Science",
    image: require("@/assets/images/image.png"),
    api: "https://opentdb.com/api.php?amount=10&category=17"
  },
  {
    id: 6,
    name: "Maths",
    image: require("@/assets/images/image.png"),
    api: "https://opentdb.com/api.php?amount=10&category=19"
  },
];



const handleCategoryPress = (category:any) => {
  router.push({
    pathname: '/Screens/welcome',
    params: {
      api: category.api,
    },
  });
};
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Title */}
        {/* <Text style={styles.title}>Quiz</Text> */}

        {/* Search Bar with Icon */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#555" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#888"
          />
        </View>

        {/* Sort Buttons */}


        

<View style={styles.cardsContainer}>
  {categories.map((category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.card}
      onPress={() => handleCategoryPress(category)}
    >

<Image
  source={require("@/assets/images/image.png")}
  style={{ width: 100, height: 100 ,alignSelf:"center"}}
/>
      <View>
        <Text>{category.name}</Text>
      </View>
    </TouchableOpacity>
  ))}
</View>


       

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10
  },
  container: {

  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    backgroundColor: "#465bb9",
    color: "#fff",
    paddingVertical: 12,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    height: 40,
    marginBottom: 10
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#465bb9",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonText: {
    color: "#465bb9",
    fontSize: 14,
    fontWeight: "600",
  },
  activeButton: {
    backgroundColor: "#465bb9",
  },
  activeButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 20,
  },
  card: {
    width: "48%",
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#f2f2f2",
    padding:10,
  },

   cardImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 10,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  quizSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  quizProgress: {
    fontSize: 14,
    fontWeight: "600",
    color: "#465bb9",
  },
  quizDifficulty: {
    fontSize: 14,
    fontWeight: "600",
    color: "red",
  },
});
