import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function TherapyLayout() {

  const [font] = useFonts({
    "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="experts" />
      <Stack.Screen name="focus" />
      <Stack.Screen name="therapy" />
    </Stack>
  );
}