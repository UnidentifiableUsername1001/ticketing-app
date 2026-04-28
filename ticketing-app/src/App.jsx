import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import RegisterPage from './components/user-auth/registerPage'
import LoginPage from './components/user-auth/loginPage'
import ProtectedRoute from './components/user-auth/ProtectedRoute'
import Dashboard from './components/dashboard/dashboard'
import CreateTicket from './components/create-ticket/createTicket'



function App() {


  return (
    <>
    
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/create-ticket' element={
          <ProtectedRoute>
            <CreateTicket />
          </ProtectedRoute>
        } />
      </Routes>
      </>
  )
}

export default App;
