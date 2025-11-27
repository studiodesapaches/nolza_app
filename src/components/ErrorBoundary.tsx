import React, { Component, ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import { AppText } from '@/src/components'
import { theme } from '@/src/theme'
import { trackEvent } from '@/lib/analytics'

type Props = {
  screenName?: string
  children: ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundaryBase extends Component<Props, State> {
  private hasReported = false

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    if (this.hasReported) return
    this.hasReported = true

    trackEvent('ui_error', {
      screen_name: this.props.screenName ?? 'unknown',
      error_type: error?.name || 'UnknownError',
      message: error?.message?.slice(0, 200) || 'No message',
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.fallback}>
          <AppText variant="display-sm" tone="surface">
            Something went wrong
          </AppText>
          <AppText variant="body-md" tone="surfaceSecondary">
            Please restart the app or try again later.
          </AppText>
        </View>
      )
    }

    return this.props.children
  }
}

export const ErrorBoundary = ({ screenName, children }: Props) => {
  return <ErrorBoundaryBase screenName={screenName}>{children}</ErrorBoundaryBase>
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: theme.colors.background.default,
  },
})
