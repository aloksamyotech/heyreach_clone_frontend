import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { APIconfig, baseUrl } from 'utils/constant';

export const post = async (endpoint, data) => {
  try {
    const response = await axios.post(`${baseUrl}/${endpoint}`, data, APIconfig);
    return response.data;
  } catch (error) {
    console.error('Error posting data', error);
    throw error;
  }
};

export const fetchData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data', error);
    throw error;
  }
};

export const putData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data', error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error deleting data', error);
    throw error;
  }
};
