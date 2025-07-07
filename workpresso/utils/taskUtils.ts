// utils/taskUtils.ts
import Constants from 'expo-constants';

export type TaskMetadata = {
  estimatedBrewTime: 15 | 25 | 45;
  isPriority: boolean;
};

//const BACKEND_URL = 'http://192.168.1.20:3000';
const BACKEND_URL = 'https://6d6c-2a00-1d35-c82a-b100-f5f1-4d7a-782e-9427.ngrok-free.app ';

export const getTaskMetadata = async (
  taskName: string
): Promise<TaskMetadata> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/task-metadata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: taskName }),
    });

    if (!response.ok) {
      throw new Error(`[${response.status}] Backend response not OK`);
    }

    const data = await response.json();
    console.log('[AI METADATA]', data);

    return data as TaskMetadata;
  } catch (error) {
    console.error('[TASK METADATA FALLBACK]', error);
    return {
      estimatedBrewTime: 25,
      isPriority: false,
    };
  }
};
