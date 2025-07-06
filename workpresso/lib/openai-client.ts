import { OpenAI } from 'openai';
import Constants from 'expo-constants';

// Fallback for development (remove in production)
const DEVELOPMENT_API_KEY = 'your_key_here'; // TEMPORARY - remove later

export const openai = new OpenAI({
  apiKey: Constants.expoConfig?.extra?.openaiKey || DEVELOPMENT_API_KEY,
  dangerouslyAllowBrowser: true
});

// Debug check
console.log('OpenAI configured with key:', 
  Constants.expoConfig?.extra?.openaiKey ? '***masked***' : 'MISSING');