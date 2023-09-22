export interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
}

export type TasksState = Array<Task>;
