interface Task {
  _id: string;
  user: string;
  date: Date;
  description: string;
  isImportant: boolean;
  isCompleted: boolean;
  position: any;
  __v: number;
}

export default Task;
