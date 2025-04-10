import { useEffect } from "react";
import { useFonts } from "expo-font";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react-native";

export default function SplashScreen() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {

    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );

    // const timer = setTimeout(() => {
    //   router.replace('/login');
    // }, 3000);

    // return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    };
  });

  const { isDark, toggleTheme, colors } = useTheme();

  const [fontsLoaded] = useFonts({
    "Montserrat": require("@/assets/fonts/Montserrat-VariableFont_wght.ttf"),
    "InknutAntiqua-Regular": require("@/assets/fonts/InknutAntiqua-Regular.ttf"),
    "Montserrat-Bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
  });

  return (
    // <LinearGradient
    //   colors={["#88b4bd","#b1dbbc", "#add8d5", "#dff2eb"]}
    //   style={styles.container}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 1 }}
    // >
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
          {isDark ? (
            <Sun size={24} color={"#8991a9"} />
          ) : (
            <Moon size={24} color={"#8991a9"} />
          )}
        </TouchableOpacity>
      </View> */}
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        <View style={styles.logo}>
          <Image source={require("@/assets/images/logo.png")} style={{width: 60, height: 60, justifyContent: "center", alignItems: "center"}} />
        </View>
      </Animated.View>
      <View>
        <Text style={styles.title}>Welcome to LETME</Text>
        <View style={{ height: 300, width: "100%", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
          <Image source={require('@/assets/images/splash_image.png')} style={{ width: 330, height: 500, resizeMode: "contain" }} />
        </View>
        <Text style={styles.subtitle}>
          Let's take control your {"\n"} mental health with us{" "}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/(auth)/login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(193, 226, 179)",
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 32,
    marginBottom: 16,
    textAlign: "center",
    color: 'rgb(114, 169, 158)',
  },
  subtitle: {
    fontFamily: "Montserrat-Regular",
    fontSize: 20,
    color: 'rgb(36, 122, 99)',
    textAlign: "center",
  },
  buttonText: {
    color: "rgb(252,251,184)",
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
  },
  logoContainer: {
    width: 80,
    height: 80,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "white",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
    paddingTop: 48,
  },
  button: {
    borderRadius: 30,
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "rgb(193, 213, 151)",
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "85%",
  },
  iconButton: {
    padding: 8,
    marginLeft: 16,
  },
  logo: {
    width: 60,
    height: 60,
    backgroundColor: "#add8d5",
    borderRadius: 40,
  },
});
