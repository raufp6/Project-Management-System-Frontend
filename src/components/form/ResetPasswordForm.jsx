import { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/AuthContext'
import { changePassword } from '../../services/Api'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../utils/toastUtils'
import axios from 'axios'

function PasswordResetFrom() {
  const { user, authTokens } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    new_password2: '',
  })

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const clearFormFields = () => {
    setFormData({
      old_password: '',
      new_password: '',
      new_password2: '',
    })
  }
  const UpdatePassword = async (e) => {
    e.preventDefault()

    const form = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value)
    })

    try {
      //api option
      const options = {
        method: 'POST',
        url: `http://127.0.0.1:8000/api/user/password-change/`,
        params: { 'api-version': '3.0' },
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
        data: form,
      }
      axios
        .request(options)
        .then((res) => {
          sucessNotify('Password updated succesfully')
          clearFormFields()
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors
            Object.keys(errors).forEach((key) => {
              errors[key].forEach((errorMessage) => {
                errorNotify(errorMessage)
              })
            })
          } else if (
            err.response &&
            err.response.data &&
            err.response.data.error
          ) {
            // Handle other errors
            const errorMessage = err.response.data.error
            errorNotify(errorMessage)
          } else {
            // Handle unexpected errors
            console.error(err)
            errorNotify('An unexpected error occurred.')
          }
        })
    } catch (errors) {
      // There are errors in the form data
      const errorMessages = errors.inner.map((error) => error.message)
      console.log(errorMessages)
      errorNotify(errorMessages[0])
    }
  }
  return (
    <div className="2xl:col-span-8 xl:col-span-7">
      <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
        Change Password
      </h3>
      <div className="mt-8">
        <form onSubmit={UpdatePassword}>
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fname"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Old Password
              </label>
              <input
                type="text"
                onChange={handleFormChange}
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="old_password"
                value={formData.old_password}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lname"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                New Password
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="new_password"
                value={formData.new_password}
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="text"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Confirm New Password
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="new_password2"
                onChange={handleFormChange}
                value={formData.new_password2}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              aria-label="none"
              type="submit"
              className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordResetFrom
