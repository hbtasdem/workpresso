
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { BlurView } from 'expo-blur';
import Svg, { Circle } from 'react-native-svg';

function ProgressCircle({ progress }: { progress: number }) {
  const radius = 120;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <Svg width={260} height={260}>
      <Circle
        stroke="#EEEAE0"
        fill="#EEEAE0"
        cx="130"
        cy="130"
        r={radius}
        strokeWidth={strokeWidth}
      />
      <Circle
        stroke="#6b4f3b"
        fill="none"
        cx="130"
        cy="130"
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        rotation="-90"
        origin="130,130"
      />
    </Svg>
  );
}

export default function BrewScreen() {
  const { type } = useLocalSearchParams();

  const getDuration = (type: string | string[] | undefined) => {
    switch (type) {
      case 'espresso':
        return 15 * 60;
      case 'cold':
        return 45 * 60;
      case 'drip':
      default:
        return 25 * 60;
    }
  };

  const initialDuration = getDuration(type);
  const [secondsLeft, setSecondsLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
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

  const resetTimer = () => {
    clearInterval(intervalRef.current!);
    setSecondsLeft(initialDuration);
    setIsRunning(false);
  };

  return (
    <ImageBackground
      source={require('../assets/ui/espmachine.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <BlurView intensity={5} tint="default" style={styles.blurWrapper}>
        {/* Ring + Timer Text */}
        <View style={styles.ringContainer}>
          <ProgressCircle progress={1 - secondsLeft / initialDuration} />
          <View style={styles.timerOverlay}>
            <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => setIsRunning((prev) => !prev)}>
            <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={resetTimer}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurWrapper: {
    width: '100%',
    height: '300%',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(166, 123, 91, 0.08)',
  },
  ringContainer: {
    position: 'relative',
    width: 260,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6b4f3b',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 20,
  },
  button: {
    backgroundColor: '#6b4f3b',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { BlurView } from 'expo-blur';
// import Svg, { Circle } from 'react-native-svg';

// function ProgressCircle({ progress }: { progress: number }) {
//   const radius = 120;
//   const strokeWidth = 10;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference * (1 - progress);

//   return (
//     <Svg width={260} height={260}>
//       <Circle
//         stroke="#e0cfc1"
//         fill="none"
//         cx="130"
//         cy="130"
//         r={radius}
//         strokeWidth={strokeWidth}
//       />
//       <Circle
//         stroke="#6b4f3b"
//         fill="none"
//         cx="130"
//         cy="130"
//         r={radius}
//         strokeWidth={strokeWidth}
//         strokeDasharray={`${circumference} ${circumference}`}
//         strokeDashoffset={strokeDashoffset}
//         strokeLinecap="round"
//         rotation="-90"
//         origin="130,130"
//       />
//     </Svg>
//   );
// }

// export default function BrewScreen() {
//   const { type } = useLocalSearchParams();

//   const getDuration = (type: string | string[] | undefined) => {
//     switch (type) {
//       case 'espresso':
//         return 15 * 60;
//       case 'cold':
//         return 45 * 60;
//       case 'drip':
//       default:
//         return 25 * 60;
//     }
//   };

//   const initialDuration = getDuration(type);
//   const [secondsLeft, setSecondsLeft] = useState(initialDuration);
//   const [isRunning, setIsRunning] = useState(false);
//   const intervalRef = useRef<number | null>(null);

//   useEffect(() => {
//     if (isRunning) {
//       intervalRef.current = setInterval(() => {
//         setSecondsLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(intervalRef.current!);
//             setIsRunning(false);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } else if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }

//     return () => clearInterval(intervalRef.current!);
//   }, [isRunning]);

//   const formatTime = (secs: number) => {
//     const mins = Math.floor(secs / 60);
//     const secsLeft = secs % 60;
//     return `${mins.toString().padStart(2, '0')}:${secsLeft.toString().padStart(2, '0')}`;
//   };

//   const resetTimer = () => {
//     clearInterval(intervalRef.current!);
//     setSecondsLeft(initialDuration);
//     setIsRunning(false);
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/ui/espmachine.png')}
//       style={styles.container}
//       resizeMode="cover"
//     >
//       <BlurView intensity={5} tint="default" style={styles.blurWrapper}>
//         {/* Ring + Timer Text */}
//         <View style={styles.ringContainer}>
//           <ProgressCircle progress={1 - secondsLeft / initialDuration} />
//           <View style={styles.timerOverlay}>
//             <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
//           </View>
//         </View>

//         {/* Buttons */}
//         <View style={styles.buttonRow}>
//           <TouchableOpacity style={styles.button} onPress={() => setIsRunning((prev) => !prev)}>
//             <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={resetTimer}>
//             <Text style={styles.buttonText}>Reset</Text>
//           </TouchableOpacity>
//         </View>
//       </BlurView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   blurWrapper: {
//     width: '100%',
//     height: '300%',
//     padding: 32,
//     borderRadius: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(166, 123, 91, 0.08)',
//   },
//   ringContainer: {
//     position: 'relative',
//     width: 260,
//     height: 260,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   timerOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   timerText: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     color: '#3e2723',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     marginTop: 32,
//     gap: 20,
//   },
//   button: {
//     backgroundColor: '#6b4f3b',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 12,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });
