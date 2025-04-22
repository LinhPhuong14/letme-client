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
    "Montserrat-Bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const handleLogin = () => {
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={require("@/assets/images/login.png")}
          style={styles.bannerImage}
        />
      </View>
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
          <Text style={styles.rememberText}>Remember me</Text>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            style={styles.checkbox}
            color={isChecked ? "#000" : undefined}
          />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(193, 226, 179)",
  },
  banner: {
    height: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  formContainer: {
    backgroundColor: "rgb(193, 226, 179)",
    padding: 16,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 30,
    marginBottom: 10,
    textAlign: "center",
    color: "#70A6AB",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.13)",
    borderRadius: 30,
    marginBottom: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    color:"rgb(155, 222, 164)",
    textAlign: "center",
  },
  rememberContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  rememberText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: "#47684D",
    marginRight: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: "#47684D",
  },
  loginButton: {
    backgroundColor: "rgb(190, 214, 142)",
    padding: 4,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
    width: "90%"
  },
  loginButtonText: {
    color: "#FCFFDA",
    fontSize: 28,
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
    marginHorizontal: 20,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  registerText: {
    fontFamily: "Montserrat-Regular",
    color: "#475535",
  },
  registerLink: {
    fontFamily: "Montserrat-Bold",
    color: "#708951",
  },
});
