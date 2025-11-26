export const palette = {
  neutral: {
    50: '#f2f2f2',
    100: '#e6e6e6',
    200: '#cccccc',
    300: '#b3b3b3',
    400: '#999999',
    500: '#808080',
    600: '#666666',
    700: '#4d4d4d',
    800: '#333333',
    900: '#1a1a1a',
    950: '#0d0d0d',
  },
  black: {
    0: '#00000000',
    100: '#0000001A',
    200: '#00000033',
    300: '#0000004D',
    400: '#00000066',
    500: '#00000080',
    600: '#00000099',
    700: '#000000B3',
    800: '#000000CC',
    900: '#000000E6',
    1000: '#000000FF',
  },
  white: {
    0: '#FFFFFF00',
    100: '#FFFFFF1A',
    200: '#FFFFFF33',
    300: '#FFFFFF4D',
    400: '#FFFFFF66',
    500: '#FFFFFF80',
    600: '#FFFFFF99',
    700: '#FFFFFFB3',
    800: '#FFFFFFCC',
    900: '#FFFFFFE6',
    1000: '#FFFFFFFF',
  },
  emerald: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
    950: '#022C22',
  },
} as const

export const colors = {
  background: {
    default: palette.black[1000],
    secondary: palette.neutral[900],
    tertiary: palette.neutral[700],
    transparent: palette.black[700],
  },
  inverseSurface: {
    default: palette.white[1000],
  },
  primary: {
    default: palette.emerald[600],
  },
  disabled: {
    default: palette.neutral[300],
  },
  utility: {
    scrim: palette.black[700],
  },
  text: {
    primary: palette.neutral[900],
    muted: palette.neutral[600],
    inverse: palette.neutral[50],
    surface: {
      default: palette.white[1000],
      secondary: palette.neutral[300],
    },
    inverseSurface: {
      default: palette.black[1000],
    },
    primaryAccent: {
      default: palette.emerald[600],
    },
    disabled: {
      default: palette.neutral[600],
    },
  },
  icon: {
    surface: {
      default: palette.white[1000],
      secondary: palette.neutral[300],
    },
    inverseSurface: {
      default: palette.black[1000],
    },
    primaryAccent: {
      default: palette.emerald[600],
    },
    disabled: {
      default: palette.neutral[600],
    },
  },
  stroke: {
    surface: {
      default: palette.white[1000],
      secondary: palette.neutral[800],
    },
    disabled: {
      default: palette.neutral[600],
    },
  },
} as const

export const radius = {
  full: 9999,
  lg: 24,
  md: 16,
  sm: 8,
} as const

export const icons = {
  xxl: 64,
  xl: 40,
  lg: 24,
  md: 20,
  sm: 16,
} as const

export const stroke = {
  lg: 2,
  md: 1,
  sm: 0.5,
} as const

export const shadow = {
  drop: {
    shadowColor: palette.black[1000],
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
} as const

export const typography = {
  family: {
    base: 'Inter',
  },
  weight: {
    regular: '400',
    semibold: '600',
  },
  text: {
    display: {
      md: {
        fontFamily: 'Inter',
        fontSize: 32,
        lineHeight: 40,
        fontWeight: '600',
      },
      sm: {
        fontFamily: 'Inter',
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600',
      },
    },
    title: {
      md: {
        fontFamily: 'Inter',
        fontSize: 20,
        lineHeight: 24,
        fontWeight: '600',
      },
      sm: {
        fontFamily: 'Inter',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
      },
    },
    label: {
      lg: {
        fontFamily: 'Inter',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
      },
      md: {
        fontFamily: 'Inter',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
      },
      sm: {
        fontFamily: 'Inter',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
      },
    },
    body: {
      lg: {
        fontFamily: 'Inter',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '400',
      },
      md: {
        fontFamily: 'Inter',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
      },
      sm: {
        fontFamily: 'Inter',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
      },
    },
  },
} as const

export const theme = {
  palette,
  colors,
  radius,
  icons,
  stroke,
  shadow,
  typography,
}

export type Theme = typeof theme
