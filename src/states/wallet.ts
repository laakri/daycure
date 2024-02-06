import axios from "axios";

const BASE_URL = "http://localhost:4401/api";

//add Category
export const addCategory = async (categoryDetails: {
  categoryName: string;
  maxBudget: number;
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/category/category`,
      categoryDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw new Error("Failed to add category");
  }
};

//fetch All Categories
export const fetchAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category/categories`);
    return response.data;
  } catch (err) {
    console.error("Error fetching categories", err);
    throw new Error("Error fetching categories");
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
