interface Task {
  _id: string;
  user: string;
  date: Date;
  description: string;
  isImportant: boolean;
  isCompleted: boolean;
  position: any;
  type: TaskType;
  duration: {
    hours: number;
    minutes: number;
  } | null;
  subType: eventType;
 
  progress: {
    hours: number;
    minutes: number;
  } | null;
}

export enum TaskType {
  Goal = "Goal",
  Social = "Social",
  Routine = "Routine",
  Timing = "Timing",
  Normal = "Normal",
}
export enum eventType {
  birthday = "birthday",
  wedding = "wedding",
  party = "party",
  event = "event",
}

export default Task;
