import React, {useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset, activate } from '../features/auth/authSlice'
import { Toast } from '../features/auth/authService'
import Spinner from '../components/Spinner'
const ActivatePage = () => {

  const { uid, token } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
        uid,
        token
    }
    dispatch(activate(userData))
    Toast.fire({
      icon: 'success',
      title: "Your account has been activated! You can login now"
  });
}

useEffect(() => {
    if (isError) {
      Toast.fire({
        icon: 'error',
        title: "An error has occurred"
    });
    }

    if (isSuccess) {
        navigate("/login")
    }

    dispatch(reset())

}, [isError, isSuccess, navigate, dispatch])






  return (
    <>
      
      <div className="w-2/5 m-auto px-8 text-center mt-10">

        <h1 className="text-2xl my-4">Activate account</h1>

                  {isLoading &&  "Activating..."}
        <button 
        onClick={handleSubmit}
        className="w-full bg-green-500 text-white hover:bg-green-700 px-3 py-2 my-8 rounded-md" type="submit" >
          ACTIVATE 
        </button>


        <div className=" border-t py-5 border-grey-200 my-9">
          <Link className="w-fullpx-3 py-2 my-2 rounded-md"  to="/login">Back to login</Link>

        </div>

    </div>
    </>
  )
}

export default ActivatePage
