import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Backpack, BagSimple, UsersThree, Wine } from 'phosphor-react-native';

import { theme } from '@/src/theme';
import AppText from './AppText';

type Props = {
  players: string;
  drinks: string;
  materials: string;
  style?: ViewStyle | ViewStyle[];
};

const OverviewCard: React.FC<Props> = ({ players, drinks, materials, style }) => {
  return (
    <View style={[styles.card, style as any]}>
      <OverviewRow icon={<UsersThree />} label="Players" value={players} />
      <View style={styles.divider} />
      <OverviewRow icon={<Wine />} label="Drinks" value={drinks} />
      <View style={styles.divider} />
      <OverviewRow icon={<BagSimple />} label="Materials" value={materials} />
    </View>
  );
};

const OverviewRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => {
  return (
    <View style={styles.row}>
      <View style={styles.labelRow}>
        <View style={styles.icon}>{withIconDefaults(icon)}</View>
        <AppText variant="title-sm" tone="surface">
          {label}
        </AppText>
      </View>
      <AppText variant="body-md" tone="surfaceSecondary">
        {value}
      </AppText>
    </View>
  );
};

const withIconDefaults = (icon: React.ReactNode) => {
  if (!React.isValidElement(icon)) return icon;
  return React.cloneElement(icon, {
    ...icon.props,
    size: theme.icons.md,
    weight: 'bold',
    color: theme.colors.icon.surface.default,
  });
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.background.secondary,
    gap: 16,
    alignSelf: 'stretch',
    width: '100%',
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    alignSelf: 'stretch',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    alignSelf: 'stretch',
    borderWidth: theme.stroke.sm,
    borderColor: theme.colors.stroke.surface.secondary,
  },
});

export default OverviewCard;
