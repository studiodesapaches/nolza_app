import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, View } from 'react-native';
import { CaretDown, CaretUp } from 'phosphor-react-native';

import { theme } from '@/src/theme';
import AppText from './AppText';

type Props = {
  title: string;
  content?: ReactNode;
  expanded?: boolean;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
};

/**
 * Collapsed accordion item used in the guidelines screen.
 * Renders a label and a downward caret to indicate expandability.
 */
const AccordionItem: React.FC<Props> = ({ title, content, expanded = false, onPress, style }) => {
  return (
    <View style={[styles.card, style as any]}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.row}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ expanded }}
        disabled={!onPress}
      >
        <AppText variant="title-sm" tone="surface" style={styles.title}>
          {title}
        </AppText>
        <View style={styles.iconWrap}>
          {expanded ? (
            <CaretUp
              size={theme.icons.md}
              weight="bold"
              color={theme.colors.icon.surface.default}
            />
          ) : (
            <CaretDown
              size={theme.icons.md}
              weight="bold"
              color={theme.colors.icon.surface.default}
            />
          )}
        </View>
      </TouchableOpacity>
      {expanded && content ? <View style={styles.content}>{content}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.background.secondary,
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    alignSelf: 'stretch',
  },
  title: {
    flex: 1,
    flexShrink: 1,
  },
  iconWrap: {
    marginLeft: 'auto',
  },
  content: {
    flexDirection: 'column',
    gap: 12,
    alignSelf: 'stretch',
  },
});

export default AccordionItem;
