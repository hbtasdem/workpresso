import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const POMODORO_DURATION = 25 * 60;

export default function BrewScreen() {
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const secsLeft = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${secsLeft.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Ellipse background */}
      <View style={styles.ellipse}>
        {/* Coffee ring on top */}
        <Image
          source={require('../assets/ui/coffee-ring.png')}
          style={styles.ring}
        />

        {/* Timer text centered */}
        <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // or your app's background
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipse: {
    width: 260,
    height: 260,
    backgroundColor: '#e3d5c2', // your app's ellipse color
    borderRadius: 130,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ring: {
    position: 'absolute',
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3e2723',
  },
});
