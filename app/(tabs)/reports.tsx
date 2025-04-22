import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { Bell } from "lucide-react-native";

const ReportsScreen = () => {
  const { colors, toggleTheme, isDark } = useTheme();
  const [selected, setSelected] = useState("2025-08-17");
  const today = new Date().toISOString().split("T")[0];
  return (
    <View style={styles.container}>
      
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
    

      
      <View style={styles.calendarContainer}>
        <Text style={styles.question}>How did you feel that day</Text>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>{today}</Text>
          {/* <Ionicons name="create-outline" size={20} color="#4A784E" style={{ marginLeft: 6 }} /> */}
        </View>

        {/* Calendar */}
        <Calendar
          onDayPress={(day) => setSelected(day.dateString)}
          markedDates={{
            [selected || today]: {
              selected: true,
              selectedColor: "#F4B393",
            },
          }}
          theme={{
            backgroundColor: "#D3E6BD",
            calendarBackground: "#D3E6BD",
            textSectionTitleColor: "#4A784E",
            selectedDayBackgroundColor: "#F4B393",
            selectedDayTextColor: "#fff",
            todayTextColor: "#4A784E",
            dayTextColor: "#4A784E",
            textDisabledColor: "#ccc",
            monthTextColor: "#4A784E",
            arrowColor: "#4A784E",
          }}
          style={styles.calendar}
        />
      </View>
      {/* Report button */}
      <TouchableOpacity style={styles.reportBtn}>
        <Text style={styles.reportText}>Report</Text>
      </TouchableOpacity>

      {/* Graph placeholder */}
      <View style={styles.graphContainer}>
        {[...Array(5)].map((_, i) => (
          <View key={i} style={styles.bar} />
        ))}
      </View>

      {/* Bottom tab */}
      {/* <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={24} color="#60836C" />
        <Ionicons name="infinite-outline" size={24} color="#60836C" />
        <Ionicons name="heart-outline" size={24} color="#60836C" />
        <Ionicons name="calendar" size={24} color="#60836C" />
        <Ionicons name="person-outline" size={24} color="#60836C" />
      </View> */}
    </View>
  );
};

export default ReportsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6E7",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    position: "relative",
    width: "100%",
    // height: 80,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 10,
    // justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 20,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bellIcon: {
    position: "absolute",
    top: 40,
    right: 20,
  },
 calendarContainer:{
  backgroundColor: "#D3E6BD",
  borderRadius: 16,
  padding: 16,
 },
  question: {
    backgroundColor: "#FDF6E7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
    fontSize: 15,
    width: "50%",
    alignContent: "center",
    textAlign: "center",
    color: "#8B4218",
    fontWeight: "600",
    justifyContent: "flex-start"
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dateText: {
    fontSize: 32,
    marginLeft: 6,
    fontWeight: "600",
    color: "#4A784E",
  },
  calendar: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 10,
  },
  reportBtn: {
    backgroundColor: "#FDF6E7",
    alignSelf: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  reportText: {
    color: "#B04A1E",
    fontWeight: "600",
  },
  graphContainer: {
    backgroundColor: "#D3E6BD",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  bar: {
    width: 20,
    height: 80,
    backgroundColor: "#FDF6E7",
    borderRadius: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#E7F0D7",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
