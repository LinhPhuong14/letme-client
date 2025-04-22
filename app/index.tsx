import { useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  withSequence,
} from "react-native-reanimated";


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

    
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    };
  });

  

  return (
    // <LinearGradient
    //   colors={["#88b4bd","#b1dbbc", "#add8d5", "#dff2eb"]}
    //   style={styles.container}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 1 }}
    // >
    <View style={styles.container}>
      
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
      // onPress={() => router.push("/(analysis)/video")}
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
    fontSize: 32,
    marginBottom: 16,
    textAlign: "center",
    color: 'rgb(114, 169, 158)',
  },
  subtitle: {
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
