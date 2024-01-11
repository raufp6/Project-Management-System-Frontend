import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../utils/toastUtils'
import * as yup from 'yup'

//Form validation schema
const Schema = yup.object().shape({
  first_name: yup.string().required('First name field is required'),
  last_name: yup.string().required('Last name field is required'),
  email: yup.string().required('Email field is required'),
})
function PersonalInfoFrom({ userInfo }) {
  const { authTokens, logoutUser, user } = useContext(AuthContext)
  const [queryParams, setqueryParams] = useState([])
  const [FirstName, setFirstname] = useState()
  const [LastName, setLastname] = useState()
  const [Email, setEmail] = useState()

  const UpdateUser = async (e) => {
    e.preventDefault()
    let data = {
      first_name: FirstName,
      last_name: LastName,
    }
    try {
      await Schema.validate(data, { abortEarly: false })
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })
      //api option
      const options = {
        method: 'PATCH',
        url: `http://127.0.0.1:8000/api/user/${user.user_id}/update/`,
        params: { 'api-version': '3.0' },
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
        data: formData,
      }
      axios
        .request(options)
        .then((res) => {
          sucessNotify('Profile updated succesfully')
        })
        .catch((err) => {
          var errors = err.response.data
          console.log(errors)
          Object.keys(errors).forEach((key) => {
            errorNotify(key.toUpperCase() + ' : ' + errors[key][0])
          })
        })
    } catch (errors) {
      // There are errors in the form data
      const errorMessages = errors.inner.map((error) => error.message)
      errorNotify(errorMessages[0])
    }
  }

  useEffect(() => {
    setFirstname(userInfo?.first_name)
    setLastname(userInfo?.last_name)
    setEmail(userInfo?.email)
  }, [userInfo])
  return (
    <div className="2xl:col-span-8 xl:col-span-7">
      <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
        Personal Information's
      </h3>
      <div className="mt-8">
        <form
          onSubmit={(e) => {
            UpdateUser(e)
          }}
        >
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fname"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                First Name
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="fname"
                value={FirstName}
                onChange={(e) => {
                  setFirstname(e.target.value)
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lname"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Last Name
              </label>
              <input
                value={LastName}
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="lname"
                onChange={(e) => {
                  setLastname(e.target.value)
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Email
              </label>
              <input
                readOnly
                disabled
                value={Email}
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              aria-label="none"
              className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PersonalInfoFrom
