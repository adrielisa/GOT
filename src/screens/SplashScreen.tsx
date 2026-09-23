import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function SplashScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHRONICLES OF WESTEROS</Text>
      <Text style={styles.subtitle}>Base de Datos del Reino</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.buttonText}>ENTRAR AL REINO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d4af37',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8b9bb4',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1f293d',
    borderWidth: 1,
    borderColor: '#d4af37',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    color: '#f9fafb',
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});