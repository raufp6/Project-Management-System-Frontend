import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout2 from './layouts/admin/Admin'
import AdminLayout from './layouts/admin'
import AuthLayout from './layouts/auth'
import AuthContext from './context/AuthContext'
import AuthProtected from './utils/AuthProtected'



function App() {
  // let { user } = useContext(AuthContext)
  // user?console.log("logged"):console.log("log out");
  return (
    <div>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />

        <Route
          path="admin/*"
          element={<AuthProtected element={<AdminLayout2 />} />}
        ></Route>

        <Route path="/" element={<Navigate to="/admin/default/" replace />} />
        
      </Routes>
    </div>
  )
}

export default App
