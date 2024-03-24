import axios from "axios";

const BASE_URL = "http://localhost:4401/api";

// ADD new TASK
export const addTask = async (taskDetails: {
  user: string;
  date: any;
  description: string;
  isImportant: boolean;
  type: string;
  RoutineType: string;
  duration: {
    hours: number;
    minutes: number;
  };
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/tasks/add-task`,
      taskDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task");
  }
};

// Fetch all tasks for the user
export const fetchAllTasks = async (UserId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tasks/tasks-by-user/${UserId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

// Update task isCompleted status
export const updateTaskIsCompleted = async (
  taskId: string,
  isCompleted: boolean
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/tasks/update-task-iscompleted/${taskId}`,
      { isCompleted }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task isCompleted status:", error);
    throw new Error("Failed to update task isCompleted status");
  }
};

// Update task progress
export const updateTaskProgress = async (
  taskId: string,
  progressHours: number,
  progressMinutes: number
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/tasks/update-task-progress/${taskId}`,
      { progressHours, progressMinutes }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task progress:", error);
    throw new Error("Failed to update task progress");
  }
};
// Delete task by ID
export const deleteTask = async (taskId: string) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/tasks/delete-task/${taskId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
};
