import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";

const arrbutton = [
  { id: 1, name: "Videos" },
  { id: 2, name: "Information" },
];

const App = () => {
  const [searching, setSearching] = useState("");
  const [selectedId, setSelectedId] = useState(1);

  const [videos, setVideos] = useState([]);
  const [information, setInformation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const videoRes = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGJlZjk2MGM0ZmZhNDU4MTI0N2JiMzM5OGY1NGM1ZSIsIm5iZiI6MTc1MTM1OTQxNy44ODMwMDAxLCJzdWIiOiI2ODYzOWZiOWQ2ZTg3MGNkM2RjY2Q5NzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jPbmLAK5whMqCoLU9kf2w4VUnGJEs6i8hVmHncGf2rc",
            },
          }
        );
        setVideos(videoRes.data.results);

        const infoRes = await axios.get(
          "https://opentdb.com/api.php?amount=10&type=multiple"
        );
        setInformation(infoRes.data.results);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getContentToDisplay = () => {
    if (selectedId === 1) return videos;
    if (selectedId === 2) return information;
    return [];
  };

  const filteredContent = getContentToDisplay().filter((item) => {
    const title = item.original_title || item.title || item.question || "";
    return title.toLowerCase().includes(searching.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <View style={styles.searchBox}>
          <FontAwesome
            name="search"
            size={20}
            color="#7965C1"
            style={styles.icon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searching}
            onChangeText={setSearching}
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttons}
      >
        {arrbutton.map((button) => (
          <TouchableOpacity
            key={button.id}
            style={[
              styles.button,
              selectedId === button.id && styles.selectedButton,
            ]}
            onPress={() => setSelectedId(button.id)}
          >
            <Text
              style={{
                color: selectedId === button.id ? "#000" : "#000",
                textAlign: "center",
              }}
            >
              {button.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#7965C1" />
        </View>
      ) : (
        <ScrollView>
          {filteredContent.map((item, index) => (
            <View key={index} style={styles.item}>
              {item.poster_path && (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={styles.poster}
                />
              )}
              <Text style={styles.title}>
                {item.original_title || item.title || item.question}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFF2E0",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 50,
  },
  button: {
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 15,
    marginRight: 10,
    width: 140,
    height: 40,
    marginBottom: 20,
  },
  selectedButton: {
    backgroundColor: "#C0C9EE",
  },
  loading: {
    flex: 1,
  },
  item: {
    marginBottom: 20,
  },
  poster: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
