import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createAudioPlayer } from 'expo-audio';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const webAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Manejo para navegador Web usando la etiqueta nativa de Audio
      const audio = new Audio('/cancion.mp3');
      audio.loop = true;
      audio.volume = 0.5; // Ajusta el volumen entre 0.0 y 1.0 según prefieras
      webAudioRef.current = audio;

      // Intentar reproducir automáticamente
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // La mayoría de los navegadores (Chrome/Safari) bloquean el autoplay
          // si el usuario no ha interactuado antes. Al primer clic que haga
          // (por ejemplo, en el Splash Screen), iniciará la música.
          const handleFirstInteraction = () => {
            audio.play();
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
          };
          window.addEventListener('click', handleFirstInteraction);
          window.addEventListener('keydown', handleFirstInteraction);
        });
      }

      return () => {
        audio.pause();
      };
    } else {
      // Manejo para móvil (Android / iOS) con expo-audio
      let player: any = null;
      try {
        player = createAudioPlayer(require('./assets/cancion.mp3'));
        player.loop = true;
        player.volume = 0.5;
        player.play();
      } catch (err) {
        console.error('Error al reproducir audio de fondo en móvil:', err);
      }

      return () => {
        if (player) {
          player.remove();
        }
      };
    }
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}