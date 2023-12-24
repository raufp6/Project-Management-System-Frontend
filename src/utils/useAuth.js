import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authTokens')

    if (!token) {
      navigate('/auth')
    } else {
      setIsLoggedIn(true)
    }
  }, [])

  return { isLoggedIn }
}
export default useAuth