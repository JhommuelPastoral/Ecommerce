import {auth, provider, signInWithPopup} from '../../firebase/firebase.js'
import axiosInstance from './axios.js';
export const handleGoogleLogin = async() => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user;
    return user;
  } catch (error) {
    // console.log(error);
  }
}

export const login = async (data) => {
  try {
    const response = await axiosInstance.post('/api/auth/googleLogin', data);
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const getAuthUser = async() => {
  try {
    const response = await axiosInstance.get('/api/auth/me');
    return response.data
  } catch (error) {
    return null
  }
}

export const onboard = async ({password}) => {
  try {
    const response = await axiosInstance.post('/api/auth/onboard', {password});
    return response.data
  } catch (error) {
    throw error
  }
}

export const signUp = async ({name, email, password}) => {
  try {
    const response = await axiosInstance.post('/api/auth/signup', {name, email, password});
    return response.data
  } catch (error) {
    throw error
  }
}

export const userLogin = async ({email, password}) => {
  try {
    const response = await axiosInstance.post('/api/auth/userLogin', {email, password});
    return response.data
  } catch (error) {
    throw error
  }
}