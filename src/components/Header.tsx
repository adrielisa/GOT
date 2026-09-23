import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HeaderProps {
  favoritesCount: number;
  showOnlyFavorites: boolean;
  onToggleShowFavorites: () => void;
}

export default function Header({
  favoritesCount,
  showOnlyFavorites,
  onToggleShowFavorites,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View>
          <Text style={styles.title}>CÓDICE DE WESTEROS</Text>
        </View>
      </View>

      {/* Botón interactivo de favoritos */}
      <TouchableOpacity
        style={[styles.favBadge, showOnlyFavorites && styles.favBadgeActive]}
        onPress={onToggleShowFavorites}
        activeOpacity={0.7}
      >
        <Text style={[styles.favText, showOnlyFavorites && styles.favTextActive]}>
          ⭐ {favoritesCount}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1b1d22',
    borderWidth: 1,
    borderColor: '#b48a3c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 20 },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1.2,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 11,
    color: '#717886',
    marginTop: 2,
  },
  favBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141824',
    borderWidth: 1,
    borderColor: '#262f44',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  favBadgeActive: {
    backgroundColor: '#e5b842',
    borderColor: '#e5b842',
  },
  favText: { color: '#e5b842', fontWeight: '700', fontSize: 13 },
  favTextActive: { color: '#0d0f14' },
});