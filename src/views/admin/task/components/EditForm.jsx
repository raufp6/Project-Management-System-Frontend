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
  title: yup.string().required('Project name field is required'),
  start_date: yup
    .date('Select valid start date')
    .required('Select project start date'),
  // client: yup.number().required('Select a client!'),
})
function EditForm({ users, projects,task }) {
  const navigate = useNavigate()
  const { authTokens } = useContext(AuthContext)

  const [Title, setTitle] = useState('')
  const [Deadline, setDeadline] = useState('')
  const [StartDate, setStartDate] = useState('')
  const [Priority, setPriority] = useState('')
  const [Description, setDescription] = useState('')
  const [User, setUser] = useState('')
  const [Project, setProject] = useState('')
  const [Status, setStatus] = useState('')

  useEffect(() => {
    setTitle(task?.title)
    setDeadline(task?.deadline)
    setStartDate(task?.start_date)
    setPriority(task?.priority)
    setDescription(task?.description)
    setProject(task?.project)
    setUser(task?.assigned_to)
    setStatus(task?.status)
  }, [task])

  //create client
  const UpdateTask = async (e) => {
    e.preventDefault()
    if (StartDate > Deadline) {
      handleToast('Start Date must be less than deadline date', 'error')
      return false
    }
    // creating a form data object
    let data = {
      title: Title,
      deadline: Deadline,
      start_date: StartDate,
      priority: Priority,
      description: Description,
      assigned_to: User,
      project: Project,
    }
    //validating form
    try {
      await Schema.validate(data, { abortEarly: false })
      // The form data is valid, do something with it

      //api option
      const options = {
        method: 'PATCH',
        url: `http://127.0.0.1:8000/api/task/${task.id}/update/`,
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
          navigate('/admin/task/')
          handleToast('Task updated succesfully', 'success')
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
        UpdateTask(e)
      }}
    >
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
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={StartDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            value={Deadline}
            onChange={(e) => setDeadline(e.target.value)}
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
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select a option</option>
            <option value="cold" selected={Priority == 'cold'}>
              Cold
            </option>
            <option value="warm" selected={Priority == 'warm'}>
              Warm
            </option>
            <option value="hot" selected={Priority == 'hot'}>
              Hot
            </option>
          </select>
        </div>
        <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Status
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ongoing" selected={Status == 'ongoing'}>
              On Going
            </option>
            <option value="notstarted" selected={Status == 'notstarted'}>
              Not Started
            </option>
            <option value="completed" selected={Status == 'completed'}>
              Done
            </option>
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
            onChange={(e) => setProject(e.target.value)}
          >
            <option value="">Select a project</option>
            {projects?.map((project, index) => {
              return (
                <option value={project.id} selected={Project == project.id}>
                  {project.name}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Assigned to
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="project"
            onChange={(e) => setProject(e.target.value)}
          >
            <option value="">Select a user</option>
            {users?.map((user, index) => {
              return (
                <option value={user.id} selected={User == user.id}>
                  {user.username}
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
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
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
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default EditForm
