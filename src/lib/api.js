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
    console.log("Login error", error);
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