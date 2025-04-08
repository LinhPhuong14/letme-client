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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

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
          <Mail size={20} color="#3c707b" />
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
          <Lock size={20} color="#3c707b" />
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
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

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <Link href="/register" style={styles.registerLink}>
            Sign Up
          </Link>
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
    backgroundColor: "#dff2eb",
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
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
    color: "#3c707b",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#d6d6d6",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "Inter-Regular",
    fontSize: 16,
  },
  rememberContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    fontFamily: "Inter-Regular",
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
    backgroundColor: "#b1dbbc",
    padding: 13,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
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
    fontFamily: "Inter-Regular",
    color: "#666",
  },
  registerLink: {
    fontFamily: "Inter-SemiBold",
    color: "#88b4bd",
  },
});
