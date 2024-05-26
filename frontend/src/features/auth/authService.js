import axios from  'axios'
import Swal from 'sweetalert2';

const BACKEND_DOMAIN = "http://localhost:9100"

const REGISTER_URL = `${BACKEND_DOMAIN}/api/auth/users/`
const LOGIN_URL = `${BACKEND_DOMAIN}/api/auth/jwt/create/`
const ACTIVATE_URL = `${BACKEND_DOMAIN}/api/auth/users/activation/`
const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/api/auth/users/reset_password/`
const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/auth/users/reset_password_confirm/`
const GET_USER_INFO = `${BACKEND_DOMAIN}/api/auth/users/me/`

// SweetAlert Toaster
export const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    timer: 1500,
    showConfirmButton: false,
    timerProgressBar: false,
    showConfirmButton: false,
});


// register user
export const register = async (userData) => {
   
    const response = await axios.post(REGISTER_URL, userData, {
        headers:{
          'Content-Type': 'application/json'
        },
        
      })

      return response.data

}


// activate account 
export const activate = async (userData) => {

    const response = await axios.post(ACTIVATE_URL, userData,  {
        headers:{
            'Content-Type': 'application/json'
          },
    })
       return response.data
   
}


// Login user 
export const login = async (userData) => {

    const {data} = await axios.post(LOGIN_URL, userData,  {
        headers:{
            'Content-Type': 'application/json'
          },
    })
       
    if (data) {
        localStorage.setItem('user', JSON.stringify(data))
        console.log(data)
    }

    return data;
   
}


// Get user information
export const getUserInfo = async (accessToken) => {

    const {data, status} = await axios.get(GET_USER_INFO,  {
        headers:{
            "Authorization": `Bearer ${accessToken}`
          },
    })
    // console.log(status)
    //   console.log(data)
       return data
   
}


// Logout User

export const logout = async() => {

    return localStorage.removeItem("user")

}


// Reset Password 

export const resetPassword = async (userData) => {

    const response = await axios.post(RESET_PASSWORD_URL, userData,  {
        headers:{
            'Content-Type': 'application/json'
          },
    })
       return response.data
   
}


// Reset Password Confirm

export const resetPasswordConfirm = async (userData) => {

    const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, userData,  {
        headers:{
            'Content-Type': 'application/json'
          },
    })
       return response.data
   
}


// Update user
export const updateUser = async (userData, accessToken) => {
   
    const response = await axios.patch(GET_USER_INFO, userData, {
        headers:{
           
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${accessToken}`,
          },
        
      })

      return response.data

}




const authService = {register, activate, login, getUserInfo, logout, resetPassword, resetPasswordConfirm, updateUser}
export default authService;