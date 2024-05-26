import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from './app/store'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ActivatePage from './pages/ActivatePage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import EditProfilePage from './pages/EditProfilePage.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element:  <App />,
    errorElement: <h1>Error 404 Page</h1>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],

  
  },

  {
    path: 'login',
    element: <LoginPage />,
  },

  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'activate/:uid/:token',
    element: <ActivatePage />,
  },

  {
    path: 'reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: 'password/reset/confirm/:uid/:token',
    element: <ResetPasswordConfirmPage />,
  },

  {
    path: '/dashboard',
    element: <DashboardPage />,
    children: [
      {
        path: 'profile/:id',
        element: <ProfilePage />, 
      },
      {
        path: 'profile/:id/edit',
        element: <EditProfilePage />,
      },

    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
   <RouterProvider router={router} />
   </Provider>
  </React.StrictMode>,
)
