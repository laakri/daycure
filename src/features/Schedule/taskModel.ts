interface Task {
  _id: string;
  user: string;
  date: Date;
  description: string;
  isImportant: boolean;
  isCompleted: boolean;
  position: any;
  type: TaskType;
}

export enum TaskType {
  Goal = "Goal",
  Social = "Social",
  Routine = "Routine",
  Timing = "Timing",
  Normal = "Normal",
}

export default Task;
