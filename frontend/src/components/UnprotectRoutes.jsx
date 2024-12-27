import React from 'react'
import { getToken } from '../lib/utils'
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
function UnprotectRoutes() {
const token = getToken() ;
console.log(token)

if(token){
  return  <Navigate to='/' />
}
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default UnprotectRoutes
