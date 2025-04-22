import { RecommendationCard } from "@/components/home/recommendCard";
import { RemindCarousel } from "@/components/home/remindCard";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import { Bell, Moon, Sun, Search, Icon, PlayIcon } from "lucide-react-native";
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

const TherapyScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color={colors.headerBg} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
                {isDark ? (
                  <Sun size={24} color="#fff" />
                ) : (
                  <Moon size={24} color="#fff" />
                )}
              </TouchableOpacity> */}
        </View>
      </View>

      {/* Main Content */}

      <View style={styles.container}>
        {/* Randomly Quotes */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>Quotes</Text>
          <TouchableOpacity style={styles.quoteButton}>
            <Text style={styles.quoteButtonText}>View report</Text>
          </TouchableOpacity>
        </View>

        {/* Category Section */}
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.categoryItem}
          onPress={() => {router.push("/(therapy)/experts")}}>
            <Image
              source={{
                uri: "https://i.pinimg.com/474x/5c/58/f4/5c58f49f4c624ad5c2d37d750a484657.jpg",
              }}
              style={styles.categoryImage}
              resizeMode="contain"
            />
            <Text
              style={{
                color: colors.text,
                fontSize: 12,
                marginTop: 5,
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "Montserrat-Regular",
              }}
            >
              Experts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem} onPress={() => {router.push("/(therapy)/focus")}}>
            <Image
              source={{
                uri: "https://i.pinimg.com/474x/f0/5a/b7/f05ab7a44dfe8a37ab969e0781147e81.jpg",
              }}
              style={styles.categoryImage}
              resizeMode="contain"
            />
            <Text
              style={{
                color: colors.text,
                fontSize: 12,
                marginTop: 5,
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "Montserrat-Regular",
              }}
            >
              Focus
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}
          onPress={() => {router.push("/(therapy)/sound")}}>
            <Image
              source={{
                uri: "https://i.pinimg.com/474x/f3/cc/9d/f3cc9d0b13edfe8eaee3b6b0be96ab46.jpg",
              }}
              style={styles.categoryImage}
              resizeMode="contain"
            />
            <Text
              style={{
                color: colors.text,
                fontSize: 12,
                marginTop: 5,
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "Montserrat-Regular",
              }}
            >
              Sound
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recommended Activities */}
        <View>
          <Text style={styles.sectionTitle}>Recommended Activities</Text>
          <TouchableOpacity style={styles.recommendedActivity}>
            <Text style={styles.activityTitle}>Meditate</Text>
            <Text style={styles.activityDuration}>15m</Text>

            <PlayIcon size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.recommendedActivity}>
            <Text style={styles.activityTitle}>Meditate</Text>
            <Text style={styles.activityDuration}>15m</Text>

            <PlayIcon size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.recommendedActivity}>
            <Text style={styles.activityTitle}>Meditate</Text>
            <Text style={styles.activityDuration}>15m</Text>

            <PlayIcon size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Upcoming sessions */}
        <View style={styles.popularSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your upcoming sessions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Session */}
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
               
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      

      {/* Extra padding at bottom for better scrolling experience */}
      <View style={{ height: 50 }} />
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
    paddingHorizontal: 20,
  },
  header: {
    position: "relative",
    width: "100%",
    height: 80,
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    // justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  quoteContainer: {
    backgroundColor: "#FAF2DB",
    borderRadius: 23,
    height: 100,
  },
  quoteText: {
    fontSize: 24,
    paddingHorizontal: 20,
    paddingVertical: 6,
    fontWeight: "bold",
    color: "#70A6AB",
  },
  quoteButton: {
    backgroundColor: "#FDC9A4",
    borderRadius: 23,
    height: 37,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginHorizontal: 15,
    width: 134,
  },
  quoteButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
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
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
    marginBottom: 12,
    marginLeft: 5,
    color: "#CC7232",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryImage: {
    borderRadius: 50,
    width: 80,
    height: 80,
  },
  recommendedActivity: {
    backgroundColor: "#C5D8A0",
    borderRadius: 16,
    width: "100%",
    height: 35,
    overflow: "hidden",
    flexDirection: "row",
    color: "#fff",
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 8,
  },
  activityTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  activityDuration: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
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
    width: 150,
    height: 180,
    backgroundColor: "#C5D8A0",
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 10,
  },
  popularImage: {
    width: "100%",
    height: 125,
  },
  popularCardContent: {
    padding: 12,
  },
  popularTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },
  popularLocation: {
    fontSize: 10,
    color: "#666",
    marginBottom: 6,
  },
  
});

export default TherapyScreen;
