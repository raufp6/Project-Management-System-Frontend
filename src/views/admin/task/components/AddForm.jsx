import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../../context/AuthContext'
import axios from 'axios'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../../../utils/toastUtils'
import * as yup from 'yup'
import { getStaffList } from '../../../../services/Api'
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
  title: yup.string().required('Task field is required'),
  start_date: yup
    .date('Select valid start date')
    .required('Select project start date'),
  // client: yup.number().required('Select a client!'),
})
function AddForm({ projects,users }) {
  const navigate = useNavigate()
  const { authTokens,logoutUser } = useContext(AuthContext)
  const [members, SetMembers] = useState([])
  const [usersList, SetUsers] = useState(users)
  //create Task
  const CreateTask = async (e) => {
    e.preventDefault()
    if (e.target.start_date.value > e.target.deadline.value) {
      handleToast('Start Date must be less than deadline date', 'error')
      return false
    }
    // creating a form data object
    let data = {
      title: e.target.title.value,
      deadline: e.target.deadline.value,
      start_date: e.target.start_date.value,
      priority: e.target.priority.value,
      status: e.target.status.value,
      description: e.target.description.value,
      project: e.target.project.value,
      assigned_to: members,
    }
    //validating form
    try {
      await Schema.validate(data, { abortEarly: false })
      // The form data is valid, do something with it

      //api option
      const options = {
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/task/create/',
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
          navigate('/admin/task/')
          handleToast('Task created succesfully', 'success')
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
  const handleChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    SetMembers(selectedOptions)
  }
  //get project details
  const getProjectAssignedMembers = async (id) => {
    let response = await fetch(`http://127.0.0.1:8000/api/task/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(authTokens.access),
      },
    })
    let data = await response.json()
    if (response.status === 200) {
      SetMembers(data)
    } else if (response.statusText === 'Unauthorized') {
      return logoutUser()
    }
  }
  const fetchAllStaff = async (id) => {
    try {
      const staffData = await getStaffList({ project: id })
      SetUsers(staffData.results)
    } catch (error) {
      errorNotify(error)
    }
  }
  const handleProjectChange = (e) => {
    // getProjectAssignedMembers(e.target.value)
    fetchAllStaff(e.target.value)
  }
  return (
    <form onSubmit={CreateTask}>
      <div className="grid md:grid-cols-1 gap-6 mb-6">
        <div>
          <label
            htmlFor="fn"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Task Title
          </label>
          <input
            type="text"
            name="title"
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
            Priority
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="priority"
            id=""
          >
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
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
            <option value="incomplete">In complete</option>
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Project
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="project"
            onChange={handleProjectChange}
          >
            <option value="">Select a project</option>
            {projects?.map((project, index) => {
              return <option value={project.id}>{project.name}</option>
            })}
          </select>
        </div>
        <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Assign to
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="assigned_to"
            multiple
            onChange={handleChange}
          >
            {usersList?.map((user, index) => {
              return (
                <option value={user.id}>
                  {user.first_name + ' ' + user.last_name}
                </option>
              )
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
            Task Description
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
          Create Task
        </button>
      </div>
    </form>
  )
}

export default AddForm
