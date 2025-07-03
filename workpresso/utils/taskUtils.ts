
// export const estimateBrewTime = (taskName: string): number => {
//   const name = taskName.toLowerCase();

//   // Rule-based time estimates
//   if (name.includes('email') || name.includes('call') || name.includes('reply')) return 15;     // Espresso
//   if (name.includes('study') || name.includes('project') || name.includes('research')) return 45; // Cold brew
//   if (name.includes('write') || name.includes('organize') || name.includes('clean')) return 25;   // Drip

//   // Default to medium focus
//   return 25;
// };

import Constants from 'expo-constants';
export type TaskMetadata = {
  estimatedBrewTime: number;
  isPriority: boolean;
};

export const getTaskMetadata = async (taskName: string): Promise<TaskMetadata> => {
    const OPENAI_API_KEY = Constants.expoConfig?.extra?.openaiKey;

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
    const content = data.choices?.[0]?.message?.content || '{}';
    return JSON.parse(content);
  } catch (error) {
    console.error('AI failed, using fallback values:', error);

    // fallback
    return {
      estimatedBrewTime: 25,
      isPriority: false,
    };
  }
};

// sort tasks by priority
export const sortTasksByPriority = (tasks: any[]) => {
  return tasks.sort((a, b) => {
    if (a.isPriority && !b.isPriority) return -1;
    if (!a.isPriority && b.isPriority) return 1;
    return 0;
  });
};