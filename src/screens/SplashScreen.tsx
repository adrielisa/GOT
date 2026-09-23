import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function SplashScreen({ navigation }: any) {
  const hasNavigated = useRef(false);

  // Fuente para Android / iOS
  const nativeSource =
    Platform.OS !== 'web' ? require('../../assets/GOT_VIDEO.mp4') : null;

  // Reproductor nativo simple: bucle, silenciado e inicio automático
  const player = useVideoPlayer(nativeSource, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  const handleEnter = () => {
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      if (Platform.OS !== 'web' && player) {
        try {
          player.pause();
        } catch (e) {}
      }
      navigation.replace('Home');
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      style={styles.container}
      onPress={handleEnter}
    >
      <StatusBar hidden />

      {/* WEB: Video estándar HTML5 puro */}
      {Platform.OS === 'web' ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/GOT_VIDEO.mp4"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
      ) : (
        /* MÓVIL: Video nativo con expo-video */
        <VideoView
          player={player}
          style={styles.fullscreenVideo}
          nativeControls={false}
          contentFit="cover"
        />
      )}

      {/* Capa oscura semitransparente */}
      <View style={styles.darkOverlay} />

      {/* Título central */}
      <View style={styles.content}>
        <Text style={styles.mainTitle}>GAME OF THRONES</Text>
        <View style={styles.goldDivider} />
        <Text style={styles.subTitle}>CASAS DEL REINO</Text>
      </View>

      {/* Indicador inferior */}
      <View style={styles.footer}>
        <Text style={styles.callToAction}>HAZ CLICK PARA EXPLORAR EL REINO</Text>
        <Text style={styles.chevron}>▾</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  mainTitle: {
    color: '#e5c158',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 5,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  goldDivider: {
    width: 140,
    height: 1.5,
    backgroundColor: '#c5a059',
    marginVertical: 14,
  },
  subTitle: {
    color: '#d1d5db',
    fontSize: 14,
    letterSpacing: 4,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    zIndex: 10,
  },
  callToAction: {
    color: '#c5a059',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  chevron: {
    color: '#c5a059',
    fontSize: 14,
    marginTop: 4,
  },
});