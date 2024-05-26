import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useFormik } from "formik";
import { login, reset, getUserInfo } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { Toast } from '../features/auth/authService'
import { loginSchema } from '../utils/schemas'

const LoginPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const onSubmit =  (values, action) => {
      
    const userData = {
        email: values.email,
        password: values.password,
       
      }
    
     dispatch(login(userData))
   
  }
  const  {
    values,
    touched,
    errors,
    getFieldProps,
    handleSubmit,
    handleChange,
    handleBlur,
    handleReset,
    isSubmitting,
  
  } = useFormik({
    initialValues: {
        full_name: "",
        email: "",
        password: "",  
        re_password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  
  })

  useEffect(() => {
    if (isError) {
      Toast.fire({
          icon: 'error',
          title: "Invalid username and password",
      });
  }

  if (isSuccess ) {
   
    Toast.fire({
        icon: 'success',
        title: "Logged in successfully",
    });
    navigate("/dashboard")
}
    dispatch(reset())
    dispatch(getUserInfo())
   

   
   
}, [isError, isSuccess, user, navigate, dispatch])





  return (
    <>

<div className="max-w-lg mx-auto my-6 border px-12 py-12 mt-40">
  <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}>
  <>
        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
            </label>
            <input
            
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            autoComplete='email'
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
            ${errors.email && touched.email ?  "inputError" : null} `}  
            />
            <span>{errors.email && touched.email ? <span style={{ color: "red" }}>{errors.email}</span> : null}</span>

        </div>

        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
            Password
            </label>
            <input
            
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
            ${errors.password && touched.password ?  "inputError" : null}`} 
             />
            <span>{errors.password && touched.password ? <span style={{ color: "red" }}>{errors.password}</span> : null}</span>

        </div>

      </>

    <button
      className="w-full bg-pink-500 text-white hover:bg-ink-700 px-3 py-2 my-2 rounded-md"
      type="submit"
    >
      {isLoading? "Loading..." : "Login"}
    </button>
  </form>
  <div className="my-3 py-2 border-t  border-grey-200 ">
    <Link
      className="text-pink-500 hover:text-pink-700 hover:underline"
      to="/reset-password"
    >
      Forgot password?
    </Link>
  </div>
  <div className="my-5 py-5 border-t  border-grey-200 flex justify-center  ">
    <p>
      {" "}
      Don't have an account?{" "}
      <Link
        className="hover:text-pink-700 text-pink-500 underline decoration-pink-500"
        to="/register"
      >
        {" "}
        Sign up here
      </Link>
    </p>
  </div>
</div>
                   
      
    </>
  )
}

export default LoginPage
