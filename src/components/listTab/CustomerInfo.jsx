import { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import ProtoTypes from 'prop-types'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import AddClientModal from '../modal/AddClientModal'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../utils/toastUtils'
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
function CustomerInfo({ img, name, email, phone, id, user }) {
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
        url: `${process.env.REACT_APP_LOCAL_SERVER_URL}clients/${id}/delete/`,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      }
      //api request for create client
      axios
        .request(options)
        .then((res) => {
          handleToast('Client deleted succesfully', 'success')

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
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
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
            {name}
          </p>
        </div>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {email}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {phone}
        </p>
      </td>
      {/* <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          ${spent}
        </p>
      </td> */}
      <td className="px-6 py-5 xl:px-0">
        <div className="flex justify-center">
          <button
            onClick={() => {
              setEditClientData(user)
              handleModal()
            }}
            aria-label="none"
            type="button"
            className="mr-3"
          >
            <FaPencilAlt />
          </button>
          <button
            onClick={() => {
              handleDelete(user?.id)
            }}
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  )
}

CustomerInfo.propTypes = {
  img: ProtoTypes.string,
  name: ProtoTypes.string,
  email: ProtoTypes.string,
  location: ProtoTypes.string,
  spent: ProtoTypes.string,
}

export default CustomerInfo
