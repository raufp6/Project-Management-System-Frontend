import { useState, useContext,useEffect } from 'react'
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
const ProjectSchema = yup.object().shape({
  name: yup.string().required('Project name field is required'),
  start_date: yup
    .date('Select valid start date')
    .required('Select project start date'),
  // client: yup.number().required('Select a client!'),
})
function AddForm({ clients,project }) {
    
  const navigate = useNavigate()
  const { authTokens } = useContext(AuthContext)

  const [Name, setName] = useState('')
  const [Deadline, setDeadline] = useState('')
  const [StartDate, setStartDate] = useState('')
  const [Status, setStatus] = useState('')
  const [Description, setDescription] = useState('')
  const [Clinet, setClient] = useState('')

  useEffect(() => {
    setName(project?.name)
    setDeadline(project?.deadline)
    setStartDate(project?.start_date)
    setDescription(project?.description)
    setClient(project?.client)
    setStatus(project?.status)
  }, [project])

  //create client
  const UpdateProject = async (e) => {
    e.preventDefault()
    if (StartDate > Deadline) {
      handleToast('Start Date must be less than deadline date', 'error')
      return false
    }
    // creating a form data object
    let data = {
      name: e.target.name.value,
      deadline: e.target.deadline.value,
      start_date: e.target.start_date.value,
      description: e.target.description.value,
      client: e.target.client.value,
      status: e.target.status.value,
    }
    //validating form
    try {
      await ProjectSchema.validate(data, { abortEarly: false })
      // The form data is valid, do something with it

      //api option
      const options = {
        method: 'PATCH',
        url: `http://127.0.0.1:8000/api/project/${project.id}/update/`,
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
          handleToast('Project updated succesfully', 'success')
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
    <form onSubmit={UpdateProject}>
      <div className="grid md:grid-cols-1 gap-6 mb-6">
        <div>
          <label
            htmlFor="fn"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Project Name
          </label>
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
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
            Project status
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="inprogress" selected={Status == 'inprogress'}>
              In Progress
            </option>
            <option value="notstarted" selected={Status == 'notstarted'}>
              Not Started
            </option>
            <option value="onhold" selected={Status == 'onhold'}>
              On Hold
            </option>
            <option value="canceled" selected={Status == 'canceled'}>
              Canceled
            </option>
            <option value="finished" selected={Status == 'finished'}>
              Finished
            </option>
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
            onChange={(e) => setClient(e.target.value)}
          >
            <option value="">Select a client</option>
            {clients?.map((client, index) => {
              return (
                <option value={client.id} selected={Clinet == client.id}>
                  {client.company_name}
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
            Project Description
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

export default AddForm
