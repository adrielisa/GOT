import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface HouseTabsProps {
  houses: string[];
  selectedHouse: string;
  onSelectHouse: (house: string) => void;
}

export default function HouseTabs({
  houses,
  selectedHouse,
  onSelectHouse,
}: HouseTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {houses.map((house) => {
        const isSelected = selectedHouse === house;
        return (
          <TouchableOpacity
            key={house}
            style={[styles.tab, isSelected && styles.tabSelected]}
            onPress={() => onSelectHouse(house)}
          >
            <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
              {house}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#161920',
    borderWidth: 1,
    borderColor: '#222733',
  },
  tabSelected: {
    backgroundColor: '#e5b842',
    borderColor: '#e5b842',
  },
  tabText: {
    color: '#8e96a4',
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextSelected: {
    color: '#0d0f14',
    fontWeight: '700',
  },
});