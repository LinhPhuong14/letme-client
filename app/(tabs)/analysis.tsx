import { RecommendationCard } from "@/components/home/recommendCard";
import { RemindCarousel } from "@/components/home/remindCard";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useTheme } from "@/context/ThemeContext";
import { Bell, Moon, Sun, Search } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
const BANNER_HEIGHT = 220; // Max height of banner
const HEADER_HEIGHT = 100; // Minimum height when collapsed
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HomeScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerOverlay}>
          <View style={styles.headerTopContent}>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.iconButton}>
                <Bell size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
                {isDark ? (
                  <Sun size={24} color="#fff" />
                ) : (
                  <Moon size={24} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.progress}>
        <AnimatedCircularProgress
          size={150}
          width={10}
          fill={75} // phần trăm progress (0 - 100)
          tintColor="#88b4bd"
          backgroundColor="#E0E0E0"
          rotation={0}
          lineCap="round"
        >
          {(fill) => (
            <Text style={styles.progressText}>{`${Math.round(fill)}%`}</Text>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={styles.card}>
        </View>

      {/* Main Content */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#dff2eb",
  },
  progressText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAF5",
    paddingHorizontal: 16,
  },
  card:{

  },

  header: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    height: 200,
  },
  progress: {
    position: "absolute",
    top: 100,
    borderRadius: 100,
    backgroundColor: "#d2e0fd",
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
    backgroundColor: "#88b4bd",
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight + 10,
    justifyContent: "space-between",
  },
  headerTopContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default HomeScreen;
