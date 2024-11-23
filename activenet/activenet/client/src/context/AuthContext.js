import React, { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

// Context
export const AuthContext = createContext()

// Provider
export const AuthProvider = ({ children }) => {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [accountType, setAccountType] = useState(null)
  const [profilePicture, setProfilePicture] = useState(null)
  const [userData, setUserData] = useState(null) // Store all user data here

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      const checkAuthStatus = async () => {
        try {
          const response = await axios.get(
            'http://localhost:3001/auth/status',
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          )

          if (response.data.isAuthenticated) {
            setIsLoggedIn(true)
            setAccountType(response.data.accountType)
            setProfilePicture(response.data.profilePicture)
            setUserData(response.data.userData)
            setUserId(response.data.userId)
          } else {
            setIsLoggedIn(false)
          }
        } catch (error) {
          console.error('Error checking authentication:', error)
          setIsLoggedIn(false)
        }
      }

      checkAuthStatus()
    } else {
      setIsLoggedIn(false)
    }
  }, [
    location.pathname,
    setIsLoggedIn,
    setAccountType,
    setProfilePicture,
    setUserData,
  ]) // Only runs once when the component is mounted

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        accountType,
        setAccountType,
        profilePicture,
        setProfilePicture,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
