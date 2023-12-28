import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../../context/AuthContext'
import axios from 'axios'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../../../utils/toastUtils'
import * as yup from 'yup'
import Select from 'react-tailwindcss-select'
import {getStaffList} from '../../../../services/Api'




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
const ProjectSchema = yup.object().shape({
  name: yup.string().required('Project name field is required'),
  start_date: yup.date('Select valid start date').required('Select project start date'),
  // client: yup.number().required('Select a client!'),
})
function AddForm({ clients }) {
  
  const [users, setUsers] = useState()
  const navigate = useNavigate()
  const { authTokens } = useContext(AuthContext)
  const [members,SetMembers] = useState([])

  //create client
  const CreateProject = async (e) => {
    e.preventDefault()
    if(e.target.start_date.value>e.target.deadline.value){
      handleToast('Start Date must be less than deadline date','error')
      return false;
    }
    // creating a form data object
    let data = {
      name: e.target.name.value,
      deadline: e.target.deadline.value,
      start_date: e.target.start_date.value,
      status: e.target.status.value,
      description: e.target.description.value,
      client: e.target.client.value,
      members: members,
    }
    //validating form
    try {
      await ProjectSchema.validate(data, { abortEarly: false })
      // The form data is valid, do something with it

      //api option
      const options = {
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/project/create/',
        params: { 'api-version': '1.0' },
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
          console.log(res)
          console.log(res.data)
          navigate('/admin/project/')
          handleToast('Project created succesfully', 'success')
        })
        .catch((err) => {
          var errors = err.response.data
          console.log(errors);
          Object.keys(errors).forEach((key) => {
            handleToast(key.toUpperCase() + ' : ' + errors[key][0], 'error')
          })
        })
    } catch (errors) {
      // There are errors in the form data
      const errorMessages = errors.inner.map((error) => error.message)

      for (let index = 0; index < errorMessages.length; index++) {
        errorNotify(errorMessages[index])
      }
    }
  }
  
  const handleChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    SetMembers(selectedOptions)
    // console.log(selectedOptions, 'value')
  }
  useEffect(() => {
    const fetchAllStaffs = async () => {
      try {
        const staffData = await getStaffList({ usertype: 'emp' })
        setUsers(staffData.results)
      } catch (error) {
        errorNotify(error)
      }
    }
    fetchAllStaffs()
  }, [])
  const options = []

  
 users?.forEach((employee) => {
  
   options.push({ value: employee.id, label: employee.first_name+" "+employee.last_name })
 })
 
  
  return (
    <form onSubmit={CreateProject}>
      <div className="grid grid-cols-1 gap-6 mb-6 ">
        <div>
          <label
            htmlFor="fn"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Project Name
          </label>
          <input
            type="text"
            name="name"
            className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="fn"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="fn"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Project status
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="status"
          >
            <option value="notstarted">Not Started</option>
            <option value="inprogress">In Progress</option>
            <option value="onhold">On Hold</option>
            <option value="canceled">Canceled</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Client
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="client"
          >
            <option value="">Select a client</option>
            {clients?.map((client, index) => {
              return <option value={client.id}>{client.company_name}</option>
            })}
          </select>
        </div>
        {/* <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Members
          </label>
          <Select
            
            onChange={handleChange}
            options={options}
            isMultiple={true}
          />
        </div> */}
        <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Members
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="members"
            multiple
            onChange={handleChange}
          >
            {users?.map((emplyee, index) => {
              return <option value={emplyee.id}>{emplyee.first_name+" "+emplyee.last_name}</option>
            })}
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-1 gap-6 mb-6">
        <div>
          <label
            htmlFor="text"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Project Description
          </label>
          <textarea
            name="description"
            className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          aria-label="none"
          className="rounded-lg bg-success-300 px-12 py-3.5 transition-all text-white font-semibold hover:bg-success-400"
        >
          Create Project
        </button>
      </div>
    </form>
  )
}

export default AddForm
