import { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const SPACING = 16;

const reminders = [
  {
    id: 1,
    title: "Team Meeting",
    time: "10:00 AM",
    type: "meeting",
  },
  {
    id: 2,
    title: "Mindfulness Workshop",
    time: "2:00 PM",
    type: "workshop",
  },
  {
    id: 3,
    title: "Project Review",
    time: "4:00 PM",
    type: "meeting",
  },
];

export function RemindCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors } = useTheme();

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + SPACING));
    setActiveIndex(index);
  };

  const popularCamps = [
    {
      id: 1,
      title: "Taking Therapy session",
      description: "Mentor: Colorado",
      date: "May 15, 2023",
      category: "meeting",
      image: require("@/assets/images/home_banner.jpg"),
    },
    {
      id: 2,
      title: "Finding inside child",
      description: "Place: Lake Tahoe",
      date: "June 10, 2023",
      category: "workshop",
      image: require("@/assets/images/home_banner.jpg"),
    },
    // Thêm các camp khác ở đây nếu cần
  ];
  return (
    <View style={styles.popularSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Remind</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Remind items would go here */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.popularScrollView}
      >
        {popularCamps.map((item) => (
          <View key={item.id} style={styles.popularCard}>
            <View style={styles.imageWrapper}>
              <Image
                source={item.image}
                style={styles.popularImage}
                resizeMode="cover"
              />
              <View style={[styles.badge, { backgroundColor: item.category === "meeting" ? "#e1805c" : "#add8d5" }]}>
                <Text style={styles.badgeText}>{item.category}</Text>
              </View>
              <View style={styles.popularCardContent}>
                <Text style={styles.popularTitle}>{item.title}</Text>
                <Text style={styles.popularLocation}>{item.description}</Text>
                <View style={styles.popularRating}>
                  <Text style={styles.ratingText}>{item.date} </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  popularRating:{
    flexDirection: "row",
  },
  ratingText: {
    fontSize: 12,
    color: "#425280",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#425280",
  },
  popularSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 16,
  },
  seeAllText: {
    color: "#88b4bd",
    fontWeight: "600",
  },
  popularScrollView: {
    marginLeft: -10,
  },
  popularCard: {
    width: 250,
    marginRight: 16,
    marginLeft: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  imageWrapper: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
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
});
