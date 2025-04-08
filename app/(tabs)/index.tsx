import FeelDock from "@/components/home/howFeelCard";
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
const BANNER_HEIGHT = 220; // Max height of banner
const HEADER_HEIGHT = 100; // Minimum height when collapsed
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HomeScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Calculate animated values
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

  const titleScale = scrollY.interpolate({
    inputRange: [0, BANNER_HEIGHT - HEADER_HEIGHT],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, BANNER_HEIGHT - HEADER_HEIGHT],
    outputRange: [0, -10],
    extrapolate: "clamp",
  });

  

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Collapsible Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.Image
          source={require("@/assets/images/home_banner.jpg")}
          style={[styles.bannerImage, { opacity: headerOpacity }]}
          resizeMode="cover"
        />
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
        {/* Header Content */}
        <View style={styles.headerContent}>
          <Animated.Text
            style={[
              styles.welcomeText,
              {
                transform: [
                  { scale: titleScale },
                  { translateY: titleTranslateY },
                ],
              },
            ]}
          >
            Hello, Username
          </Animated.Text>

          <View style={styles.rightHeader}>
            <Image
              source={require("@/assets/images/sun.png")}
              style={styles.sunImage}
            />
          </View>
        </View>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Search bar */}
        {/* <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search camp site..."
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filters</Text>
          </TouchableOpacity>
        </View> */}
        <FeelDock />

        <View style={styles.separator}>
        {/* Recommendation */}
        <RecommendationCard />

        {/* Remind */}
        <RemindCarousel />
        </View>

        {/* Extra padding at bottom for better scrolling experience */}
        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAF5",
  },
  contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: -10,
  },
  headerTopContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  separator: {
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
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
    width: SCREEN_WIDTH,
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight + 10,
    justifyContent: "space-between",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
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

  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    lineHeight: 28, // đảm bảo cân đối chiều cao chữ
    paddingBottom: 4, // chỉnh nhẹ để khớp icon
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: 30,
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    alignSelf: "flex-end",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterButton: {
    backgroundColor: "#E8F0E3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  filterButtonText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  
});

export default HomeScreen;
