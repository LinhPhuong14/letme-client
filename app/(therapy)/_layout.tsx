import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function Layout() {

  const [font] = useFonts({
    "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ headerShown: false }} name="experts" />
      <Stack.Screen options={{ headerShown: false }} name="focus" />
      <Stack.Screen options={{ headerShown: false }} name="therapy" />
    </Stack>
  );
}