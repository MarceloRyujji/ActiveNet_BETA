import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const ConfigContext = createContext()

export const ConfigProvider = ({ children }) => {
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState({})
  const [allCities, setAllCities] = useState([])
  const [postalCodes, setPostalCodes] = useState({})
  const [eventTypes, setEventTypes] = useState([])

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get('/countries')
        setCountries(data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }
    fetchCountries()
  }, [])

  // Fetch cities
  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const { data } = await axios.get('/cities')
        setAllCities(data)
      } catch (error) {
        console.error('Error fetching cities:', error)
      }
    }
    fetchAllCities()
  }, [])

  // Fetch cities for a specific country
  const fetchCities = async (countryId) => {
    if (!cities[countryId]) {
      try {
        const { data } = await axios.get(`/cities/${countryId}`)
        setCities((prev) => ({ ...prev, [countryId]: data }))
      } catch (error) {
        console.error('Error fetching cities:', error)
      }
    }
  }

  // Fetch postal codes for a specific city
  const fetchPostalCodes = async (cityId) => {
    if (!postalCodes[cityId]) {
      try {
        const { data } = await axios.get(`/postal-code/${cityId}`)
        setPostalCodes((prev) => ({ ...prev, [cityId]: data }))
      } catch (error) {
        console.error('Error fetching postal codes:', error)
      }
    }
  }

  // Fetch event types
  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const { data } = await axios.get('/event-types')
        setEventTypes(data)
      } catch (error) {
        console.error('Error fetching event types:', error)
      }
    }
    fetchEventTypes()
  }, [])

  return (
    <ConfigContext.Provider
      value={{
        countries,
        fetchCities,
        cities,
        allCities,
        fetchPostalCodes,
        postalCodes,
        eventTypes,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}
