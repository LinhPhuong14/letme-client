import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Link, router } from "expo-router";
import { Mail, Lock } from "lucide-react-native";
import Checkbox from "expo-checkbox";
import { useFonts } from "expo-font";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [loaded] = useFonts({
    "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const handleLogin = () => {
    router.replace("/(tabs)");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/54/be/81/54be8138a55576df3c199707d89c4453.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome back!</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.rememberContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            style={styles.checkbox}
            color={isChecked ? "#000" : undefined}
          />
          <Text style={styles.rememberText}>Remember me</Text>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <Link href="/register" style={styles.registerLink}>
            Sign Up
          </Link>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <Image
            source={{
              uri: "https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png",
            }}
            style={styles.socialIcon}
          />
          <Image
            source={{
              uri: "https://onlineforms.in/wp-content/uploads/2021/08/facebook.png",
            }}
            style={styles.socialIcon}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(166, 252, 177, 0.32)", // overlay mờ nếu muốn
  },
  formContainer: {
    backgroundColor: "rgb(193, 226, 179)",
    padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
    color: "#70A6AB",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.23)",
    borderRadius: 30,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#d6d6d6",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color: "#B2D5B7",
    textAlign: "center",
  },
  rememberContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#88b4bd",
  },
  loginButton: {
    backgroundColor: "rgb(190, 214, 142)",
    padding: 8,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#FCFFDA",
    fontSize: 30,
    fontFamily: "Montserrat-Bold",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  socialIcon: {
    width: 32,
    height: 32,
    marginHorizontal: 8,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    fontFamily: "Montserrat-Regular",
    color: "#666",
  },
  registerLink: {
    fontFamily: "Inter-SemiBold",
    color: "#88b4bd",
  },
});
