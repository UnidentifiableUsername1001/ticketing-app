import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import RegisterPage from './components/user-auth/registerPage'
import LoginPage from './components/user-auth/loginPage'
import ProtectedRoute from './components/user-auth/ProtectedRoute'
// PLACEHOLDER - import HomePage from '../components/HomePage/HomePage'
// PLACEHOLDER - import LoginPage from '../components/LoginPage/LoginPage'
// PLACEHOLDER - import Dashboard from '../components/Dashboard/Dashboard'
// PLACEHOLDER - import TicketDetails from '../components/TicketDetails/TicketDetails'
// PLACEHOLDER - import Profile from '../components/Profile/Profile'
// PLACEHOLDER - import MyTickets from '../components/MyTickets/MyTickets'
// PLACEHOLDER - import LoginPage from '../components/MyTeam/MyTeam' // If they're a manager



function App() {


  return (
    <>
    
      <Routes>
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/register" element={<RegisterPage />} />
        <Route path="/app/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>

      
      {/* <Navbar/>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/app" element={<HomePage />} />
            <Route path="/app/login" element={<LoginPage />} />
            <Route path="/app/dashboard" element={<Dashboard />} />
            <Route path="/app/ticketdetails" element={<TicketDetails />} />
            <Route path="/app/profile" element={<Profile />} />
            <Route path="/app/mytickets" element={<MyTickets />} />
            <Route path="/app/myteam" element={<MyTeam/>} />
        </Routes> */}



      </>
  )
}

export default App;
