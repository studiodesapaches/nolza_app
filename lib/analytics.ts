import PostHog from 'posthog-react-native'
import Constants from 'expo-constants'
import * as Localization from 'expo-localization'
import { Platform } from 'react-native'

type PostHogClient = InstanceType<typeof PostHog>

const posthogApiKey = process.env.EXPO_PUBLIC_POSTHOG_KEY
const posthogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com'

let currentSessionId: string | null = null

const createPostHogClient = (): PostHogClient | null => {
  if (!posthogApiKey) {
    console.warn('[analytics] PostHog API key is missing; analytics disabled')
    return null
  }

  try {
    return new PostHog(posthogApiKey, {
      host: posthogHost,
      enableSessionReplay: true,
    })
  } catch (error) {
    console.warn('[analytics] Failed to create PostHog client', error)
    return null
  }
}

export const posthogClient = createPostHogClient()

const generateSessionId = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0
    const value = char === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })

export const startNewSession = (): string => {
  currentSessionId = generateSessionId()
  return currentSessionId
}

export const getCurrentSessionId = (): string | null => currentSessionId

const getAppVersion = (): string =>
  Constants.expoConfig?.version ?? Constants.manifest?.version ?? 'unknown'

const getLocaleData = (): { locale: string; deviceLanguage: string } => {
  const locale = Localization.locale ?? Localization.locales?.[0] ?? 'unknown'
  const deviceLanguage = locale.split(/[-_]/)[0] || 'unknown'

  return { locale, deviceLanguage }
}

export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
): void => {
  const client = posthogClient

  if (!client) {
    console.warn('[analytics] PostHog client not initialized; event skipped:', eventName)
    return
  }

  const { locale, deviceLanguage } = getLocaleData()

  const commonProperties = {
    app_version: getAppVersion(),
    platform: Platform.OS,
    locale,
    device_language: deviceLanguage,
    session_id: currentSessionId,
  }

  try {
    client.capture(eventName, {
      ...commonProperties,
      ...properties,
    })
  } catch (error) {
    console.warn('[analytics] Failed to track event', eventName, error)
  }
}
