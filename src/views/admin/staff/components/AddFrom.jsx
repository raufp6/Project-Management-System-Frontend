import { useState, useContext,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../../context/AuthContext'
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
      // group: e.target.group.value,
      groups: groups,
    }
    console.log(data);
    //validating form
    try {
      await ClientSchema.validate(data, { abortEarly: false })
      // The form data is valid, do something with it
      // const staffDataResponse = await createStaff(data)
      //api option
      const options = {
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/user/create/',
        params: { 'api-version': '3.0' },
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
        data: data,
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
    <form onSubmit={CreateStaffUser}>
      <div className="grid md:grid-cols-2 gap-6">
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
            {groups?.map((item)=>{
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
    </form>
  )
}

export default AddForm
