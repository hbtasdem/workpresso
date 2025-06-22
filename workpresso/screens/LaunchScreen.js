import { useEffect } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LaunchScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');  // ⏩ Skip to tabs after animation
    }, 3000); // match your animation duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LottieView
        source={require('../assets/launch.json')}
        autoPlay
        loop={false}
      />
    </View>
  );
}
