import { createMMKV } from 'react-native-mmkv';

export const storage = new createMMKV();

// Check if a value is a JSON string
const isJsonString = str => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

// Set Item: Automatically handles strings and objects
const setItem = async (key, value) => {
  try {
    if (typeof value === 'object') {
      await storage.set(key, JSON.stringify(value)); // Store as JSON string
    } else {
      await storage.set(key, String(value)); // Store as string
    }
  } catch (error) {
    console.error(`Error saving key "${key}":`, error);
  }
};

// Get Item: Automatically parses JSON if necessary
const getItem = async key => {
  try {
    const value = await storage.getString(key); // Get value as string
    if (value === undefined || value === null) return null;

    // Check if value is a JSON string
    return isJsonString(value) ? JSON.parse(value) : value;
  } catch (error) {
    console.error(`Error getting key "${key}":`, error);
    return null;
  }
};

// Remove Item
const removeItem = async key => {
  try {
    await storage.remove(key);
  } catch (error) {
    console.error(`Error removing key "${key}":`, error);
  }
};

// Clear All Storage
const clearStorage = async () => {
  try {
    await storage.clearAll();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

// All key from Storage
const getAllKeys = async () => {
  try {
    return await storage.getAllKeys();
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};
export { setItem, getItem, removeItem, clearStorage, getAllKeys };
