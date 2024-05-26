import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useFormik } from "formik";
import { resetPasswordConfirm, reset } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { Toast } from '../features/auth/authService'
import { signUpSchema } from '../utils/schemas'


const ResetPasswordConfirmPage = () => {

    const { uid, token } = useParams()
    const [formData, setFormData] = useState({
        'new_password': '',
        're_new_password': ''
    })

    const { new_password, re_new_password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
            uid,
            token,
            new_password,
            re_new_password
        }

        dispatch(resetPasswordConfirm(userData))
    }
  
     
      useEffect(() => {
        if (isError) {
            Toast.fire({
                icon: 'error',
                title: "Something went wrong",
            });
            
        }
        if (isSuccess) {
            navigate("/login")
            Toast.fire({
                icon: 'success',
                title: "Your password was reset successfully."
            });
            

        }
       
        dispatch(reset())

    }, [isError, isSuccess, message, navigate, dispatch])


  return (
    <>

<div className="max-w-lg mx-auto my-6 border px-12 py-12 mt-40">
  <form  >
  <>
       

        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="new_password" className="leading-7 text-sm text-gray-600">
            New Password
            </label>
            <input
            
            type="text"
            id="new_password"
            name="new_password"
            placeholder="Password"
            onChange={handleChange}
            value={new_password}
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
           `}
            />

        </div>

        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="re_new_password" className="leading-7 text-sm text-gray-600">
            Reconfirm New Password
            </label>
            <input
            
            type="text"
            id="re_new_password"
            name="re_new_password"
            placeholder="Reconfirm Password"
            onChange={handleChange}
            value={re_new_password}
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
        {isLoading? "Loading..." : "Set New Password"}
        </button>
  </form>
  <div className="my-3 py-3 border-t  border-grey-200 flex justify-center">
    <p>Already have an account? <Link className="hover:text-pink-700 text-pink-500 underline decoration-pink-500 " to="/login">Log in here</Link></p>
  </div>

</div>


            


    </>
  )
}

export default ResetPasswordConfirmPage