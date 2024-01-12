import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../../context/AuthContext'
import profileImg from '../../../../assets/images/avatar/profile.png'

import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../../../utils/toastUtils'
import { getGroups, createStaff } from '../../../../services/Api'
import * as yup from 'yup'

//Handle Toast Notifications
const handleToast = (msg, type = 'default') => {
  if (type == 'success') {
    sucessNotify(msg)
  } else if (type == 'error') {
    errorNotify(msg)
  } else {
    DefaultNotify(msg)
  }
}
const ClientSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup
    .string()
    .email('Invalid email address format')
    .required('Email field is required!'),
})

function AddForm() {
  const { authTokens, logoutUser } = useContext(AuthContext)
  const [groups, setGroup] = useState()

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupData = await getGroups()
        setGroup(groupData.results)
      } catch (error) {
        errorNotify(error)
      }
    }
    fetchGroups()
  }, [])
  //
  const navigate = useNavigate()

  //create client
  const CreateStaffUser = async (e) => {
    e.preventDefault()
    var groups = [e.target.group.value]
    // creating a form data object
    let data = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      joined_date: e.target.joined_date.value,

      profile_pic: e.target.image.files[0],

      // group: e.target.group.value,
      groups: groups,
    }
    console.log(data)
    //validating form
    try {
      await ClientSchema.validate(data, { abortEarly: false })
      // The form data is valid, do something with it
      // const staffDataResponse = await createStaff(data)
      //api option
      const form = new FormData()
      // Append each form field to the FormData object
      Object.entries(data).forEach(([key, value]) => {
        form.append(key, value)
      })
      const options = {
        method: 'POST',
        url: process.env.REACT_APP_LOCAL_SERVER_URL+'user/create/',
        params: { 'api-version': '3.0' },
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
        data: form,
      }
      //api request for create client
      axios
        .request(options)
        .then((res) => {
          navigate('/admin/staff')
          handleToast('Staff created succesfully', 'success')
        })
        .catch((err) => {
          var errors = err.response.data
          Object.keys(errors).forEach((key) => {
            handleToast(key.toUpperCase() + ' : ' + errors[key][0], 'error')
          })
        })
    } catch (errors) {
      // There are errors in the form data
      const errorMessages = errors.inner.map((error) => error.message)
      handleToast(errorMessages.join('\n'), 'error')
    }
  }

  return (
    <>
      <form onSubmit={CreateStaffUser}>
        <div className="xl:grid grid-cols-12 gap-12 flex 2xl:flex-row flex-col-reverse">
          <div className="2xl:col-span-8 xl:col-span-7">
            <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="fn"
                  className="block text-basse  font-medium text-bgray-600 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="fn"
                  className="block text-basse  font-medium text-bgray-600 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="fn"
                  className="block text-basse  font-medium text-bgray-600 mb-2"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  name="phone"
                  className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="fn"
                  className="block text-basse  font-medium text-bgray-600 mb-2"
                >
                  Joined Date
                </label>
                <input
                  type="date"
                  name="joined_date"
                  className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="fn"
                  className="block text-basse  font-medium text-bgray-600 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="fn"
                  className="block text-basse  font-medium text-bgray-600 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="fn"
                  className="block text-basse  font-medium text-bgray-600 mb-2"
                >
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block text-basse  font-medium text-bgray-600 mb-2"
                >
                  User Group
                </label>
                <select
                  className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
                  name="group"
                >
                  {groups?.map((item) => {
                    return <option value={item.id}>{item.name}</option>
                  })}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                aria-label="none"
                className="rounded-lg bg-success-300 px-12 py-3.5 transition-all text-white font-semibold hover:bg-success-400"
              >
                Create
              </button>
            </div>
          </div>
          <div className="2xl:col-span-4 xl:col-span-5 2xl:mt-24">
            <div className="flex justify-center w-full mx-auto sm:max-w-lg">
              <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
                <div className="mt-10 mb-10 text-center">
                  <h2 className="text-2xl font-semibold mb-2">
                    Upload your files
                  </h2>
                  <p className="text-xs text-gray-500">
                    File should be of format .mp4, .avi, .mov or .mkv
                  </p>
                </div>
                <div className="relative w-4/5 h-32 max-w-xs mb-10 bg-white bg-gray-100 rounded-lg shadow-inner">
                  <input
                    type="file"
                    id="file-upload"
                    name="image"
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
                  >
                    <p className="z-10 text-xs font-light text-center text-gray-500">
                      Drag & Drop your files here
                    </p>
                    <svg
                      className="z-10 w-8 h-8 text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                    </svg>
                  </label>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </form>
    </>
  )
}

export default AddForm
