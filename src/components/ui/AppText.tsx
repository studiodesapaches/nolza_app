import React from 'react'
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native'

import { theme } from '@/src/theme'

type TextVariant =
  | 'display-md'
  | 'display-sm'
  | 'title-md'
  | 'title-sm'
  | 'label-lg'
  | 'label-md'
  | 'label-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'

type TextTone =
  | 'primary'
  | 'muted'
  | 'inverse'
  | 'surface'
  | 'surfaceSecondary'
  | 'primaryAccent'
  | 'disabled'

type Props = TextProps & {
  variant?: TextVariant
  tone?: TextTone
}

const variantStyles: Record<TextVariant, TextStyle> = {
  'display-md': theme.typography.text.display.md,
  'display-sm': theme.typography.text.display.sm,
  'title-md': theme.typography.text.title.md,
  'title-sm': theme.typography.text.title.sm,
  'label-lg': theme.typography.text.label.lg,
  'label-md': theme.typography.text.label.md,
  'label-sm': theme.typography.text.label.sm,
  'body-lg': theme.typography.text.body.lg,
  'body-md': theme.typography.text.body.md,
  'body-sm': theme.typography.text.body.sm,
}

const colorMap: Record<TextTone, string> = {
  primary: theme.colors.text.primary,
  muted: theme.colors.text.muted,
  inverse: theme.colors.text.inverse,
  surface: theme.colors.text.surface.default,
  surfaceSecondary: theme.colors.text.surface.secondary,
  primaryAccent: theme.colors.text.primaryAccent.default,
  disabled: theme.colors.text.disabled.default,
}

/**
 * Shared text component with the design system defaults baked in.
 */
const AppText: React.FC<Props> = ({
  variant = 'body-md',
  tone = 'primary',
  style,
  children,
  ...rest
}) => {
  return (
    <Text style={[styles.base, variantStyles[variant], { color: colorMap[tone] }, style]} {...rest}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  base: {
    fontFamily: theme.typography.family.base,
  },
})

export default AppText
