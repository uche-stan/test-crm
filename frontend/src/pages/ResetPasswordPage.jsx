import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, reset } from "../features/auth/authSlice";
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { Toast } from '../features/auth/authService'



const ResetPasswordPage = () => {

    const [formData, setFormData] = useState({
        "email": "",
    })

    const { email } = formData


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email
        }

        dispatch(resetPassword(userData))
    }

 

      useEffect(() => {
        if (isError) {
            Toast.fire({
                icon: 'error',
                title: "Something went wrong",
            });
        }
       

        if (isSuccess ) {
            navigate("/")
            Toast.fire({
                icon: 'success',
                title: "A reset password email has been sent to you.",
            });
        }

        dispatch(reset())

        
    }, [isError, isSuccess, message, navigate, dispatch])



  return (
    <>

<div className="max-w-lg mx-auto my-6 border px-12 py-12 mt-40">

    <h2 className="text-center ">Reset Password</h2>
  <form >
  <>
        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
            </label>
            <input
            
            type="email"
            id="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={email}
            required

            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
            `}  
            />

        </div>


      </>

    <button
    onClick={handleSubmit}
      className="w-full bg-pink-500 text-white hover:bg-ink-700 px-3 py-2 my-2 rounded-md"
      type="submit"
    >
      {isLoading? "Loading..." : "Reset Password"}
    </button>
  </form>
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

export default ResetPasswordPage
