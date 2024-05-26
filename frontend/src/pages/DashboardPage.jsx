import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { useSelector } from 'react-redux'

const DashboardPage = () => {

    const { userInfo } = useSelector((state) => state.auth)
  return (
    <>
      <Header home={false}  />
    <main className=''>
        
        <Outlet />
    </main>
      
    </>
  )
}

export default DashboardPage
