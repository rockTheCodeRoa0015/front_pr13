import React, { createContext, useEffect, useState } from 'react'
import { checkLocalStorage } from '../api/userApi'

export const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('id_pr13Jroa')) {
      checkLocalStorage(localStorage.getItem('_id_pr13Jroa'), setIsLogin)
      //setIsLogin(true)
    }
  }, [])

  const logoned = () => {
    setIsLogin(true)
  }

  const logout = () => {
    setIsLogin(false)
  }

  return (
    <LoginContext.Provider value={{ isLogin, logoned, logout }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider
