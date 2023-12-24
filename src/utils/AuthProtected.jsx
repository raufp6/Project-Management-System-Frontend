import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthProtected = ({ element }) => {

    const authTokens = JSON.parse(localStorage.getItem('authTokens'))
  
  if (!authTokens) {
    // return <Navigate to="/auth" replace />
    console.log('logoutt..')
  }
  return <>{element}</>
}

export default AuthProtected
