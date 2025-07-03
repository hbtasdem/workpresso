
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Task } from '../types/task'; // adjust path as needed
import { getTaskMetadata } from '../utils/taskUtils';
import uuid from 'react-native-uuid';

export default function BrewBotScreen() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = async () => {
    if (!taskText.trim()) return;

    const metadata = await getTaskMetadata(taskText);

    const newTask: Task = {
      id: uuid.v4().toString(),
      taskName: taskText,
      estimatedBrewTime: metadata.estimatedBrewTime,
      isComplete: false,
      isPriority: metadata.isPriority,
      isTaskBrew: true,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskText('');
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskRow}>
      <Text style={styles.taskText}>
        • {item.taskName} ({item.estimatedBrewTime} min)
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.header}>Today’s Roasts ☕</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        style={styles.taskList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          placeholderTextColor="#9e9e9e"
          value={taskText}
          onChangeText={setTaskText}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Roasting</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f5ec',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#6b4f3b',
    marginBottom: 24,
    textAlign: 'center',
  },
  taskList: {
    flexGrow: 0,
    marginBottom: 24,
  },
  taskRow: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    color: '#4e342e',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#4e342e',
  },
  addButton: {
    backgroundColor: '#6b4f3b',
    marginLeft: 12,
    borderRadius: 8,
    padding: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  startButton: {
    backgroundColor: '#a67b5b',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

// import React, { useState } from 'react';
// import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import { Task } from '../types/task'; // adjust path as needed
// import { getTaskMetadata } from '../utils/taskUtils'; // optional logic file
// import uuid from 'react-native-uuid';

// export default function BrewBotScreen() {
//   const [taskText, setTaskText] = useState('');
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const { estimatedBrewTime, isPriority } = await getTaskMetadata(task.name);

//   const addTask = () => {
//     if (!taskText.trim()) return;

//     const newTask: Task = {
//       id: uuid.v4().toString(),
//       taskName: taskText,
//       estimatedBrewTime: estimatedBrewTime(taskText),
//       isComplete: false,
//       isPriority: false,
//       isTaskBrew: true, // all tasks here are treated as special brews
//     };

//     setTasks((prev) => [...prev, newTask]);
//     setTaskText('');
//   };

//   const renderTask = ({ item }: { item: Task }) => (
//     <View style={styles.taskRow}>
//       <Text style={styles.taskText}>
//         • {item.taskName} ({item.estimatedBrewTime} min)
//       </Text>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.select({ ios: 'padding', android: undefined })}
//     >
//       <Text style={styles.header}>Today’s Roasts ☕</Text>

//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         renderItem={renderTask}
//         style={styles.taskList}
//       />

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Add a task..."
//           placeholderTextColor="#9e9e9e"
//           value={taskText}
//           onChangeText={setTaskText}
//           onSubmitEditing={addTask}
//         />
//         <TouchableOpacity style={styles.addButton} onPress={addTask}>
//           <Text style={styles.addButtonText}>+</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.startButton}>
//         <Text style={styles.startButtonText}>Start Roasting</Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f5ec',
//     paddingHorizontal: 20,
//     paddingTop: 60,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: '600',
//     color: '#6b4f3b',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   taskList: {
//     flexGrow: 0,
//     marginBottom: 24,
//   },
//   taskRow: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   taskText: {
//     fontSize: 16,
//     color: '#4e342e',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 10,
//     fontSize: 16,
//     color: '#4e342e',
//   },
//   addButton: {
//     backgroundColor: '#6b4f3b',
//     marginLeft: 12,
//     borderRadius: 8,
//     padding: 12,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   startButton: {
//     backgroundColor: '#a67b5b',
//     borderRadius: 16,
//     paddingVertical: 14,
//     alignItems: 'center',
//   },
//   startButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//     letterSpacing: 1,
//   },
// });
