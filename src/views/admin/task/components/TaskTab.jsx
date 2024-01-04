import ProtoTypes from 'prop-types'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../../context/AuthContext'

import { FaPencilAlt, FaTrashAlt, FaEye } from 'react-icons/fa'
import AddClientModal from '../../../../components/modal/AddClientModal'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
// import status from '../../../../data/variables/'
import { isAdmin } from '../../../../utils/Permission'
import author6 from '../../../../assets/images/avatar/user-40x40-6.png'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../../../utils/toastUtils'

var status = []
status['incomplete'] = {
  title: 'In Complete',
  color: 'text-bamber-500 bg-bamber-50',
}
status['doing'] = {
  title: 'Doing',
  color: 'text-error-300 bg-error-50',
}
status['todo'] = {
  title: 'To Do',
  color: 'text-success-300 bg-success-50',
}
status['completed'] = {
  title: 'Completed',
  color: 'text-success-300 bg-success-50',
}

var priority_data = []
priority_data['medium'] = {
  title: 'Medium',
  color: 'text-black bg-cyan-300',
}
priority_data['high'] = {
  title: 'High',
  color: 'text-bamber-500 bg-bamber-50',
}
priority_data['low'] = {
  title: 'Low',
  color: 'text-error-300 bg-error-50',
}

function TaskTab({ data, pageSize }) {
  const { authTokens, logoutUser, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isEditModalActive, setActiveEditModal] = useState(false)
  const [editClientData, setEditClientData] = useState(null)
  const [showName, setShowName] = useState(false)

  const handleModal = () => {
    setActiveEditModal(!isEditModalActive)
  }
  const DeleteTask = async (id) => {
    // creating a form data object
    let data = []

    try {
      //api option
      const options = {
        method: 'DELETE',
        url: `http://127.0.0.1:8000/api/task/${id}/delete/`,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      }
      //api request for create client
      axios
        .request(options)
        .then((res) => {
          sucessNotify('Task deleted succesfully')

          window.location.reload()
        })
        .catch((err) => {
          var errors = err.response.data
          Object.keys(errors).forEach((key) => {
            errorNotify(key.toUpperCase() + ' : ' + errors[key][0])
          })
        })
    } catch (errors) {
      const errorMessages = errors.inner.map((error) => error.message)
      errorNotify(errorMessages.join('\n'))
    }
  }
  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => DeleteTask(id),
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        },
      ],
    })
  }
  return (
    <div className="table-content w-full overflow-x-auto">
      <table className="w-full">
        <tbody>
          <tr className="border-b border-bgray-300 dark:border-darkblack-400">
            <td className="">
              <label className="text-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer rounded-full border border-bgray-400 bg-transparent text-success-300 focus:outline-none focus:ring-0"
                />
              </label>
            </td>
            <td className="inline-block w-[250px] px-6 py-5 lg:w-auto xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Title
                </span>
                <span>
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.332 1.31567V13.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.66602 13.3157V1.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </td>
            <td className="px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Assigned to
                </span>
                <span>
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.332 1.31567V13.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.66602 13.3157V1.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </td>
            <td className="px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Project
                </span>
                <span>
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.332 1.31567V13.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.66602 13.3157V1.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </td>
            <td className="px-6 py-5 xl:px-0">
              <div className="flex items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Priority
                </span>
                <span>
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.332 1.31567V13.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.66602 13.3157V1.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </td>
            <td className="px-6 py-5 xl:px-0">
              <div className="flex items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Status
                </span>
                <span>
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.332 1.31567V13.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.66602 13.3157V1.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </td>
            {/* <td className="w-[165px] px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Spent
                </span>
                <span>
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.332 1.31567V13.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.66602 11.3157L3.66602 13.3157L1.66602 11.3157"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.66602 13.3157V1.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.332 3.31567L10.332 1.31567L8.33203 3.31567"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </td> */}
            <td className="px-6 py-5 xl:px-0"></td>
          </tr>
          {data?.map((task, index) =>
            pageSize
              ? index + 1 <= pageSize && (
                  <tr
                    key={index}
                    className="border-b border-bgray-300 dark:border-darkblack-400"
                  >
                    <td className="">
                      <label className="text-center">
                        <input
                          type="checkbox"
                          className="h-5 w-5 cursor-pointer rounded-full border border-bgray-400 bg-transparent text-success-300 focus:outline-none focus:ring-0"
                        />
                      </label>
                    </td>
                    <td className="px-6 py-5 xl:px-0">
                      <div className="flex w-full items-center space-x-2.5">
                        {/* <div className="h-10 w-10 overflow-hidden rounded-full">
                            <img
                            src={img}
                            alt="avatar"
                            className="h-full w-full object-cover"
                            />
                        </div> */}
                        <p className="text-base font-semibold text-bgray-900 dark:text-white">
                          {task.title}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 xl:px-0">
                      <div className="mt-4 flex -space-x-2 overflow-hidden">
                        {task?.assigned_to.map((employee, index) => (
                          <img
                            className="inline-block h-8 w-8 rounded-full ring ring-white"
                            src={employee.profile_pic}
                            alt=""
                            data-tooltip-id={`my-tooltip-${index + 1}`}
                            data-tooltip-content={employee.first_name +" "+ employee.last_name}
                          />
                        ))}

                        {/* <div className="inline-flex justify-center h-8 w-8 rounded-full items-center text-gray-500 text-xs font-semibold bg-white">
              +5
            </div> */}

                        <Tooltip id={`my-tooltip-${index + 1}`} />
                      </div>
                    </td>
                    <td className="px-6 py-5 xl:px-0">
                      <p className="text-base font-medium text-bgray-900 dark:text-white">
                        {task.project.name}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span
                        className={`bg-success-50 dark:bg-darkblack-500 text-sm ${
                          priority_data[task.priority]?.color
                        } font-medium rounded-lg py-1 px-3`}
                      >
                        {priority_data[task.priority]?.title}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span
                        className={`bg-success-50 dark:bg-darkblack-500 text-sm ${
                          status[task.status]?.color
                        } font-medium rounded-lg py-1 px-3`}
                      >
                        {status[task.status]?.title}
                      </span>
                    </td>

                    <td className="px-6 py-5 xl:px-0">
                      <div className="flex justify-center">
                        <Link to={`/admin/task/view/${task.id}`}>
                          <button
                            aria-label="none"
                            type="button"
                            className="mr-3"
                          >
                            <FaEye />
                          </button>
                        </Link>
                        {isAdmin(user.groups[0]) && (
                          <>
                            <Link to={`/admin/task/edit/${task.id}`}>
                              <button
                                aria-label="none"
                                type="button"
                                className="mr-3"
                              >
                                <FaPencilAlt />
                              </button>
                            </Link>

                            <button
                              onClick={() => {
                                handleDelete(task?.id)
                              }}
                            >
                              <FaTrashAlt />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              : index < 3 && ''
          )}
        </tbody>
      </table>
    </div>
  )
}

TaskTab.propTypes = {
  pageSize: ProtoTypes.number,
}

export default TaskTab
