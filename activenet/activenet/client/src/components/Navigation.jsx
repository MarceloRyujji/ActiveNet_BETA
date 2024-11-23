import React, { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/Logo.png'
import style from '../styles/NavBar.module.css'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const navigate = useNavigate()
  const {
    isLoggedIn,
    setIsLoggedIn,
    userId,
    accountType,
    setAccountType,
    profilePicture,
    setProfilePicture,
    setUserData,
  } = useContext(AuthContext)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogoClick = () => {
    if (accountType) {
      if (accountType === 'user') {
        navigate('/HomePageUser')
      } else if (accountType === 'trainer') {
        navigate('/HomePageTrainer')
      }
    } else {
      navigate('/')
    }
  }

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`)
    setShowDropdown(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    setAccountType('')
    setProfilePicture('/default-profile.jpg')
    setUserData(null)
    setShowDropdown(false)
    navigate('/')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className={style.navigation}>
      {isLoggedIn ? (
        <div>
          <img
            src={logo}
            alt="Company Logo"
            onClick={handleLogoClick}
            style={{ cursor: 'pointer', width: '70px', marginTop: '4px' }}
          />
          {/* Profile picture with dropdown button */}
          <div className={style.profileContainer} ref={dropdownRef}>
            <img
              src={
                profilePicture
                  ? `http://localhost:3001${profilePicture}`
                  : '/default-profile.jpg'
              }
              className={style.profilePicture}
              onClick={toggleDropdown}
              alt="Profile"
            />
            {showDropdown && (
              <div className={style.dropdownMenu}>
                <button
                  onClick={handleProfileClick}
                  className={style.dropdownItem}
                >
                  Go Profile
                </button>
                <button onClick={handleLogout} className={style.dropdownItem}>
                  End Session
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
