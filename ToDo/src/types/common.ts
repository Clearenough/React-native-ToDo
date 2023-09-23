export interface ITask {
  id: number;
  text: string;
  isCompleted: boolean;
}

export type TasksState = Array<ITask>;
