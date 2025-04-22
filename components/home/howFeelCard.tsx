import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // hoặc dùng icon khác tùy bạn

const feel = [
  {
    id: 1,
    title: "Sad",
    name: "sad",
    image: require("@/assets/images/home_banner.jpg"),
  },
  {
    id: 2,
    title: "Happy",
    name: "happy",
    image: require("@/assets/images/home_banner.jpg"),
  },
  {
    id: 3,
    title: "Excited",
    name: "excited",
    image: require("@/assets/images/home_banner.jpg"),
  },
  {
    id: 4,
    title: "Angry",
    name: "angry",
    image: require("@/assets/images/home_banner.jpg"),
  },
  {
    id: 5,
    title: "Relaxed",
    name: "relaxed",
    image: require("@/assets/images/home_banner.jpg"),
  },
];
export default function FeelDock() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10, color: "#425280"}}>How are you feel today?</Text>
      <View style={styles.dockContainer}>
        {feel.map((item) => (
          <TouchableOpacity key={item.id} style={styles.dockItem}>
            <Ionicons name={item.name} size={24} color="#88b4bd" />
            <Text style={styles.dockText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
  dockContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    width: "100%",
    marginBottom: 20,
  },
  dockItem: {
    alignItems: "center",
  },
  dockText: {
    fontSize: 12,
    color: "#333",
    marginTop: 4,
  },
});
