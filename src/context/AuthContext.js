import {createContext, useEffect, useState} from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { DefaultNotify,sucessNotify, errorNotify } from '../utils/toastUtils'
import api_request from '../utils/axios'

const AuthContext = createContext()
export default AuthContext
export const AuthProvider = ({children}) => {
  const handleToast = (msg, type = 'default') => {
    if (type == 'success') {
      sucessNotify(msg)
    } else if (type == 'error') {
      errorNotify(msg)
    } else {
      DefaultNotify(msg)
    }
  }
  const navigate = useNavigate()
  let [loading, setLoading] = useState(false)
  // Set Auth Tocken to local storage
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  )
  //Set user
  let [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwtDecode(localStorage.getItem('authTokens'))
      : null
  )
  //Login with email and password
  let loginUser = async (e) => {
    e.preventDefault()
    console.log('login ...')
    try {
      let response = await fetch(process.env.REACT_APP_LOCAL_SERVER_URL+'token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      })
      let data = await response.json()
      if (response.status === 200) {
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
        handleToast('You are loggedin!', 'success')
        navigate('/admin/default')
      } else {
        handleToast('Invalid email or password!', 'error')
      }
    } catch (errors) {
      handleToast('Some thing error occured', 'error')
    }
  }
  // Update Token
  let updateToken = async () => {
    console.log('updateToken working')
    let response = await fetch(process.env.REACT_APP_LOCAL_SERVER_URL+'token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    })
    let data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwtDecode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
    } else {
      logoutUser()
    }
    if (loading) {
      setLoading(false)
    }
  }
  // Logout
  const logoutUser = () => {
    console.log('logout...')
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    console.log('logout... done')
    navigate('/auth')
  }
  const contextData = {
    loginUser,
    user,
    authTokens,
    logoutUser,
  }
  useEffect(() => {
    if (loading) {
      updateToken()
    }
    let fourMinutes = 1000 * 60 * 100
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)
  }, [authTokens, loading])
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

