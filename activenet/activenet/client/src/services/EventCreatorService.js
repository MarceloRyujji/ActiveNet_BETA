import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const EventContext = createContext()

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const token = localStorage.getItem('authToken')

  useEffect(() => {
    if (token) {
      const fetchEvents = async () => {
        setIsLoading(true)
        try {
          const response = await axios.get('http://localhost:3001/events', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          })
          setEvents(
            Array.isArray(response.data.events) ? response.data.events : []
          )
        } catch (error) {
          setError('Error fetching events')
          console.error('Error fetching events:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchEvents()

      const interval = setInterval(fetchEvents, 5000)
      return () => clearInterval(interval)
    }
  }, [token])

  const createEvent = async (eventData) => {
    if (!token) {
      console.error('No token found')
      return
    }

    const formattedData = {
      title: eventData.title,
      description: eventData.description,
      location: {
        country: eventData.country,
        city: eventData.city,
        address: eventData.address,
        postalCode: eventData.postalCode,
      },
      eventType: eventData.eventType,
      dateTime: new Date(
        `${eventData.date}T${eventData.time}:00Z`
      ).toISOString(),
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/events',
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      console.log('Event created successfully:', response.data)
      setEvents((prevEvents) => [...prevEvents, response.data])
    } catch (error) {
      setError('Error creating event')
      if (error.response) {
        console.error('Server responded with:', error.response.data)
      } else {
        console.error('Error creating event:', error)
      }
    }
  }

  const updateEvent = async (eventId, updatedData) => {
    if (!updatedData) {
      console.error('updatedData is undefined')
      return
    }

    if (!updatedData.title) {
      console.error('Event title is missing')
      return
    }

    const formattedData = {
      title: updatedData.title,
      description: updatedData.description,
      location: {
        country: updatedData.country,
        city: updatedData.city,
        address: updatedData.address,
        postalCode: updatedData.postalCode,
      },
      eventType: updatedData.eventType,
      dateTime: new Date(
        `${updatedData.date}T${updatedData.time}:00Z`
      ).toISOString(),
    }

    console.log('Formatted Data:', formattedData)

    try {
      const response = await axios.put(
        `http://localhost:3001/events/${eventId}`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, ...formattedData } : event
        )
      )
    } catch (error) {
      setError('Error updating event')
      if (error.response) {
        console.error('Server responded with:', error.response.data)
      } else {
        console.error('Error updating event:', error)
      }
    }
  }

  const getGoCount = async (eventId) => {
    if (!token) return

    try {
      const response = await axios.get(
        `http://localhost:3001/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )

      if (response.data.success) {
        return response.data.goCount
      } else {
        console.error('Error fetching goCount:', response.data.message)
      }
    } catch (error) {
      console.error('Error fetching goCount:', error)
    }
  }

  const incrementGoCount = async (eventId) => {
    if (!token) return

    try {
      const response = await axios.patch(
        `http://localhost:3001/events/${eventId}/igo`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      )
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, goCount: response.data.goCount }
            : event
        )
      )
    } catch (error) {
      setError('Error incrementing go count')
      console.error('Error incrementing go count:', error)
    }
  }

  const deleteEvent = async (eventId) => {
    if (!token) return

    try {
      await axios.delete(`http://localhost:3001/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      )
    } catch (error) {
      setError('Error deleting event')
      console.error('Error deleting event:', error)
    }
  }

  return (
    <EventContext.Provider
      value={{
        events,
        createEvent,
        incrementGoCount,
        deleteEvent,
        getGoCount,
        updateEvent,
        error,
        isLoading,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
