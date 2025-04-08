import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import FeelDock from "./howFeelCard";
import { router } from "expo-router";

export function RecommendationCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Recommendation</Text>
      <Text style={styles.description}>What's for you today?</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => {router.push("/(tabs)/therapy")}}>
          <Text style={styles.buttonText}>Let's see</Text>
        </TouchableOpacity>
        {/* <Image source={require("@/assets/images/sun.png")} style={{ width: 100, height: 100 }} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#b1dbbc",
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#fff",
    marginBottom: 8,
  },
  description: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: "flex-start",
  },
  buttonText: {
    fontFamily: "Inter-SemiBold",
    color: "#88b4bd",
    fontSize: 14,
  },
});
