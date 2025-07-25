import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Image } from 'react-native';
import { Text } from '@ui-kitten/components';
import { getThemes } from '../themes/ThemeEngine';
import type { Theme } from '../themes/types';

interface Props {
  onSelect: (themeId: string) => void;
}

export const ThemePicker: React.FC<Props> = ({ onSelect }) => {
  const themes = getThemes();
  return (
    <FlatList
      data={themes}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => <ThemeCard theme={item} onSelect={onSelect} />}
    />
  );
};

interface CardProps {
  theme: Theme;
  onSelect: (themeId: string) => void;
}

const ThemeCard: React.FC<CardProps> = ({ theme, onSelect }) => (
  <TouchableOpacity style={styles.card} onPress={() => onSelect(theme.id)}>
    <Text category="h6" style={styles.title}>
      {theme.name}
    </Text>
    <View style={styles.swatches}>
      <View style={[styles.swatch, { backgroundColor: theme.palette.primary }]} />
      <View style={[styles.swatch, { backgroundColor: theme.palette.secondary }]} />
      <View style={[styles.swatch, { backgroundColor: theme.palette.accent }]} />
    </View>
    <FlatList
      data={theme.patterns.slice(0, 3)}
      keyExtractor={(_, i) => `${theme.id}-pat-${i}`}
      horizontal
      renderItem={({ item }) => <Image source={{ uri: item }} style={styles.pattern} />}
      contentContainerStyle={styles.patterns}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  title: { marginBottom: 8 },
  swatches: { flexDirection: 'row', marginBottom: 8 },
  swatch: { flex: 1, height: 20, marginRight: 4, borderRadius: 4 },
  patterns: { marginTop: 8 },
  pattern: { width: 50, height: 50, marginRight: 4, borderRadius: 4, backgroundColor: '#EEE' },
});