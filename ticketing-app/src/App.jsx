import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterPage from './components/user-auth/registerPage';
import LoginPage from './components/user-auth/loginPage';
import ProtectedRoute from './components/user-auth/ProtectedRoute';
import Dashboard from './components/dashboard/dashboard';
import CreateTicket from './components/create-ticket/createTicket';
import DetailView from './components/ticket-view/detailVIew';
import Navbar from './components/navbar/navbar';


function App() {


  return (
    <>
    
      <Router>
        <Navbar />
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
            <Route path='/ticket/:ticketId' element={
              <ProtectedRoute>
                <DetailView/>
              </ProtectedRoute>
            } />
          </Routes>
      </Router>
    </>
  )
}

export default App;
