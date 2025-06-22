import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MenuScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/cafe-bg.png')} style={styles.container}>
      <View style={styles.buttonStack}>
        <TouchableOpacity onPress={() => navigation.navigate('Brew')}>
          <Text style={styles.button}>+ Start Brew</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Assistant')}>
          <Text style={styles.button}>🤖 BrewBot</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cafe')}>
          <Text style={styles.button}>🏠 My Café</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  buttonStack: { alignItems: 'center', gap: 24 },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: 'bold',
  }
});
