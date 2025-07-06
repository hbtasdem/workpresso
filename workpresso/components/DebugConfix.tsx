import { View, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';

export default function ConfigDebug() {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Configuration Debug</Text>
      
      <Text style={{ marginTop: 20 }}>OpenAI Key:</Text>
      <Text selectable>
        {Constants.expoConfig?.extra?.openaiKey 
          ? '✔️ Configured' 
          : '❌ MISSING'}
      </Text>

      <Text style={{ marginTop: 10 }}>Assistant ID:</Text>
      <Text selectable>
        {Constants.expoConfig?.extra?.openaiAssistantId 
          ? `✔️ ${Constants.expoConfig?.extra?.openaiAssistantId}` 
          : '❌ MISSING'}
      </Text>

      <Text style={{ marginTop: 10 }}>All Environment Variables:</Text>
      <Text selectable style={{ marginTop: 5 }}>
        {JSON.stringify(Constants.expoConfig?.extra, null, 2)}
      </Text>
    </ScrollView>
  );
}