import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function AuthLayout() {

  const [loaded] = useFonts({
    "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      {/* <Stack.Screen name="register" /> */}
    </Stack>
  );
}