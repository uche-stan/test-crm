import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserInfo, reset } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import { Toast } from '../features/auth/authService'


const ProfilePage = () => {
  const { user, isLoading, isError, isSuccess, message, userInfo} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
   
  //   useEffect(() => {
     
  //     if (userInfo ) {
        
  //       Toast.fire({
  //           icon: 'success',
  //           title: "Successfully updated"
  //       });
       
  //   }
  //     dispatch(reset())
  //   dispatch(getUserInfo())
        

  // }, [])

  return (
    <>

  <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-10 items-center justify-center flex-col">
    <img
      className="lg:w-1/6 md:w-2/6 w-3/6 mb-10 object-cover object-center rounded"
      alt="hero"
      src={userInfo.photo}
    />
    <div className="text-center lg:w-2/3 w-full">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
      {userInfo?.full_name}
      </h1>
      <div className="mb-8 leading-relaxed flex flex-col justify-start">
      <p>Profession: {userInfo.profession} </p>
         <p>Email: {userInfo?.email} </p>
         <p>Phone: {userInfo.phone} </p>
         <p>Gender: {userInfo.gender} </p>
         <p>City: {userInfo.city} </p>
         <p>State: {userInfo.state} </p>
         <p>Address: {userInfo.address} </p>
         <p>Country: {userInfo.country} </p>
      </div>
      <div className="flex justify-center">
        <Link to={`/dashboard/profile/${userInfo.id}/edit`} className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
          Edit
        </Link>

    
        <button className="ml-4 inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
          Delete
        </button>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default ProfilePage
