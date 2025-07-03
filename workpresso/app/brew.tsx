
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';

export default function BrewScreen() {
  const { type } = useLocalSearchParams();

  const getDuration = (type: string | string[] | undefined) => {
    switch (type) {
      case 'espresso': return 15 * 60;
      case 'cold': return 45 * 60;
      case 'drip':
      default: return 25 * 60;
    }
  };

  const initialDuration = getDuration(type);
  const [secondsLeft, setSecondsLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(true);
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
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const secsLeft = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${secsLeft.toString().padStart(2, '0')}`;
  };

  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const progress = 1 - secondsLeft / initialDuration;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={styles.container}>
      <View style={styles.timerWrapper}>
        {/* Progress Ring */}
        <Svg width={240} height={240} style={StyleSheet.absoluteFill}>
          <Circle
            cx="120"
            cy="120"
            r={radius}
            stroke="#F5F5DC"
            strokeWidth={5}
            fill="none"
          />
          <Circle
            cx="120"
            cy="120"
            r={radius}
            stroke="#A67B5B"
            strokeWidth={5}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin="120,120"
          />
        </Svg>

        {/* Coffee Mug Image */}
        <View style={styles.innerCircle}>
          <Image
            source={require('../assets/ui/esp.png')}
            style={styles.coffeeImage}
          />
        </View>
      </View>

      {/* Timer Text */}
      <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a4b41',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerWrapper: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  innerCircle: {
    width: 200,
    height: 200,
    backgroundColor: '#F5F5DC',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  coffeeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  timerText: {
    marginTop: 32,
    fontSize: 48,
    fontWeight: '400',
    letterSpacing: 2,
    color: '#F5F5DC',
  },
});

// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import Svg, { Circle } from 'react-native-svg';

// export default function BrewScreen() {
//   const { type } = useLocalSearchParams();

//   const getDuration = (type: string | string[] | undefined) => {
//     switch (type) {
//       case 'espresso': return 15 * 60;
//       case 'cold': return 45 * 60;
//       case 'drip':
//       default: return 25 * 60;
//     }
//   };

//   const initialDuration = getDuration(type);
//   const [secondsLeft, setSecondsLeft] = useState(initialDuration);
//   const [isRunning, setIsRunning] = useState(true);
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
//     } else {
//       clearInterval(intervalRef.current!);
//     }

//     return () => clearInterval(intervalRef.current!);
//   }, [isRunning]);

//   const formatTime = (secs: number) => {
//     const mins = Math.floor(secs / 60);
//     const secsLeft = secs % 60;
//     return `${mins.toString().padStart(2, '0')}:${secsLeft.toString().padStart(2, '0')}`;
//   };

//   const progress = 1 - secondsLeft / initialDuration;
//   const radius = 100;
//   const strokeWidth = 10;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference * (1 - progress);

//   return (
//     <View style={styles.container}>
//       <View style={styles.circleContainer}>
//         <Svg width={240} height={240} style={styles.ringSvg}>
//           <Circle
//             cx="120"
//             cy="120"
//             r={110}
//             stroke="#F5F5DC"
//             strokeWidth={5}
//             fill="none"
//           />
//           <Circle
//             cx="120"
//             cy="120"
//             r={110}
//             stroke="#fff"
//             strokeWidth={5}
//             fill="none"
//             strokeDasharray={`${2 * Math.PI * 95}, ${2 * Math.PI * 95}`}
//             strokeDashoffset={strokeDashoffset}
//             strokeLinecap="round"
//             rotation="-90"
//             origin="120,120"
//           />
//         </Svg>

//         <View style={styles.circle}>
//           <Image
//             source={require('../assets/ui/esp.png')}
//             style={styles.coffeeImage}
//           />
//         </View>

//         <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#5a4b41',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   circleContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   ringSvg: {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   // top: -20,
//   // left: -20,
//   //zIndex: -1,
//   },
//   circle: {
//     width: 200,
//     height: 200,
//     backgroundColor: '#F5F5DC',
//     borderRadius: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   coffeeImage: {
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//   },
//   timerText: {
//     marginTop: 32,
//     fontSize: 48,
//     fontWeight: '400',
//     letterSpacing: 2,
//     color: '#F5F5DC',
//   },
// });

// // import React, { useEffect, useRef, useState } from 'react';
// // import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
// // import { useLocalSearchParams } from 'expo-router';

// // export default function BrewScreen() {
// //   const { type } = useLocalSearchParams();

// //   const getDuration = (type: string | string[] | undefined) => {
// //     switch (type) {
// //       case 'espresso': return 15 * 60;
// //       case 'cold': return 45 * 60;
// //       case 'drip':
// //       default: return 25 * 60;
// //     }
// //   };

// //   const initialDuration = getDuration(type);
// //   const [secondsLeft, setSecondsLeft] = useState(initialDuration);
// //   const [isRunning, setIsRunning] = useState(true);
// //   const intervalRef = useRef<number | null>(null);

// //   useEffect(() => {
// //     if (isRunning) {
// //       intervalRef.current = setInterval(() => {
// //         setSecondsLeft((prev) => {
// //           if (prev <= 1) {
// //             clearInterval(intervalRef.current!);
// //             setIsRunning(false);
// //             return 0;
// //           }
// //           return prev - 1;
// //         });
// //       }, 1000);
// //     } else {
// //       clearInterval(intervalRef.current!);
// //     }

// //     return () => clearInterval(intervalRef.current!);
// //   }, [isRunning]);

// //   const formatTime = (secs: number) => {
// //     const mins = Math.floor(secs / 60);
// //     const secsLeft = secs % 60;
// //     return `${mins.toString().padStart(2, '0')}:${secsLeft.toString().padStart(2, '0')}`;
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.circleContainer}>
// //         <View style={styles.circle}>
// //           <Image
// //             source={require('../assets/ui/esp.png')} // 👈 your coffee image
// //             style={styles.coffeeImage}
// //           />
// //         </View>
// //         <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //      backgroundColor: '#5a4b41', 
// //   },
// //   circleContainer: {
// //     alignItems: 'center',
// //   },
// //   circle: {
// //     width: 200,
// //     height: 200,
// //     backgroundColor: '#F5F5DC',
// //     borderRadius: 100,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowRadius: 12,
// //     shadowOffset: { width: 0, height: 4 },
// //     elevation: 5,
// //   },
// //   coffeeImage: {
// //     width: 100,
// //     height: 100,
// //     resizeMode: 'contain',
// //   },
// //   timerText: {
// //     marginTop: 32,
// //     fontSize: 48,
// //     fontWeight: '400',
// //     letterSpacing: 2,
// //     color: '#F5F5DC',
// //   },
// // });
