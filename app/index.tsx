import { useEffect } from "react";
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
    rotation.value = withRepeat(withTiming(360, { duration: 3000 }), -1, false);

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

  return (
    // <LinearGradient
    //   colors={["#88b4bd","#b1dbbc", "#add8d5", "#dff2eb"]}
    //   style={styles.container}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 1 }}
    // >
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
          
        </View>
      </Animated.View>
      <View>
        <Text style={[styles.title, { color: colors.text }]}>Welcome to LETME</Text>
        <View style={{ height: 200, width: "100%", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
          <Image source={require('@/assets/images/logo.png')} style={{ width: 300, height: 200, resizeMode: "contain" }} />
        </View>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Let's take control {"\n"} your mental health with us{" "}
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
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 32,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: 'rgb(121, 34, 34)',
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 24,
    fontWeight: "300",
    color: 'rgb(29, 111, 103)',
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Poppins-SemiBold",
  },
  logoContainer: {
    width: 80,
    height: 80,
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
    marginTop: 16,
    backgroundColor: "#b1dbbc",
    paddingVertical: 12,
    paddingHorizontal: 32,
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
