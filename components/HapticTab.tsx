"use client"

import type React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import * as Haptics from "expo-haptics"
import { useTheme } from "@/context/ThemeContext"

interface HapticTabProps {
  isFocused: boolean
  onPress: () => void
  label: string
  icon: React.ReactNode
}

export const HapticTab = ({ isFocused, onPress, label, icon }: HapticTabProps) => {
  const { colors } = useTheme()

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onPress()
  }

  return (
    <Pressable onPress={handlePress} style={[styles.tabContainer, isFocused && styles.activeTab]}>
      <View >{icon}</View>
      {isFocused && <Text style={[styles.label, { color: "#47684D" }]}>{label}</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    height: 40,
  },
  activeTab: {
    transform: [{ translateY: 5 }], // Move active tab slightly down into the dent
  },

  label: {
    fontSize: 10,
    fontFamily: "Inter-Medium",
  },
})

