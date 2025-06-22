import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import BrewCard from '@/components/brewCard';

export default function BrewSelectionScreen() {
  const router = useRouter();

  const selectBrew = (brewType: 'espresso' | 'drip' | 'cold') => {
    router.push({
      pathname: '/brew',
      params: { type: brewType }
    });
  };

  return (
    <ImageBackground
          source={require('../assets/icons/background.png')} 
          style={styles.container}
        >
        <View style={styles.buttonStack}>
            <TouchableOpacity style={styles.card} onPress={() => selectBrew('espresso')}>
                <View style={styles.iconWrapper}>
                    <Image
                    source={require('../assets/ui/esp.png')}
                    style={styles.icon}
                    />
                </View>
                <View style={{ width: 16 }} />
                <View style={styles.textContainer}>
                    <Text style={styles.brewLabel}>Espresso</Text>
                    <Text style={styles.brewTime}>15 MINS</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => selectBrew('drip')}>
                <View style={styles.iconWrapper}>
                    <Image
                    source={require('../assets/ui/drip.png')}
                    style={styles.icon}
                    />
                </View>
                <View style={{ width: 16 }} />
                <View style={styles.textContainer}>
                    <Text style={styles.brewLabel}>Drip Coffee</Text>
                    <Text style={styles.brewTime}>25 MINS</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => selectBrew('drip')}>
                <View style={styles.iconWrapper}>
                    <Image
                    source={require('../assets/ui/cb.png')}
                    style={styles.icon}
                    />
                </View>
                <View style={{ width: 16 }} />
                <View style={styles.textContainer}>
                    <Text style={styles.brewLabel}>Cold Brew</Text>
                    <Text style={styles.brewTime}>45 MINS</Text>
                </View>
            </TouchableOpacity>
            </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // your background color
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: '600',
  },
  buttonStack: {
  width: '100%',
  alignItems: 'center',
  gap: 40,
},
brewButton: {
  width: '100%',
  maxWidth: 280,
  height: 160,
  backgroundColor: '#EEEAE0',
  borderRadius: 24,
  borderWidth: 4,
  borderColor: '#A67B5B',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
},
textWrapper: {
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 10,
},
buttonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '600',
  textAlign: 'center',
},
card: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f9f4ef',
  borderRadius: 24,
  borderWidth: 4,
  borderColor: '#A67B5B',
  padding: 16,
  marginBottom: 20,
  width: '100%',
  maxWidth: 280,
  height: 170, 
  elevation: 4,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 4 },
},
iconWrapper: {
  width: 80,
  height: 80,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 20,
  marginLeft: 10,
},
icon: {
  width: '200%',
  height: '200%',
  resizeMode: 'contain',
},
textContainer: {
  flex: 1,
  justifyContent: 'center',
},
brewLabel: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#A67B5B',
},
brewTime: {
  fontSize: 27,
  fontWeight: 'bold',
  color: '#74563F',
  marginTop: 4,
},

});