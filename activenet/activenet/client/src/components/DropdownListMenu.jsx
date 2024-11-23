import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/DropdownList.module.css'
import generalStyle from '../styles/GeneralStyles.module.css'
import { getUserPlans, updateUserPlan } from '../services/planService'
import { Link } from 'react-router-dom'

const DropdownMenu = ({ exercise }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const menuRef = useRef(null)

  const toggleMenu = async () => {
    if (!isOpen && plans.length === 0) {
      try {
        setLoading(true)
        const fetchedPlans = await getUserPlans()
        setPlans(fetchedPlans)
        setError(null)
      } catch (error) {
        setError('Error fetching plans')
        console.error('Error fetching plans:', error)
      } finally {
        setLoading(false)
      }
    }
    setIsOpen((prev) => !prev)
  }

  const closeMenu = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', closeMenu)
    } else {
      document.removeEventListener('click', closeMenu)
    }
    return () => document.removeEventListener('click', closeMenu)
  }, [isOpen])

  const addExerciseToPlan = async (plan) => {
    try {
      const fetchedMessage = await updateUserPlan(exercise, plan)
      alert(fetchedMessage)

      setPlans((prevPlans) =>
        prevPlans.map((p) =>
          p._id === plan._id
            ? { ...p, exercises: [...p.exercises, exercise] }
            : p
        )
      )
    } catch (error) {
      setError('An error occurred while trying to add the exercise.')
      console.error('Error adding the exercise:', error)
    }
  }

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={generalStyle.generalReverseButton}
      >
        Add to Plan
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {loading ? (
            <p>Loading plans...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <ul>
              {plans.length === 0 ? (
                <Link to="/ExercisePersonalPlan">
                  <li>
                    No plans available. <span>Create new plan</span>
                  </li>
                </Link>
              ) : (
                plans.map((plan) => (
                  <li
                    key={plan._id}
                    onClick={() => {
                      addExerciseToPlan(plan)
                    }}
                  >
                    {plan.name}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
