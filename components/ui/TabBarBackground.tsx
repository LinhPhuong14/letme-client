"use client"

import type React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "@/context/ThemeContext"

const TabBarBackground = ({ children }: { children: React.ReactNode }) => {
  const { colors, isDark } = useTheme()
  const { width } = Dimensions.get("window")

  const backgroundColor = isDark ? "#88b4bd" : "#dff2eb" 

  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#97B19B",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  background: {
    position: "absolute",
    bottom: 0,
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
})

export default TabBarBackground

