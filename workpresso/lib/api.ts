// lib/api.ts
const BACKEND_URL = 'https://6d6c-2a00-1d35-c82a-b100-f5f1-4d7a-782e-9427.ngrok-free.app';
export async function fetchTaskMetadata(task: string) {
  const response = await fetch(`${BACKEND_URL}/api/task-metadata`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch task metadata');
  }

  return await response.json(); // { estimatedBrewTime, isPriority }
}