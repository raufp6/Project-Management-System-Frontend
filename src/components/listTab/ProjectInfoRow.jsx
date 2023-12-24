import { useState, useContext } from 'react'
import axios from 'axios'
import ProtoTypes from 'prop-types'
import { FaPencilAlt, FaTrashAlt, FaEye } from 'react-icons/fa'
import AddClientModal from '../modal/AddClientModal'
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../utils/toastUtils'
import { isAdmin } from '../../utils/Permission'
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
var status_list = []
status_list['ongoing'] = {
  title: 'On Going',
  color: 'text-bamber-500 bg-bamber-50',
}
status_list['notstarted'] = {
  title: 'Not Started',
  color: 'text-error-300 bg-error-50',
}
status_list['finished'] = {
  title: 'Finished',
  color: 'text-success-300 bg-success-50',
}
status_list['inprogress'] = {
  title: 'In Progress',
  color: 'text-success-300 bg-yellow-400',
}
status_list['onhold'] = {
  title: 'On Hold',
  color: 'text-success-300 bg-yellow-400',
}
status_list['canceled'] = {
  title: 'Canceled',
  color: 'text-white bg-rose-950',
}


function ProjectInfoRow({
  name,
  start_date,
  client,
  project,
  status,
  priority,
  deadline,
}) {
  const [isEditModalActive, setActiveEditModal] = useState(false)
  const [editClientData, setEditClientData] = useState(null)
  const { authTokens, logoutUser, user } = useContext(AuthContext)
  // const status_list = {
  //   notstarted: 'NOT STARTED',
  // }


  const handleModal = () => {
    setActiveEditModal(!isEditModalActive)
  }

  const DeleteProject = async (id) => {
    // creating a form data object
    let data = []

    try {
      //api option
      const options = {
        method: 'DELETE',
        url: `http://127.0.0.1:8000/api/project/${id}/delete/`,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      }
      //api request for create client
      axios
        .request(options)
        .then((res) => {
          handleToast('Project deleted succesfully', 'success')

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
          onClick: () => DeleteProject(id),
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        },
      ],
    })
  }

  return (
    <>
      <tr className="border-b border-bgray-300 dark:border-darkblack-400">
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
            {client}
          </p>
        </td>
        <td className="px-6 py-5 xl:px-0">
          <p className="text-base font-medium text-bgray-900 dark:text-white">
            {start_date}
          </p>
        </td>
        <td className="px-6 py-5 xl:px-0">
          <p className="text-base font-medium text-bgray-900 dark:text-white">
            {deadline}
          </p>
        </td>

        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <span
            className={`text-sm ${status_list[status]?.color} font-medium rounded-lg py-1 px-3`}
          >
            {status_list[status]?.title}
          </span>
        </td>

        <td className="px-6 py-5 xl:px-0">
          <div className="flex justify-center">
            <Link to={`/admin/project/view/${project.id}`}>
              <button aria-label="none" type="button" className="mr-3">
                <FaEye />
              </button>
            </Link>
            {isAdmin(user.groups[0]) && (
              <>
                <Link to={`/admin/project/edit/${project.id}`}>
                  <button aria-label="none" type="button" className="mr-3">
                    <FaPencilAlt />
                  </button>
                </Link>

                <button
                  onClick={() => {
                    handleDelete(project.id)
                  }}
                >
                  <FaTrashAlt />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
      <AddClientModal
        isActive={isEditModalActive}
        handleClose={setActiveEditModal}
        user={editClientData}
      />
    </>
  )
}

ProjectInfoRow.propTypes = {
  img: ProtoTypes.string,
  name: ProtoTypes.string,
  email: ProtoTypes.string,
  location: ProtoTypes.string,
  spent: ProtoTypes.string,
}

export default ProjectInfoRow
