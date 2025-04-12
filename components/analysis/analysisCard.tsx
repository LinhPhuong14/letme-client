import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";

export function AnalysisCard() {
  return (
    <View style={styles.container}>
      <View style={styles.cloudContainer}>
        <Svg width={150} height={150} viewBox="0 0 64 64" fill="none">
          <Path
            d="M48.6 26.6C47.1 19.6 41 14.4 34 14.4c-5.1 0-9.6 2.7-12.1 6.7C15.9 21.7 12 26.5 12 32c0 6.6 5.4 12 12 12h23c6.1 0 11-4.9 11-11 0-5.3-3.7-9.8-8.4-10.4z"
            fill="#add8d5"
            opacity={1}
          />
        </Svg>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Let check your emotion</Text>

        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/(analysis)/video");
            }}
          >
            <Text style={styles.buttonText}>Video Analysis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/(analysis)/audio");
            }}
          >
            <Text style={styles.buttonText}>Voice Analysis</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    height: 400,

    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
  },

  subContainer: {
    backgroundColor: "#add8d5",
    padding: 20,
    top: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginVertical: 8,
    height: 250, // hoặc auto + minHeight tuỳ ý
    justifyContent: "space-between",
  },
  cloudContainer: {
    position: "absolute",
    top: -20,
    right: 10,
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    fontWeight: "bold", 
    color: "#fff",
  },
  footerButtons: {
    marginTop: 16,
    gap: 10,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "100%",
  },
  buttonText: {
    fontFamily: "Inter-SemiBold",
    color: "#88b4bd",
    textAlign: "center",
    fontSize: 18,
  },
});
