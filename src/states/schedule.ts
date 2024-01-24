import axios from "axios";

const BASE_URL = "http://localhost:4401/api";

//ADD new TASK
export const addTask = async (taskDetails: {
  userId: string;
  date: Date;
  description: string;
  isImportant: boolean;
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

//Fetch all tasks for the user
export const fetchAllTasks = async (userId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tasks/tasks-by-user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};
