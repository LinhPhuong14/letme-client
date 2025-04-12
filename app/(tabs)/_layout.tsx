"use client"

import { Tabs } from "expo-router"
import { HapticTab } from "@/components/HapticTab"
import TabBarBackground from "@/components/ui/TabBarBackground"
import { useTheme } from "@/context/ThemeContext"
import { Home, BarChart2, Heart, FileText, User } from "lucide-react-native"

export default function TabLayout() {
  const { colors } = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 0, // để background custom đảm nhận việc hiển thị
          backgroundColor: "transparent",
          elevation: 0,
          borderTopWidth: 0,
          position: "absolute",
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
      tabBar={(props) => (
        <TabBarBackground>
          {props.state.routes.map((route, index) => {
            const isFocused = props.state.index === index

            const onPress = () => {
              const event = props.navigation.emit({
                type: 'tabPress',
                target: route.key,
              })

              if (!isFocused && !event.defaultPrevented) {
                props.navigation.navigate(route.name)
              }
            }

            let icon = null
            let label = ""

            switch (route.name) {
              case "index":
                icon = <Home size={24} color={isFocused ? colors.primary : colors.secondary} />
                label = "Home"
                break
              case "analysis":
                icon = <BarChart2 size={24} color={isFocused ? colors.primary : colors.secondary} />
                label = "Analysis"
                break
              case "therapy":
                icon = <Heart size={24} color={isFocused ? colors.primary : colors.secondary} />
                label = "Therapy"
                break
              case "reports":
                icon = <FileText size={24} color={isFocused ? colors.primary : colors.secondary} />
                label = "Report"
                break
              case "profile":
                icon = <User size={24} color={isFocused ? colors.primary : colors.secondary} />
                label = "Profile"
                break
            }

            return (
              <HapticTab
                key={route.key}
                isFocused={isFocused}
                onPress={onPress}
                label={label}
                icon={icon}
              />
            )
          })}
        </TabBarBackground>
      )}
    >
      {/* <Tabs.Screen name="index" />
      <Tabs.Screen name="analysis" />
      <Tabs.Screen name="therapy" />
      <Tabs.Screen name="reports" />
      <Tabs.Screen name="profile" /> */}
    </Tabs>
  )
}
