import { useState, useEffect, useContext } from 'react'
import img from '../../../../assets/images/avatar/purple-a.png'
import { status, priority_data } from '../../../../data/variables'
import TaskStatusSelector from '../../../../components/form/TaskStatusSelector'
import AuthContext from '../../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../../../utils/toastUtils'

function TaskInfoRight({ task }) {
  const navigate = useNavigate()
  const { authTokens } = useContext(AuthContext)
  const [Status, setStatus] = useState()

  const updateTaskStatus = async (status) => {
    // creating a form data object
    let data = {
      status: Status,
    }
    //validating form
    try {
      // await Schema.validate(data, { abortEarly: false })
      // The form data is valid, do something with it

      //api option
      const options = {
        method: 'PATCH',
        url: `http://127.0.0.1:8000/api/task/${task.id}/update/`,
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
        //   navigate('/admin/task/')
          sucessNotify('Status updated succesfully')
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
      console.log(errorMessages)
      errorNotify(errorMessages[0])
    }
  }
  useEffect(() => {
    setStatus(task.status)
  }, [])
  return (
    <div>
      <div className="flex items-center  pb-6">
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Status :
            </h4>
          </div>
        </div>
        <div className="ml-10">
          <TaskStatusSelector
            status_list={status}
            status={task.status}
            onsetStatus={setStatus}
          />
        </div>
      </div>
      <div className="flex items-center  pb-6">
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Start date :
            </h4>
          </div>
        </div>
        <div className="ml-10">
          <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
            {task.start_date}
          </h4>
        </div>
      </div>
      <div className="flex items-center  pb-6">
        <div className="flex space-x-4">
          <div>
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Deadline :
            </h4>
          </div>
        </div>
        <div className="ml-10">
          <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
            {task.start_date}
          </h4>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            updateTaskStatus(Status)
          }}
          aria-label="none"
          className="rounded-lg bg-success-300 px-12 py-3.5 transition-all text-white font-semibold hover:bg-success-400"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default TaskInfoRight
