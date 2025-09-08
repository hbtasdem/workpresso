// lib/api.ts
const BACKEND_URL = 'https://b19a5afb59b9.ngrok-free.app';
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