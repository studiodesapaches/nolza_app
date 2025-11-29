import { useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PostHogProvider } from 'posthog-react-native'
import { Stack, usePathname } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter'
import SplashScreen from './SplashScreen'
import { getCurrentSessionId, posthogClient, startNewSession, trackEvent } from '@/lib/analytics'
import { ErrorBoundary } from '@/src/components/ErrorBoundary'

const INSTALL_FLAG_KEY = 'nolza_has_installed'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  })

  const posthogApiKey = process.env.EXPO_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com'
  const isPostHogEnabled = Boolean(posthogApiKey)

  const appState = useRef<AppStateStatus>(AppState.currentState)
  const sessionStartTimestamp = useRef<number | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#000000').catch((error) => {
      console.warn('[ui] Failed to set system UI background color', error)
    })
  }, [])

  useEffect(() => {
    const markInstalled = async () => {
      try {
        const hasInstalled = await AsyncStorage.getItem(INSTALL_FLAG_KEY)
        if (!hasInstalled) {
          trackEvent('app_installed')
          await AsyncStorage.setItem(INSTALL_FLAG_KEY, 'true')
        }
      } catch (error) {
        console.warn('[analytics] Failed to mark install flag', error)
      }
    }

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      const prevState = appState.current
      appState.current = nextAppState

      if (nextAppState === 'active') {
        sessionStartTimestamp.current = Date.now()
        startNewSession()
        trackEvent('session_started')
        trackEvent('app_opened', { entry_point: 'app_launch' })
        return
      }

      if (
        prevState === 'active' &&
        (nextAppState === 'background' || nextAppState === 'inactive')
      ) {
        trackEvent('app_backgrounded')

        const durationSeconds =
          sessionStartTimestamp.current != null
            ? Math.max(0, Math.round((Date.now() - sessionStartTimestamp.current) / 1000))
            : 0

        trackEvent('session_ended', {
          session_id: getCurrentSessionId(),
          session_duration_seconds: durationSeconds,
          games_viewed_count: 0,
          shuffle_used_count: 0,
        })
      }
    }

    markInstalled()

    const subscription = AppState.addEventListener('change', handleAppStateChange)
    handleAppStateChange(appState.current)

    return () => {
      subscription.remove()
    }
  }, [])

  // Keep UI consistent while fonts load.
  if (!fontsLoaded) {
    return <SplashScreen />
  }

  const appContent = (
    <ErrorBoundary screenName={pathname}>
      <StatusBar style="light" backgroundColor="#000" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
          contentStyle: { backgroundColor: '#000' },
        }}
      >
        <Stack.Screen name="game-library" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="game-library/[slug]" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="guidelines" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </ErrorBoundary>
  )

  if (!isPostHogEnabled) {
    console.warn('[analytics] PostHog API key missing; rendering without analytics provider')
    return appContent
  }

  return (
    <PostHogProvider
      client={posthogClient ?? undefined}
      apiKey={posthogApiKey}
      options={{
        host: posthogHost,
        enableSessionReplay: true,
      }}
      autocapture
    >
      {appContent}
    </PostHogProvider>
  )
}
