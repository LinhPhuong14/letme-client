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

      {/* Main Content */}
      <Animated.ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingTop: 16 }}
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

        {/* Recommendation */}
        <RecommendationCard />

        {/* Popular */}
        <View style={styles.popularSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Popular items would go here */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.popularScrollView}
          >
            <View style={styles.popularCard}>
              <Image
                source={require("@/assets/images/home_banner.jpg")}
                style={styles.popularImage}
                resizeMode="cover"
              />
              <View style={styles.popularCardContent}>
                <Text style={styles.popularTitle}>Mountain View Camp</Text>
                <Text style={styles.popularLocation}>Colorado Springs</Text>
                <View style={styles.popularRating}>
                  <Text style={styles.ratingText}>4.8 ⭐</Text>
                </View>
              </View>
            </View>

            <View style={styles.popularCard}>
              <Image
                source={require("@/assets/images/home_banner.jpg")}
                style={styles.popularImage}
                resizeMode="cover"
              />
              <View style={styles.popularCardContent}>
                <Text style={styles.popularTitle}>Lakeside Camp</Text>
                <Text style={styles.popularLocation}>Lake Tahoe</Text>
                <View style={styles.popularRating}>
                  <Text style={styles.ratingText}>4.7 ⭐</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>


        {/* Extra padding at bottom for better scrolling experience */}
        <View style={{ height: 50 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "rgb(214, 240, 231)",
  },
  container: {
    flex: 1,
    backgroundColor: "#dff2eb",
    paddingHorizontal: 16,
  },
  header: {
    position: "relative",
    width: "100%",
    backgroundColor: "#dff2eb",
    height: 80,
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:"#dff2eb",
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
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  
  iconButton: {
    padding: 8,
    marginLeft: 8,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E8F0E3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    color: "#333",
  },
  popularSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  popularScrollView: {
    marginLeft: -8,
  },
  popularCard: {
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  popularImage: {
    width: "100%",
    height: 150,
  },
  popularCardContent: {
    padding: 12,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  popularLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  popularRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF8C00",
  },

});

export default HomeScreen;
