import ProtoTypes from 'prop-types'
import EditForm from './components/EditFrom'
import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext'
import { Link, useParams } from 'react-router-dom'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../../utils/toastUtils'
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
const ClientSchema = yup.object().shape({
  company_name: yup.string().required('Company name field is required'),
  website: yup.string(),
  contact_person: yup.string(),
})

function AddProject() {
  const { authTokens, logoutUser } = useContext(AuthContext)
  const [clients, setClients] = useState()
  const [project, setProject] = useState()
  const { id } = useParams()
  
  //get client list
  const getClientList = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/clients/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(authTokens.access),
      },
    })
    let data = await response.json()
    if (response.status === 200) {
      setClients(data)
    } else if (response.statusText === 'Unauthorized') {
      return logoutUser()
    }
  }

  //get project details
  const getProjectDetails = async () => {
    // let response = await fetch(
    //   `http://127.0.0.1:8000/api/project/${id}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer ' + String(authTokens.access),
    //     },
    //   }
    // )
    // let data = await response.json()
    // if (response.status === 200) {
    //   setProject(data)
    // } else if (response.statusText === 'Unauthorized') {
    //   return logoutUser()
    // }


    ///
    try {
      //api option
      const options = {
        method: 'GET',
        url: `http://127.0.0.1:8000/api/project/${id}`,
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      }
      //api request for create client
      axios
        .request(options)
        .then((res) => {
          setProject(res.data)

          
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

  useEffect(() => {
    getClientList()
    getProjectDetails()
  }, [])
  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <div className="2xl:col-span-9 col-span-8">
            <div className="rounded-lg bg-white  px-6 py-8">
              <div className="2xl:flex justify-between gap-12">
                {/* Form  */}
                <EditForm clients={clients} project={project} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AddProject
