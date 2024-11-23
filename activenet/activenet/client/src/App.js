import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Brand from './components/Brand'
import Login from './components/Login'
import Navigation from './components/Navigation'
import SignUp from './components/SignUp'
import ExercisePersonalPlan from './components/ExercisePersonalPlan'
import Footer from './components/Footer'
import ExerciseFinder from './components/ExerciseFinder'
import ForgetPassword from './components/ForgetPassword'
import HomePageUser from './components/HomePageUser'
import HomePageTrainer from './components/HomePageTrainer'
import DietFinder from './components/DietFinder'
import EventFinder from './components/eventFinder'
import TrainerFinder from './components/TrainerFinder'
import UserProfile from './components/UserProfile'
import EventComponent from './components/EventCreator'
import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { ConfigProvider } from './context/ConfigContext'
import { EventProvider } from './services/EventCreatorService'

function App() {
  const location = useLocation()

  // Define routes on which the Brand component is displayed
  const pathsToShowBrand = React.useMemo(() => ['/', '/signUp'], [])

  return (
    <AuthProvider>
      <ConfigProvider>
        <EventProvider>
          <div className="main">
            <Navigation />
            {/* Show the Brand component only on "/" and "/signUp" */}
            {pathsToShowBrand.includes(location.pathname) && (
              <header className="header">
                <Brand />
              </header>
            )}

            <main className="body">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/ForgetPassword" element={<ForgetPassword />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/HomePageUser" element={<HomePageUser />} />
                <Route path="/HomePageTrainer" element={<HomePageTrainer />} />
                <Route path="/exerciseFinder" element={<ExerciseFinder />} />
                <Route
                  path="/exercisePersonalPlan"
                  element={<ExercisePersonalPlan />}
                />
                <Route path="/DietFinder" element={<DietFinder />} />
                <Route path="/EventFinder" element={<EventFinder />} />
                <Route path="/EventCreator" element={<EventComponent />} />
                <Route path="/TrainerFinder" element={<TrainerFinder />} />
                <Route path="/profile/:id" element={<UserProfile />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </EventProvider>
      </ConfigProvider>
    </AuthProvider>
  )
}

export default React.memo(App)
