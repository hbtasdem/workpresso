import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/menuScreen'); // or /menu if you renamed it
    }, 3000);
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
