import FeelDock from "@/components/home/howFeelCard";
import { RecommendationCard } from "@/components/home/recommendCard";
import { RemindCarousel } from "@/components/home/remindCard";
import { useTheme } from "@/context/ThemeContext";
import { Bell } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { useFonts } from "expo-font";

const BANNER_HEIGHT = 220;
const HEADER_HEIGHT = 100;
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, BANNER_HEIGHT - HEADER_HEIGHT],
    outputRange: [BANNER_HEIGHT, HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, BANNER_HEIGHT - HEADER_HEIGHT, BANNER_HEIGHT],
    outputRange: [1, 0.8, 0],
    extrapolate: "clamp",
  });

  const sunScale = scrollY.interpolate({
    inputRange: [0, BANNER_HEIGHT - HEADER_HEIGHT],
    outputRange: [1, 0.7],
    extrapolate: "clamp",
  });

  const sunTranslateY = scrollY.interpolate({
    inputRange: [0, BANNER_HEIGHT - HEADER_HEIGHT],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });

  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.Image
          source={{
            uri: "https://i.pinimg.com/736x/27/a7/d2/27a7d2836362067ada5e413de948a5b4.jpg",
          }}
          style={[styles.bannerImage, { opacity: headerOpacity }]}
          resizeMode="cover"
        />
        <View style={styles.headerTopContent}>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Hello, Username</Text>
          <View style={styles.rightHeader}>
            <Animated.Image
              source={require("@/assets/images/sun.png")}
              style={[
                styles.sunImage,
                {
                  transform: [
                    { scale: sunScale },
                    { translateY: sunTranslateY },
                  ],
                },
              ]}
            />
          </View>
        </View>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <View style={styles.container}>
          <FeelDock />
          <View style={styles.separator}>
            <RecommendationCard />
            <RemindCarousel />
          </View>
          <View style={{ height: 100 }} />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAF5",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAF5", // fix lại nền
  },
  separator: {
    paddingHorizontal: 16,
  },
  header: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  bannerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerTopContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: StatusBar.currentHeight || 20,
    paddingHorizontal: 16,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    alignSelf: "flex-end",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    lineHeight: 28,
    paddingBottom: 4,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sunImage: {
    width: 150,
    height: 150,
    marginRight: 8,
  },
});

export default HomeScreen;
