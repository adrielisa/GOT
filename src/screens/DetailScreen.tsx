import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
export default function DetailScreen({ route, navigation }: any) {
  const { character } = route.params;
  const [isFav, setIsFav] = useState(false);
  const [copied, setCopied] = useState(false);

  const honor = ((character.id * 17) % 55) + 40;
  const influence = ((character.id * 23) % 50) + 45;
  const combat = ((character.id * 31) % 60) + 35;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Cabecera con Imagen y Botones Flotantes */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: character.imageUrl }} style={styles.bannerImage} />
          
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favBtn}
            onPress={() => setIsFav(!isFav)}
          >
            <Text style={styles.favIcon}>{isFav ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        {/* Metadatos superiores: Casa e ID */}
        <View style={styles.headerInfo}>
          <View style={styles.badgesRow}>
            {character.family ? (
              <View style={styles.houseBadge}>
                <Text style={styles.houseText}>{character.family}</Text>
              </View>
            ) : <View />}

            <View style={styles.idBadge}>
              <Text style={styles.idText}>ID: #{character.id}</Text>
            </View>
          </View>

          <Text style={styles.charName}>{character.fullName.toUpperCase()}</Text>
          <Text style={styles.charTitle}>{character.title || 'Noble de Westeros'}</Text>
        </View>

        {/* Módulo RPG: Estadísticas de Códice */}
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>ESTADÍSTICAS</Text>
          </View>

          {/* Stat 1 */}
          <View style={styles.statRow}>
            <View style={styles.statLabelRow}>
              <Text style={styles.statLabel}>Honor & Lealtad</Text>
              <Text style={[styles.statValue, { color: '#f59e0b' }]}>{honor}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${honor}%`, backgroundColor: '#f59e0b' }]} />
            </View>
          </View>

          {/* Stat 2 */}
          <View style={styles.statRow}>
            <View style={styles.statLabelRow}>
              <Text style={styles.statLabel}>Influencia Política</Text>
              <Text style={[styles.statValue, { color: '#3b82f6' }]}>{influence}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${influence}%`, backgroundColor: '#3b82f6' }]} />
            </View>
          </View>

          {/* Stat 3 */}
          <View style={styles.statRow}>
            <View style={styles.statLabelRow}>
              <Text style={styles.statLabel}>Destreza en Combate</Text>
              <Text style={[styles.statValue, { color: '#ef4444' }]}>{combat}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${combat}%`, backgroundColor: '#ef4444' }]} />
            </View>
          </View>
        </View>

        {/* Fichas descriptivas */}
        <View style={styles.gridRow}>
          <View style={[styles.fieldBox, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>NOMBRE</Text>
            <Text style={styles.fieldValue}>{character.firstName || character.fullName}</Text>
          </View>
          <View style={[styles.fieldBox, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>APELLIDO</Text>
            <Text style={styles.fieldValue}>{character.lastName || 'Ninguno'}</Text>
          </View>
        </View>

        <View style={styles.fieldBox}>
          <Text style={styles.fieldLabel}>CASA / ALIANZA</Text>
          <Text style={styles.fieldValue}>{character.family || 'Desconocida'}</Text>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0c0f14' },
  container: { flex: 1 },
  contentContainer: { paddingBottom: 40 },
  imageContainer: {
    width: '100%',
    height: 380,
    position: 'relative',
    backgroundColor: '#000',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backBtn: {
    position: 'absolute',
    top: 24,
    left: 18,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 18, 24, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#262f44',
  },
  backIcon: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  favBtn: {
    position: 'absolute',
    top: 24,
    right: 18,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 18, 24, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#262f44',
  },
  favIcon: { fontSize: 16 },
  headerInfo: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  houseBadge: {
    backgroundColor: '#1b1710',
    borderWidth: 1,
    borderColor: '#b47822',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  houseText: { color: '#f59e0b', fontSize: 11, fontWeight: '700' },
  idBadge: {
    backgroundColor: '#131720',
    borderWidth: 1,
    borderColor: '#263044',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  idText: { color: '#8892a4', fontSize: 11, fontWeight: '600' },
  charName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    fontFamily: 'serif',
    letterSpacing: 1,
  },
  charTitle: {
    fontSize: 14,
    color: '#eab308',
    fontStyle: 'italic',
    marginTop: 4,
  },
  statsCard: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#11151e',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1e2638',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1d2538',
    paddingBottom: 10,
    marginBottom: 14,
  },
  statsTitle: {
    color: '#d4af37',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  modeText: { color: '#60a5fa', fontSize: 10, fontWeight: '700' },
  statRow: { marginBottom: 12 },
  statLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  statLabel: { color: '#94a3b8', fontSize: 12 },
  statValue: { fontSize: 12, fontWeight: '700' },
  progressBarBg: {
    height: 6,
    backgroundColor: '#1c2230',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: { height: '100%', borderRadius: 3 },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    marginTop: 12,
  },
  fieldBox: {
    backgroundColor: '#11151e',
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#1e2638',
  },
  fieldLabel: { color: '#64748b', fontSize: 10, fontWeight: '700', marginBottom: 4 },
  fieldValue: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  actionBtn: {
    marginHorizontal: 16,
    marginTop: 18,
    backgroundColor: '#171d2b',
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#2e3952',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: { color: '#ffffff', fontSize: 13, fontWeight: '700' },
});