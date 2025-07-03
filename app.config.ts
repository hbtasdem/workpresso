import 'dotenv/config';

export default {
  expo: {
    name: 'Workpresso',
    // slug: 'your-app-slug',
    slug:'workpresso',
    extra: {
      openaiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    },
  },
};
