import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function MenuScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/icons/background.png')} // ✅ update this path if needed
      style={styles.container}
    >
      <View style={styles.buttonStack}>
        <TouchableOpacity onPress={() => router.push('/brewSelection')}>
          <Text style={styles.button}>+ Start Brew</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/assistant')}>
          <Text style={styles.button}>🤖 BrewBot</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/cafe')}>
          <Text style={styles.button}>🏠 My Café</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStack: {
    alignItems: 'center',
    gap: 24,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
