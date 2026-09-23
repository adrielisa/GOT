import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import HouseTabs from '../components/HouseTabs';
import CharacterCard from '../components/CharacterCard';

interface Character {
  id: number;
  fullName: string;
  title: string;
  family: string;
  imageUrl: string;
}

// Diccionario canónico para mapear y fusionar todas las inconsistencias de la API
const canonicalHouses: Record<string, string> = {
  lanister: 'Lannister',
  lannister: 'Lannister',
  'house lanister': 'Lannister',
  'house lannister': 'Lannister',
  stark: 'Stark',
  'house stark': 'Stark',
  targaryen: 'Targaryen',
  targaryan: 'Targaryen',
  'house targaryen': 'Targaryen',
  baratheon: 'Baratheon',
  'house baratheon': 'Baratheon',
  greyjoy: 'Greyjoy',
  'house greyjoy': 'Greyjoy',
  tyrell: 'Tyrell',
  'house tyrell': 'Tyrell',
  tarly: 'Tarly',
  'house tarly': 'Tarly',
  seaworth: 'Seaworth',
  'house seaworth': 'Seaworth',
  clegane: 'Clegane',
  'house clegane': 'Clegane',
  mormont: 'Mormont',
  'house mormont': 'Mormont',
  lorath: 'Lorath',
  lorathi: 'Lorath',
  naathi: 'Naath',
  naath: 'Naath',
  qarth: 'Qarth',
  none: 'Sin Casa',
  unknown: 'Sin Casa',
  unnamed: 'Sin Casa',
};

const cleanFamilyName = (rawFamily: any): string => {
  if (typeof rawFamily !== 'string') return 'Sin Casa';

  const normalized = rawFamily.trim().toLowerCase();

  if (canonicalHouses[normalized]) {
    return canonicalHouses[normalized];
  }

  const withoutHouse = rawFamily.replace(/^House\s+/i, '').trim();
  if (withoutHouse.length === 0 || withoutHouse.toLowerCase() === 'none') {
    return 'Sin Casa';
  }

  return withoutHouse;
};

export default function HomeScreen({ navigation }: any) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('Todas las Casas');
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // 1. Estado para alternar el filtro de solo favoritos
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Cargar y sanitizar personajes
  useEffect(() => {
    fetch('https://thronesapi.com/api/v2/Characters')
      .then((res) => res.json())
      .then((data: any[]) => {
        const sanitized = data.map((item) => ({
          id: item.id,
          fullName: item.fullName || 'Desconocido',
          title: item.title || 'Noble de Poniente',
          family: cleanFamilyName(item.family),
          imageUrl: item.imageUrl,
        }));

        setCharacters(sanitized);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Extraer lista única de casas
  const houseList = useMemo(() => {
    const families = characters
      .map((c) => c.family)
      .filter((f) => f && f !== 'Sin Casa');

    const unique = Array.from(new Set(families)).sort();
    return ['Todas las Casas', ...unique, 'Sin Casa'];
  }, [characters]);

  // 2. Filtrado considerando búsqueda, casa activa y favoritos
  const filteredCharacters = useMemo(() => {
    return characters.filter((c) => {
      const matchSearch =
        c.fullName.toLowerCase().includes(search.toLowerCase()) ||
        c.title.toLowerCase().includes(search.toLowerCase());

      const matchHouse =
        selectedHouse === 'Todas las Casas' ||
        c.family.toLowerCase() === selectedHouse.toLowerCase();

      const matchFavorites = !showOnlyFavorites || favorites.includes(c.id);

      return matchSearch && matchHouse && matchFavorites;
    });
  }, [characters, search, selectedHouse, showOnlyFavorites, favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e5b842" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.headerWrapper}>
        {/* 3. Pasamos las props de favoritos al Header */}
        <Header
          favoritesCount={favorites.length}
          showOnlyFavorites={showOnlyFavorites}
          onToggleShowFavorites={() => setShowOnlyFavorites((prev) => !prev)}
        />

        <View style={styles.searchBox}>
          <TextInput
            placeholder="Buscar por nombre o título..."
            placeholderTextColor="#5e6677"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        <HouseTabs
          houses={houseList}
          selectedHouse={selectedHouse}
          onSelectHouse={setSelectedHouse}
        />
      </View>

      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={toggleFavorite}
            onPress={() => navigation.navigate('Detail', { character: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0c10',
  },
  headerWrapper: {
    paddingHorizontal: 14,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#171a23',
  },
  searchBox: {
    backgroundColor: '#11141b',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#222838',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
  },
  searchInput: {
    color: '#ffffff',
    fontSize: 14,
  },
  listContent: {
    padding: 8,
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0a0c10',
    alignItems: 'center',
    justifyContent: 'center',
  },
});