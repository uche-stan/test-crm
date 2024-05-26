import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user? user : null,
    userInfo: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    token: localStorage.getItem('user') || null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
            
        }
    },

    extraReducers: (builder)=>{
        builder
        // Register
        .addCase(register.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.message = action.payload
            

        })
        .addCase(register.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
           
        })

        // Activate user
        .addCase(activate.pending, (state)=>{
            state.isLoading = true
         })
         .addCase(activate.fulfilled, (state, action)=>{
            state.isLoading = false   
            state.user = action.payload
            state.isSuccess = true
            
         })
         .addCase(activate.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.user = null
         })

          // Login user
        .addCase(login.pending, (state)=>{
            state.isLoading = true
         })
         .addCase(login.fulfilled, (state, action)=>{
            state.isLoading = false   
            state.user = action.payload
            state.isSuccess = true
            
         })
         .addCase(login.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.user = null
            state.message = action.payload
         })

          //  Get User Information
          .addCase(getUserInfo.fulfilled, (state, action) => {
            state.userInfo = action.payload
        })

          // Logout
          .addCase(logout.fulfilled, (state)=>{
            state.user = null
         })

          //  Reset Password
          .addCase(resetPassword.pending, (state)=>{
            state.isLoading = true
         })
         .addCase(resetPassword.fulfilled, (state, action)=>{
            state.isLoading = false   
            state.isSuccess = true
            state.user = action.payload
            
         })
         .addCase(resetPassword.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.user = null
            state.message = action.payload
         })


          //  Reset Password Confirm
          .addCase(resetPasswordConfirm.pending, (state)=>{
            state.isLoading = true
         })
         .addCase(resetPasswordConfirm.fulfilled, (state, action)=>{
            state.isLoading = false   
            state.isSuccess = true
            state.user = action.payload
            
         })
         .addCase(resetPasswordConfirm.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.user = null
            state.message = action.payload
         })

         // Update User
        .addCase(updateUser.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(updateUser.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.userInfo = action.payload
            state.message = action.payload
            state.isError = false
            state.user = action.payload
            

        })
        .addCase(updateUser.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
           
        })


         

            
    }
})

// Register 
export const register = createAsyncThunk(
    'auth/register',
    
    async(userData, thunkAPI) => {
        try {
            return authService.register(userData)
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message ||
            error.message || error.toString()
            console.log(thunkAPI.rejectWithValue(message))
            return thunkAPI.rejectWithValue(message)
        }
    },
)

// Activate account
export const activate = createAsyncThunk(
    'auth/activate',
    
    async(userData, thunkAPI) => {
        try {
            return authService.activate(userData)
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message ||
            error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    },
)

// Login
export const login = createAsyncThunk(
    'auth/login',

    async(userData, thunkAPI) => {
        try {
            return await authService.login(userData)
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message ||
            error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get user information
export const getUserInfo = createAsyncThunk(
    'auth/getUserInfo',
    
    async(_, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access
            
            return await authService.getUserInfo(accessToken)
           
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message ||
            error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    },
)

// Logout
export const logout = createAsyncThunk(
    'auth/logout',
    
    async() => {
       authService.logout()
    },
)

// Reset Password
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    
    async(userData, thunkAPI) => {
        try {
            return authService.resetPassword(userData)
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message ||
            error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    },
)


// Reset Confirm Password
export const resetPasswordConfirm = createAsyncThunk(
    'auth/resetPasswordConfirm',
    
    async(userData, thunkAPI) => {
        try {
            return authService.resetPasswordConfirm(userData)
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message ||
            error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    },
)


// Update user
export const updateUser = createAsyncThunk(
    'auth/updateUser',
    
    async(userData, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access
            
            return  authService.updateUser(userData, accessToken)
           
        } catch (error) {
            const message = error.response && error.response.data && error.response.data.message ||
            error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    },
)

export const {reset} = authSlice.actions
export default authSlice.reducer