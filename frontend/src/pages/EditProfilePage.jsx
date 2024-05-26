import React, {useState, useEffect, useCallback} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getUserInfo, updateUser } from '../features/auth/authSlice'
import { Toast } from '../features/auth/authService'
import axios from 'axios'

const EditProfilePage = () => {
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, message, userInfo, token} = useSelector((state) => state.auth)

    const [profileData, setProfileData] = useState({
        'full_name': "",
        'profession': "",


        'profession': '',
        'email': "",
        'phone': '',
        'gender': '',
        'city': '',
        'state': '',
        'address': '',
        'zip': '',
        'country': '',
        'p_image': "",
    })

    // fetch user data
    useEffect(() => {
        const token =  JSON.parse(localStorage.getItem("user"))
        const accessToken  = token.access
        console.log(token.access)
        const fetchUser = async () => {
         
         try {
          const {data, status} = await axios.get("http://localhost:9100//api/auth/users/me/", {
         
          headers:{
              "Authorization": `Bearer ${accessToken}`
            },
      })
  
      setProfileData({
          'full_name': data.full_name ,
          'profession': data.profession,
  
  
          'profession': data.profession,
          'email': data.email,
          'phone': data.phone,
          'gender': data.gender,
          'city': data.city,
          'state': data.state,
          'address': data.address,
          'zip': data.zip,
          'country': data.country,
          'p_image': data.p_image,
          
      })
  
      return data
      
         } catch (error) {
          
          console.error(error.response)
         }
        
        }
        fetchUser()
      }, [])

   

    const handleChange = useCallback(e => { 
        setProfileData((prev)=> ({
          ...prev,
          [e.target.name]: e.target.value
        }))
    })

    const handleFileChange = (e) => {
        setProfileData({
            ...profileData,
            p_image: e.target.files[0]
        })
      }


    const handleSubmit = e => {
        e.preventDefault()


          const formData = new FormData();
          formData.append('full_name', profileData.full_name);
         
          formData.append('profession', profileData.profession);
          formData.append('email', profileData.email);
          formData.append('phone', profileData.phone);
          formData.append('gender', profileData.gender);
          formData.append('city', profileData.city);
          formData.append('state', profileData.state);
          formData.append('zip', profileData.zip);
          formData.append('address', profileData.address);
          formData.append('country', profileData.country);
     

          if (profileData.p_image !== profileData.photo) {
            formData.append('p_image', userInfo.photo);
          }
        
           
            dispatch(updateUser(formData))
            setTimeout(()=>{ window.location.reload(), 1500})
    }
    
   
  

    useEffect(() => {
        if (isError) {
            Toast.fire({
                icon: 'error',
                title:  "Something went wrong"
            });
        }

        if (isSuccess ) {
        
            Toast.fire({
                icon: 'success',
                title: "Successfully updated"
            });
           
        }
        
    //    dispatch(reset())
      

    }, [isError, isSuccess, user, navigate, dispatch])
      


  return (
    <>
   
<div className="max-w-lg mx-auto my-6 border px-12 py-12 mt-10">
  <form  >
  
        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="full_name" className="leading-7 text-sm text-gray-600">
          
            </label>
            <input
            
            type="text"
            id="full_name"
            name="full_name"
            placeholder='Full Name'
            onChange={handleChange}
       
            value={profileData.full_name}
            autoComplete='given name'
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
            `}
            />

        </div>


        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="profession" className="leading-7 text-sm text-gray-600">
            </label>
            <input
            type="text"
            id="profession"
            name="profession"
            placeholder="Profession"
            onChange={handleChange}
            value={profileData.profession}
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
           `}
            />

        </div>


        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
        
            </label>
            <input
            
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={profileData.email}
            autoComplete='email'
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
          `}
            />

        </div>

        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
            </label>
            <input
            type="text"
            id="phone"
            name="phone"
            placeholder='Phone Number'
            onChange={handleChange}
            value={profileData.phone}
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
           `}
            />

        </div>

        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="gender" className="leading-7 text-sm text-gray-600">
            </label>
            <input
            type="text"
            id="gender"
            name="gender"
            placeholder='Gender'
            onChange={handleChange}
            value={profileData.gender}
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
           `}
            />

        </div>

        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
            </label>
            <input
            type="text"
            id="city"
            name="city"
            placeholder='City'
            onChange={handleChange}
         
            value={profileData.city}
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
           `}
            />

        </div>

        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
            </label>
            <input
            type="text"
            id="state"
            name="state"
            placeholder='State'
            onChange={handleChange}
            value={profileData.state}
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
           `}
            />

        </div>

        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            </label>
            <input
            type="text"
            id="address"
            name="address"
            placeholder='Address'
            onChange={handleChange}
            value={profileData.address}
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
           `}
            />

        </div>

        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="zip" className="leading-7 text-sm text-gray-600">
            </label>
            <input
            type="text"
            id="zip"
            name="zip"
            placeholder='Zip'
            onChange={handleChange}
            value={profileData.zip}
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
           `}
            />

        </div>

        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="country" className="leading-7 text-sm text-gray-600">
            </label>
            <input
            type="text"
            id="country"
            name="country"
            placeholder='Country'
            onChange={handleChange}
            value={profileData.country}
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
           `}
            />

        </div>

        <div className="relative mr-4 w-full mb-3 ">
            <label htmlFor="p_image" className="leading-7 text-sm text-gray-600">
            </label>
            <input
            type="file"
            id="p_image"
            name="p_image"

            onChange={handleFileChange}
          
            className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
           `}
            />

        </div>


        <button
        onClick={handleSubmit}
        className="w-full bg-pink-500 text-white hover:bg-ink-700 px-3 py-2 my-2 rounded-md"
        type="submit"
        >
        {isLoading? "Loading..." : "Save"}
        </button>
  </form>
  <div className="my-3 py-3 border-t  border-grey-200 flex justify-center">
    <p> <Link className="hover:text-pink-700 text-pink-500 underline decoration-pink-500 " to={`/dashboard/profile/1`}>Back to Profile</Link></p>
  </div>

</div>
    
    </>
  )
}

export default EditProfilePage
