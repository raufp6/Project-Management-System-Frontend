import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../../context/AuthContext'
import { getGroups } from '../../../../services/Api'
import axios from 'axios'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../../../utils/toastUtils'
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
//Form validation schema
const Schema = yup.object().shape({
  username: yup.string().required('Username field is required'),
  email: yup.string().required('Email field is required'),

})
function EditForm({ staff }) {
  console.log(staff)
  const navigate = useNavigate()
  const { authTokens, logoutUser } = useContext(AuthContext)

  const [Username, setUsername] = useState('')
  const [Email, setEmail] = useState('')
  const [Group, setGroup] = useState(staff?.groups)
  const [groupslist, setGroups] = useState([])

  useEffect(() => {
    setUsername(staff?.username)
    setEmail(staff?.email)
    setGroup(staff?.groups[0])
    // console.log('Groups:', Group[0])
    
    
  }, [staff])

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupData = await getGroups()
        setGroups(groupData.results)
      } catch (error) {
        errorNotify(error)
      }
    }
    fetchGroups()
  }, [])

  //create client
  const UpdateStaff = async (e) => {
    e.preventDefault()
    
    // creating a form data object
    let data = {
      username: Username,
      email: Email,
      group: Group,
    //   priority: Priority,
    //   description: Description,
    //   assigned_to: User,
    //   project: Project,
    }
    //validating form
    try {
      await Schema.validate(data, { abortEarly: false })
      // The form data is valid, do something with it

      //api option
      const options = {
        method: 'PATCH',
        url: `http://127.0.0.1:8000/api/user/${staff.id}/update/`,
        params: { 'api-version': '3.0' },
        headers: {
          'content-type': 'application/json',
        },
        data: data,
      }
      //api request for create client
      axios
        .request(options)
        .then((res) => {
          console.log(res)
          console.log(res.data)
          navigate('/admin/staff/')
          handleToast('Staff updated succesfully', 'success')
        })
        .catch((err) => {
          var errors = err.response.data
          console.log(errors)
          Object.keys(errors).forEach((key) => {
            handleToast(key.toUpperCase() + ' : ' + errors[key][0], 'error')
          })
        })
    } catch (errors) {
      // There are errors in the form data
      const errorMessages = errors.inner.map((error) => error.message)
      console.log(errorMessages)
      handleToast(errorMessages[0], 'error')
    }
  }
  return (
    <form
      onSubmit={(e) => {
        UpdateStaff(e)
      }}
    >
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="fn"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            name="title"
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
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
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
            { groupslist?.map((item) => {
              return <option value={item.id} selected={Group == item.id}>{item.name}</option>
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
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default EditForm
