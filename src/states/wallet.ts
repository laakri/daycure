import axios from "axios";

const BASE_URL = "http://localhost:4401/api";

//fetch All Categories
export const fetchAllCategories = async () => {
  try {
    /* const UserId = localStorage.getItem("userId");*/
    const UserId = "65c62e1585bc357e64c9f354";
    const response = await axios.get(
      `${BASE_URL}/category/categories/${UserId}`
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching categories", err);
    throw new Error("Error fetching categories");
  }
};

// Function to add a new category
export const addCategory = async (category: string) => {
  try {
    const UserId = "65c62e1585bc357e64c9f354";

    const response = await axios.post(
      `${BASE_URL}/category/categories/${UserId}`,
      { category }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding category to user:", error);
    throw new Error("Failed to add category to user");
  }
};
// Function to delete a category
export const deleteCategory = async (categoryName: string) => {
  try {
    const UserId = "65c62e1585bc357e64c9f354";
    const response = await axios.delete(
      `${BASE_URL}/category/categories/${UserId}/${categoryName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new Error("Failed to delete category");
  }
};

//Create a new transaction
export const addTransaction = async (transactionDetails: {
  amount: number;
  date: Date;
  description: string;
  isExpense: boolean;
  userId: string;
  category: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/transactions/transaction`, {
      amount: transactionDetails.amount,
      date: transactionDetails.date, // Convert Date to string
      description: transactionDetails.description,
      isExpense: transactionDetails.isExpense,
      userId: transactionDetails.userId,
      category: transactionDetails.category,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error("Failed to create transaction");
  }
};
//fetch All transactions
export const fetchAllTransactions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions/transactions`);
    return response.data;
  } catch (err) {
    console.error("Error fetching transactions", err);
    throw new Error("Error fetching transactions");
  }
};
