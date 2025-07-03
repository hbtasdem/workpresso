
import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

export default function MenuScreen() {
  const router = useRouter();

  const OutlinedLabel = ({ text }: { text: string }) => (
  <View style={styles.labelWrapper}>
    {[
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ].map(([dx, dy], i) => (
      <Text
        key={i}
        style={[
          styles.label,
          {
            color: '#6b4f3b',
            position: 'absolute',
            left: dx * 1.2,
            top: dy * 1.2,
            zIndex: -1,
          },
        ]}
      >
        {text}
      </Text>
    ))}
    <Text style={styles.label}>{text}</Text>
  </View>
);


  return (
    <ImageBackground
      source={require('../assets/icons/background.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.stack}>
        {/* New Brew */}
        <OutlinedLabel text="Start a New Brew" />
        <TouchableOpacity style={styles.card} onPress={() => router.push('/brewSelection')}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>

        {/* BrewBot */}
        <OutlinedLabel text="BrewBot" />
        <TouchableOpacity style={styles.card} onPress={() => router.push('/brewbot')}>
          <Image source={require('../assets/ui/brewbot.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* My Café */}
        <OutlinedLabel text="My Café" />
        <TouchableOpacity style={styles.card} onPress={() => router.push('/cafe')}>
          <Image source={require('../assets/ui/icon1.png')} style={styles.icon} />
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
  stack: {
    alignItems: 'center',
    gap: 24,
    marginTop: -40, // ⬆️ move everything up
  },
  labelWrapper: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    position: 'absolute',
    fontSize: 22,
    fontWeight: '800',
    color: '#EEEAE0',
    textAlign: 'center',
  },
  labelStroke: {
    color: '#5E3F28',
    textShadowColor: '#5E3F28',
    textShadowOffset: { width: 0, height: 0 }, // centered stroke
    textShadowRadius: 10, // increase to make the stroke pop
    zIndex: 10,
  },
  card: {
    width: 160,
    height: 160,
    backgroundColor: '#f5f0e6',
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#A67B5B', // add this for visible border
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    width: 96,
    height: 96,
    resizeMode: 'contain',
  },
  plusIcon: {
    fontSize: 150,
    fontWeight: '800',
    color: '#6b4f3b',
    textAlign: 'center',
    lineHeight: 150,
    fontFamily: 'System',
  },
});
