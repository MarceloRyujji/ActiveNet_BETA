import React, { useContext, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router-dom'

function withAuthProtection(WrappedComponent) {
  return function ProtectedComponent(props) {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
      const token = localStorage.getItem('authToken')
      if (!token) {
        setIsLoggedIn(false)
        navigate('/')
        return
      }

      const checkAuthStatus = async () => {
        try {
          const response = await fetch('http://localhost:3001/auth/status', {
            headers: { Authorization: `Bearer ${token}` },
            credentials: 'include',
          })
          const data = await response.json()

          if (data.isAuthenticated) {
            setIsLoggedIn(true)
          } else {
            setIsLoggedIn(false)
            navigate('/')
          }
        } catch (error) {
          console.error('Error checking authentication:', error)
          setIsLoggedIn(false)
          navigate('/')
        }
      }

      checkAuthStatus()
    }, [isLoggedIn, navigate, setIsLoggedIn])

    return isLoggedIn ? <WrappedComponent {...props} /> : null
  }
}

export default withAuthProtection
