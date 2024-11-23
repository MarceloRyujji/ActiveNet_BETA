import React, { useState, useContext, useEffect, useMemo } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ConfigContext } from '../context/ConfigContext'
import { useNavigate } from 'react-router-dom'
import { Link, animateScroll as scroll } from 'react-scroll'
import withAuthProtection from '../context/Authentication'
import { EventContext } from '../services/EventCreatorService'
import style from '../styles/EventCreator.css'

const EventComponent = () => {
  const navigate = useNavigate()
  const { userId, profilePicture, userData } = useContext(AuthContext)
  const {
    countries,
    fetchCities,
    allCities,
    cities,
    fetchPostalCodes,
    postalCodes,
    eventTypes,
    fetchEvents,
  } = useContext(ConfigContext)

  const {
    createEvent,
    events,
    incrementGoCount,
    deleteEvent,
    error,
    isLoading,
    getGoCount,
    updateEvent,
  } = useContext(EventContext)

  const [isCreatingEvent, setIsCreatingEvent] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    country: '',
    city: '',
    address: '',
    eventType: '',
    postalCode: '',
    date: '',
    time: '',
  })
  const [expandedDescriptions, setExpandedDescriptions] = useState(false)
  const [goCounts, setGoCounts] = useState({})

  const safeEvents = Array.isArray(events) ? events : []

  const MAX_DESCRIPTION_LENGTH = 150

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [events])

  useEffect(() => {
    const fetchGoCounts = async () => {
      const counts = {}
      for (const event of events) {
        const goCount = await getGoCount(event._id)
        counts[event._id] = goCount
      }
      setGoCounts(counts)
    }

    if (events.length > 0) {
      fetchGoCounts()
    }
  }, [events, getGoCount])

  // Fetch cities when a country is selected
  useEffect(() => {
    if (formData.country) {
      fetchCities(formData.country)
    }
  }, [formData.country, fetchCities])

  // Fetch postal codes when a city is selected
  useEffect(() => {
    if (formData.city) {
      fetchPostalCodes(formData.city)
    }
  }, [formData.city, fetchPostalCodes])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCreateEvent = () => setIsCreatingEvent(true)

  const handleCancel = () => setIsCreatingEvent(false)

  const handleEditEvent = (event) => {
    setIsCreatingEvent(true)
    setEditingEvent(event)

    const dateTime = event.dateTime ? new Date(event.dateTime) : null

    setFormData({
      title: event.title || '',
      description: event.description || '',
      country: event.location?.country || '',
      city: event.location?.city || '',
      address: event.location?.address || '',
      eventType: event.eventType || '',
      postalCode: event.location?.postalCode || '',
      date: dateTime ? dateTime.toISOString().split('T')[0] : '',
      time: dateTime ? dateTime.toISOString().split('T')[1].slice(0, 5) : '',
    })

    scroll.scrollTo('event-form-section', {
      smooth: true,
      offset: -100,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedEvent = {
      ...formData,
      dateTime: new Date(`${formData.date}T${formData.time}`),
    }

    const currentDate = new Date()
    const inputDate = new Date(formData.date)

    if (isNaN(inputDate.getTime()) || inputDate < currentDate) {
      alert('Please select a valid date in the future.')
      return
    }

    if (inputDate.getFullYear() > currentDate.getFullYear() + 1) {
      alert('The year must not exceed 1 year from now.')
      return
    }

    try {
      if (editingEvent) {
        updatedEvent.id = editingEvent._id
        await updateEvent(updatedEvent)
        // alert('Event updated successfully')
      } else {
        await createEvent(updatedEvent)
        // alert('Event created successfully')
      }

      setFormData({
        title: '',
        description: '',
        country: '',
        city: '',
        address: '',
        eventType: '',
        postalCode: '',
        date: '',
        time: '',
      })
      setEditingEvent(null)
      setIsCreatingEvent(false)
    } catch (err) {
      console.error('Error updating/creating event:', err)
      alert('Failed to update the event. Please try again.')
    }
  }

  const formatDate = (isoDate) => {
    if (!isoDate) return ''
    const date = new Date(isoDate)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }

  const formatTime = (isoDate) => {
    if (!isoDate) return ''
    const date = new Date(isoDate)
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`)
  }

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleGo = (eventId) => {
    incrementGoCount(eventId)
    setGoCounts((prevCounts) => ({
      ...prevCounts,
      [eventId]: (prevCounts[eventId] || 0) + 1,
    }))
  }

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId)
  }

  return (
    <div className="event-container">
      <button onClick={handleCreateEvent} className="create-event-btn">
        Post Event
      </button>
      <div id="event-form-section">
        {isCreatingEvent && (
          <div className="event-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Event Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Describe your event..."
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <div>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Country</option>
                  {countries.map((country) => (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              {formData.country && (
                <div>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">City</option>
                    {cities[formData.country]?.map((city) => (
                      <option key={city._id} value={city._id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              {formData.city && (
                <div>
                  <select
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Postal Code</option>
                    {postalCodes[formData.city]?.map((postalCode) => (
                      <option key={postalCode._id} value={postalCode.code}>
                        {postalCode.postalCode}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select an Event Type</option>
                  {eventTypes.map((eventType) => (
                    <option key={eventType._id} value={eventType.name}>
                      {eventType.eventType}
                    </option>
                  ))}
                </select>
              </div>
              <div className="date-time-container">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="small-input"
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="small-input"
                />
              </div>
              <br />
              <button type="submit">Publish</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="events-list">
        {sortedEvents.length === 0 ? (
          <p>No events found</p>
        ) : (
          sortedEvents.map((event) => {
            const cityName =
              allCities.find(
                (city) => city._id === (event.location?.city || '')
              )?.name || 'City not avaliable'
            const countryName =
              countries.find(
                (country) => country._id === (event.location?.country || '')
              )?.name || 'Unknown Country'

            return (
              <div key={event._id} className="event-card">
                <div className="user-info">
                  <img
                    src={
                      `http://localhost:3001${profilePicture}` ||
                      '/default-profile.jpg'
                    }
                    alt="User  profile"
                    className="profile-pic"
                    onClick={handleProfileClick}
                  />
                  <a className="user-name" onClick={handleProfileClick}>
                    {userData
                      ? `${userData.firstName} ${userData.lastName}`
                      : 'Loading...'}
                  </a>
                </div>
                <p>
                  <strong>Event:</strong> {event.title}
                </p>
                <hr />
                <p>
                  {event.description &&
                  event.description.length > MAX_DESCRIPTION_LENGTH &&
                  !expandedDescriptions[event._id]
                    ? event.description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
                    : event.description}
                  {event.description &&
                    event.description.length > MAX_DESCRIPTION_LENGTH && (
                      <button
                        className="noButton"
                        type="button"
                        onClick={() => toggleDescription(event._id)}
                      >
                        {expandedDescriptions[event._id]
                          ? '  !Show Less'
                          : 'Show More'}
                      </button>
                    )}
                </p>
                <hr />
                <p>
                  <strong>Location:</strong> {cityName}, {countryName}
                </p>
                <p>
                  <strong>Address:</strong>{' '}
                  {event.location?.address || 'No available'}
                </p>
                <p>
                  <strong>Postal Code:</strong>{' '}
                  {event.location?.postalCode || 'No available'}
                </p>
                <p>
                  <strong>Event Type:</strong> {event.eventType}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(event.dateTime)}{' '}
                  <strong>Time:</strong> {formatTime(event.dateTime)}
                </p>
                <button
                  type="button"
                  className="go"
                  onClick={() => handleGo(event._id)}
                >
                  I Go {goCounts[event._id]}
                </button>
                <button
                  type="button"
                  onClick={() => handleEditEvent(event)}
                  className="edit-event-btn"
                >
                  Edit Event
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(event._id)}
                  className="delete-event-btn"
                >
                  Delete Event
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default withAuthProtection(EventComponent)
