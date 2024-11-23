import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import withAuthProtection from '../context/Authentication'
// import style from '../styles/UserProfile.css'

function UserProfile() {
  const { id } = useParams()
  const [userData, setUserData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState()

  useEffect(() => {
    fetch(`http://localhost:3001/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data)
        setFormData({
          ...data,
          socialMediaLinks: data.socialMediaLinks || {
            facebook: '',
            instagram: '',
          },
        })
      })
      .catch((error) => console.error('Error fetching user data:', error))
  }, [id])

  const handleEditClick = () => setIsEditing(true)

  const handleUploadClick = () => {
    const updatedData = { ...formData }

    fetch(`http://localhost:3001/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then(() => {
        // Make a new GET request to get the updated data
        fetch(`http://localhost:3001/users/${id}`)
          .then((response) => response.json())
          .then((updatedData) => {
            console.log('Updated data from server:', updatedData)

            // Update the status with the new data
            setUserData(updatedData)
            setFormData(updatedData)
            setIsEditing(false)
          })
          .catch((error) =>
            console.error('Error fetching updated user data:', error)
          )
      })
      .catch((error) => console.error('Error updating user data:', error))
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith('socialMediaLinks.')) {
      const socialkey = name.split('.')[1]
      setFormData((prevFormData) => ({
        ...prevFormData,
        socialMediaLinks: {
          ...prevFormData.socialMediaLinks,
          [socialkey]: value,
        },
      }))
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const formDataFile = new FormData()
    formDataFile.append('profilePicture', file)

    fetch(`http://localhost:3001/users/upload-profile-picture/${id}`, {
      method: 'POST',
      body: formDataFile,
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData({ ...formData, profilePicture: data.profilePicture })
        setUserData((prevData) => ({
          ...prevData,
          profilePicture: data.profilePicture,
        }))
      })
      .catch((error) =>
        console.error('Error uploading profile picture:', error)
      )
  }

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth)
    const diffMs = Date.now() - dob.getTime()
    const ageDt = new Date(diffMs)
    return Math.abs(ageDt.getUTCFullYear() - 1970)
  }

  if (!userData) {
    return <div>Loading profile...</div>
  }

  const {
    firstName,
    lastName,
    gender = 'Not available',
    dateOfBirth,
    city = 'Not available',
    availableHours = 'Not available',
    specialties = 'Not available',
    biography = 'Not available',
    email,
    phone = 'Not available',
    profilePicture = '/public/default-profile.jpg',
    socialMediaLinks = {},
  } = userData

  const age = calculateAge(dateOfBirth)
  const facebookLink = socialMediaLinks?.facebook || ''
  const instagramLink = socialMediaLinks?.instagram || ''

  return (
    <div>
      <h2>
        Profile of {firstName} {lastName}
      </h2>
      <div>
        <img
          src={`http://localhost:3001${profilePicture}`}
          alt="Profile"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
        {isEditing ? (
          <input type="file" onChange={handleFileChange} />
        ) : (
          <p></p>
        )}
        <p>
          <strong>Name:</strong>{' '}
          {isEditing ? (
            <div>
              <input
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
              />
              <input
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
              />
            </div>
          ) : (
            `${firstName} ${lastName}`
          )}
        </p>
        <p>
          <strong>Gender:</strong>{' '}
          {isEditing ? (
            <input
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
            />
          ) : (
            gender
          )}
        </p>
        <p>
          <strong>Date of Birth:</strong>{' '}
          {isEditing ? (
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth || ''}
              onChange={handleChange}
            />
          ) : (
            new Date(dateOfBirth).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
          )}
        </p>
        <p>
          <strong>Age:</strong> {age} years
        </p>
        <p>
          <strong>City:</strong>{' '}
          {isEditing ? (
            <input
              name="city"
              value={formData.city || ''}
              onChange={handleChange}
            />
          ) : (
            city
          )}
        </p>
        <p>
          <strong>Available Hours:</strong>{' '}
          {isEditing ? (
            <input
              name="availableHours"
              value={formData.availableHours || ''}
              onChange={handleChange}
            />
          ) : (
            availableHours
          )}
        </p>
        <p>
          <strong>Specialties:</strong>{' '}
          {isEditing ? (
            <input
              name="specialties"
              value={formData.specialties || ''}
              onChange={handleChange}
            />
          ) : (
            specialties
          )}
        </p>
        <p>
          <strong>Biography:</strong>{' '}
          {isEditing ? (
            <textarea
              name="biography"
              value={formData.biography || ''}
              onChange={handleChange}
            />
          ) : (
            biography
          )}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong>{' '}
          {isEditing ? (
            <input
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
            />
          ) : (
            phone
          )}
        </p>

        <h3>Social Media:</h3>
        <p>
          Facebook:{' '}
          {isEditing ? (
            <input
              name="socialMediaLinks.facebook"
              value={formData.socialMediaLinks?.facebook || ''}
              onChange={handleChange}
            />
          ) : (
            <a href={facebookLink} target="_blank" rel="noopener noreferrer">
              {facebookLink || 'No Facebook link'}
            </a>
          )}
        </p>
        <p>
          Instagram:{' '}
          {isEditing ? (
            <input
              name="socialMediaLinks.instagram"
              value={formData.socialMediaLinks?.instagram || ''}
              onChange={handleChange}
            />
          ) : (
            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              {instagramLink || 'No Instagram link'}
            </a>
          )}
        </p>

        {isEditing ? (
          <button onClick={handleUploadClick}>Upload</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
    </div>
  )
}

export default withAuthProtection(UserProfile)
