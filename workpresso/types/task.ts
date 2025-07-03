
export interface Task {
  id: string; // unique ID for tracking
  taskName: string;
  estimatedBrewTime: number; // in minutes
  isComplete: boolean;
  isPriority: boolean;
  isTaskBrew: boolean;
}