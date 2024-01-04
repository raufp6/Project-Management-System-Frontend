import api_request from '../utils/axios'
import {sucessNotify,errorNotify,DefaultNotify} from '../utils/toastUtils'
import {
  TaskUrl,
  ProjectUrl,
  CreateProjectUrl,
  ClienttUrl,
  StafftUrl,
  ProjectCountUrl,
  UserCountUrl,
  TaskCountUrl,
  NotificationsUrl,
  UserGroupUrl,
  UsertUrl,
  ChangePasswordUrl
} from '../services/apiUrls'

export const getGroups = async (params = null) => {
  try {
    const response = await api_request.get(UserGroupUrl, { params })
    return response.data
  } catch (errors) {
    const errorMessages = errors.inner.map((error) => error.message)
    errorNotify(errorMessages.join('\n'))
    console.error('Error:', errors.code)
  }
}
export const getTaskData = async (params=null,url=TaskUrl) => {
    

  try {
    const response = await api_request.get(url, { params })
    return response.data
  } catch (errors) {
    const errorMessages = errors.inner.map((error) => error.message)
    errorNotify(errorMessages.join('\n'))
    console.error('Error:', errors.code)
  }
}
export const getTaskCount = async (params = null) => {
  try {
    const response = await api_request.get(TaskCountUrl, { params })
    return response.data
  } catch (errors) {
    const errorMessages = errors.inner.map((error) => error.message)
    errorNotify(errorMessages.join('\n'))
    console.error('Error:', errors.code)
  }
}
export const getProjecttList = async (params, url = ProjectUrl) => {
  try {
    const response = await api_request.get(url, { params })
    return response.data
  } catch (errors) {
    const errorMessages = errors.inner.map((error) => error.message)
    errorNotify(errorMessages.join('\n'))
    console.error('Error:', errors.code)
  }
}
export const getNotFinishedProjecttList = async (params) => {
  try {
    const response = await api_request.get(ProjectUrl, { params })
    return response.data
  } catch (errors) {
    const errorMessages = errors.inner.map((error) => error.message)
    errorNotify(errorMessages.join('\n'))
    console.error('Error:', errors.code)
  }
}
export const createProject1 = async () => {
  try {
    const response = await api_request.post(CreateProjectUrl)
    return response.data
  } catch (errors) {
    const errorMessages = errors.inner.map((error) => error.message)
    errorNotify(errorMessages.join('\n'))
    console.error('Error:', errors.code)
  }
}
export const createProject = async (CreateProjectUrl, data) => {
  try {
    const response = await api_request.post(CreateProjectUrl, data)
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error // Propagate the error to the calling code
  }
}
export const getPopjectCount = async (params=null) => {
  try {
    const response = await api_request.get(ProjectCountUrl, { params })
    return response.data
  } catch (errors) {
    const errorMessages = errors.inner.map((error) => error.message)
    errorNotify(errorMessages.join('\n'))
    console.error('Error:', errors.code)
  }
}

// Client
export const getClientList = async (params=null) => {
  try {
    const response = await api_request.get(ClienttUrl,{params})
    return response.data
  } catch (errors) {
    const errorMessages = errors.inner.map((error) => error.message)
    errorNotify(errorMessages.join('\n'))
    console.error('Error:', errors.code)
  }
}
// Staff
export const getStaffList = async (params,url=StafftUrl) => {
  try {
    const response = await api_request.get(url, { params })
    return response.data
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorNotify(`Server responded with status ${error.response.status}`)
      console.error('Server Error:', error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      errorNotify('No response received from the server')
      console.error('No Response:', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      errorNotify('An error occurred while setting up the request')
      console.error('Request Setup Error:', error.message)
    }
  }
}
export const getUser = async (params = null, url = UsertUrl) => {
  try {
    const response = await api_request.get(url, { params })
    return response.data
  } catch (errors) {
    const errorMessages = errors.inner.map((error) => error.message)
    errorNotify(errorMessages.join('\n'))
    console.error('Error:', errors.code)
  }
}
export const getUserCount = async (params = null) => {
  try {
    const response = await api_request.get(UserCountUrl, { params })
    return response.data
  } catch (errors) {
    const errorMessages = errors.inner.map((error) => error.message)
    errorNotify(errorMessages.join('\n'))
    console.error('Error:', errors.code)
  }
}

//get Notifications
export const getNotifications = async (params) => {
  try {
    const response = await api_request.get(NotificationsUrl, { params })
    return response.data
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorNotify(`Server responded with status ${error.response.status}`)
      console.error('Server Error:', error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      errorNotify('No response received from the server')
      console.error('No Response:', error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      errorNotify('An error occurred while setting up the request')
      console.error('Request Setup Error:', error.message)
    }
  }
}
// User password Change
export const changePassword = async (ChangePasswordUrl, data) => {
  try {
    const response = await api_request.post(ChangePasswordUrl, data)
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error // Propagate the error to the calling code
  }
}
