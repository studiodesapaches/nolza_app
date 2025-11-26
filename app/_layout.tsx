import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter'
import SplashScreen from './SplashScreen'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  })

  // Keep UI consistent while fonts load.
  if (!fontsLoaded) {
    return <SplashScreen />
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#000" />
      <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="game-library" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="game-library/[slug]" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="guidelines" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </>
  )
}
