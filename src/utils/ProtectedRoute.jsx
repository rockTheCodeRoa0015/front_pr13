import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { LoginContext } from '../provider/LoginProvider'

const ProtectedRoute = ({ redirectPath = '/' }) => {
  const { isLogin } = useContext(LoginContext)
  if (!isLogin) {
    return <Navigate to={redirectPath} replace />
  }
  return <Outlet />
}

export default ProtectedRoute
