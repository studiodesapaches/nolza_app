import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { theme } from '@/src/theme'

type Props = ViewProps & {
  background?: keyof typeof theme.colors.background | 'Surface'
}

/**
 * Base screen wrapper that enforces safe areas and spacing.
 */
const Screen: React.FC<Props> = ({
  children,
  background = 'default',
  style,
  ...rest
}) => {
  const backgroundColor =
    background === 'Surface'
      ? theme.colors.Surface.default
      : theme.colors.background[background]

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background.default }]}
      edges={['top', 'bottom']}
    >
      <View style={[styles.container, { backgroundColor }, style]} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
})

export default Screen
