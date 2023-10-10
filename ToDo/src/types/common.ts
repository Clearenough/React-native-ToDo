export interface ITask {
  id: string;
  text: string;
  isCompleted: boolean;
}

export type TasksState = Array<ITask>;
