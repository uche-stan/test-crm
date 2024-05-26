import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from "formik";
import { register, reset } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { Toast } from '../features/auth/authService'
import { signUpSchema } from '../utils/schemas'

const RegisterPage = () => {

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onSubmit =  (values, action) => {
      
        const userData = {
            full_name: values.full_name,
            email: values.email,
            password: values.password,
            re_password: values.re_password
          }
        
         dispatch(register(userData))
       
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
        validationSchema: signUpSchema,
        onSubmit,
      
      })

      useEffect(() => {
        if (isError) {
            Toast.fire({
                icon: 'error',
                title: "User already exists",
            });
        }

        if (isSuccess ) {
            navigate("/")
            Toast.fire({
                icon: 'success',
                title: "An activation email has been sent to your email. Please check your email"
            });
           
        }

        dispatch(reset())

    }, [isError, isSuccess, user, navigate, dispatch])

    


  return (
    <>

<div className="max-w-lg mx-auto my-6 border px-12 py-12 mt-40">
  <form  onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}>
  <>
        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="full_name" className="leading-7 text-sm text-gray-600">
            Full Name
            </label>
            <input
            
            type="text"
            id="full_name"
            name="full_name"
            placeholder="Full Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.full_name}
            autoComplete='given name'
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
            ${errors.full_name && touched.full_name ?  "inputError" : null} `}
            />
          <span>{errors.full_name && touched.full_name ? <span style={{ color: "red" }}>{errors.full_name}</span> : null}</span>

        </div>


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

        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="re_password" className="leading-7 text-sm text-gray-600">
            Reconfirm Password
            </label>
            <input
            
            type="text"
            id="re_password"
            name="re_password"
            placeholder="Reconfirm Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.re_password}
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
            ${errors.re_password && touched.re_password ?  "inputError" : null}`}
            />
            <span>{errors.re_password && touched.re_password ? <span style={{ color: "red" }}>{errors.re_password}</span> : null}</span>

        </div>

</>

        <button
        className="w-full bg-pink-500 text-white hover:bg-ink-700 px-3 py-2 my-2 rounded-md"
        type="submit"
        >
        {isLoading? "Loading..." : "Register"}
        </button>
  </form>
  <div className="my-3 py-3 border-t  border-grey-200 flex justify-center">
    <p>Already have an account? <Link className="hover:text-pink-700 text-pink-500 underline decoration-pink-500 " to="/login">Log in here</Link></p>
  </div>

</div>
         
     
    </>
  )
}

export default RegisterPage
