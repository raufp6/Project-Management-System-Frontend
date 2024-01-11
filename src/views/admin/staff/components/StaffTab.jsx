import ProtoTypes from 'prop-types'
import { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../../../../context/AuthContext'

import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import AddClientModal from '../../../../components/modal/AddClientModal'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../../../utils/toastUtils'
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
function StaffTab({ data, pageSize }) {
  const { authTokens, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isEditModalActive, setActiveEditModal] = useState(false)
  const [editClientData, setEditClientData] = useState(null)
  const handleModal = () => {
    setActiveEditModal(!isEditModalActive)
  }
  const DeleteClient = async (id) => {
    // creating a form data object
    let data = []

    try {
      //api option
      const options = {
        method: 'DELETE',
        url: `${process.env.REACT_APP_LOCAL_SERVER_URL}user/${id}/delete/`,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      }
      //api request for create client
      axios
        .request(options)
        .then((res) => {
          handleToast('Staff deleted succesfully', 'success')

          window.location.reload()
        })
        .catch((err) => {
          var errors = err.response.data
          Object.keys(errors).forEach((key) => {
            handleToast(key.toUpperCase() + ' : ' + errors[key][0], 'error')
          })
        })
    } catch (errors) {
      const errorMessages = errors.inner.map((error) => error.message)
      handleToast(errorMessages.join('\n'), 'error')
    }
  }
  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => DeleteClient(id),
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
            <td className="">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  #ID
                </span>
              </div>
            </td>
            <td className="inline-block w-[250px] px-6 py-5 lg:w-auto xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Staff Name
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
                  Email
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

            <td className="px-6 py-5 xl:px-0"></td>
          </tr>
          {data?.map((user, index) =>
            pageSize
              ? index + 1 <= pageSize && (
                  <tr key={index} className="border-b border-bgray-300 dark:border-darkblack-400">
                    <td className="">
                      <label className="text-center">
                        <input
                          type="checkbox"
                          className="h-5 w-5 cursor-pointer rounded-full border border-bgray-400 bg-transparent text-success-300 focus:outline-none focus:ring-0"
                        />
                      </label>
                    </td>
                    <td className="px-6 py-5 xl:px-0">
                      <p className="text-base font-medium text-bgray-900 dark:text-white">
                        {user.emp_id}
                      </p>
                    </td>
                    <td className="px-6 py-5 xl:px-0">
                      <div className="flex w-full items-center space-x-2.5">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <img
                            src={user.user.profile_pic}
                            alt="avatar"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="text-base font-semibold text-bgray-900 dark:text-white">
                          {user.user.first_name + ' ' + user.user.last_name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5 xl:px-0">
                      <p className="text-base font-medium text-bgray-900 dark:text-white">
                        {user.user.email}
                      </p>
                    </td>
                    <td className="px-6 py-5 xl:px-0">
                      <p className="text-base font-medium text-bgray-900 dark:text-white">
                        {user.status}Active
                      </p>
                    </td>

                    <td className="px-6 py-5 xl:px-0">
                      <div className="flex justify-center">
                        <Link to={`/admin/staff/edit/${user.id}`}>
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
                            handleDelete(user?.user.id)
                          }} 
                        >
                          <FaTrashAlt />
                        </button>
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

StaffTab.propTypes = {
  pageSize: ProtoTypes.number,
}

export default StaffTab
