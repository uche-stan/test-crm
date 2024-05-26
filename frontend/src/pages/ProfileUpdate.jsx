import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const { profile, status, error, profileDetail } = useSelector((state) => state.user);

  const [profileData, setProfileData] = useState({
    full_name: profile.full_name,
    profession: profile.profession,
  
    profile_image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProfileData({
      ...profileData,
      profile_image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('full_name', profileData.full_name);
    formData.append('profession', profileData.profession);
   
    if (profileData.profile_image) {
      formData.append('profile_image', profileData.photo);
    }
    dispatch(updateProfile(formData));
  };

  return (
    <div className='my-8 py-5'>
      <h2 className='pb-10'>Update Profile {profileData.full_name} </h2>
      {status === 'loading' && <p>Loading...</p>}
      {/* {status === 'failed' && <p>Error: {error}</p>} */}
      <p>{status === 'failed' &&  "error occured"}</p>
      {status === 'succeeded' && <p>Profile updated successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="relative mr-4 w-full mb-3 ">
          <label  htmlFor="full_name" className="leading-7 text-sm text-gray-600">Full Name:</label>
          <input
            type="text"
            name="full_name"
            id='full_name'
            value={profileData.full_name}
            onChange={handleChange}
            className={`w-3/5 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
            `}
          />
        </div>
        <div>
          <label htmlFor="profession" className="leading-7 text-sm text-gray-600">Profession:</label>
          <input
            type="text"
            name="profession"
            id='profession'
            value={profileData.profession}
            onChange={handleChange}
            className={`w-3/5 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
            `}
          />
        </div>
       
        <div>
          <label htmlFor="profile_image" className="leading-7 text-sm text-gray-600">Profile Image:</label>
          <input
            type="file"
            id='profile_image'
            name="profile_image"
            onChange={handleFileChange}
            className={`w-3/5 my-5 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-pink-200 focus:bg-transparent focus:border-pink-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
            `}
          />
        </div>
        <button  className="w-full bg-pink-500 mt-5 text-white hover:bg-ink-700 px-3 py-2 my-2 rounded-md" type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
