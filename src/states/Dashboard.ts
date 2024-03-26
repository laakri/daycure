// frontend/src/api/dashboard.ts

import axios from "axios";

const BASE_URL = "http://localhost:4401/api";

// Add widget to user's dashboard
export const addWidgetToDashboard = async (widget: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/widgets/add`, {
      widget,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding widget to dashboard:", error);
    throw new Error("Failed to add widget to dashboard");
  }
};

// Delete widget from user's dashboard
export const deleteWidgetFromDashboard = async (widget: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/user/widgets/delete`, {
      data: { widget },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting widget from dashboard:", error);
    throw new Error("Failed to delete widget from dashboard");
  }
};
export const fetchUserWidgets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/widgets`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user's widgets:", error);
    throw new Error("Failed to fetch user's widgets");
  }
};
