import Constants from 'expo-constants';

export type TaskMetadata = {
  estimatedBrewTime: number;
  isPriority: boolean;
};

export const getTaskMetadata = async (taskName: string): Promise<TaskMetadata> => {
  const OPENAI_API_KEY = Constants.expoConfig?.extra?.openaiKey;

  console.log('[TASK INPUT]', taskName); // STEP 1: Log the input

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `You are a smart assistant in a cozy coffee-themed productivity app.
                      Based on this task: "${taskName}", return a JSON object with:
                      1. estimatedBrewTime (15, 25, or 45 only), and
                      2. isPriority (true or false).
                      Keep your response JSON only, like:
                      { "estimatedBrewTime": 25, "isPriority": false }
            `.trim(),
          },
        ],
        temperature: 0.6,
      }),
    });

    const data = await response.json();

    console.log('[OPENAI RESPONSE]', data); // STEP 2: Log the entire response

    const content = data.choices?.[0]?.message?.content || '{}';

    console.log('[PARSED CONTENT]', content); // STEP 3: Log what you're about to parse
    console.log('[OPENAI KEY]', OPENAI_API_KEY);

    return JSON.parse(content);
  } catch (error) {
    console.error('[AI FALLBACK]', error); // STEP 4: Log any errors

    return {
      estimatedBrewTime: 25,
      isPriority: false,
    };
  }
};
