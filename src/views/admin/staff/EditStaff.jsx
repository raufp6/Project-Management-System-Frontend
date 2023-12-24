import EditForm from './components/EditForm'
import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext'
import { Link, useParams } from 'react-router-dom'
import { getClientList } from '../../../services/Api'
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

function EditStaff() {
  const { authTokens, logoutUser } = useContext(AuthContext)
  const [clients, setClients] = useState()
  const [staff, setStaff] = useState()
  const { id } = useParams()

  //get client list
  // const getClientList = async () => {
  //   let response = await fetch('http://127.0.0.1:8000/api/clients/', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + String(authTokens.access),
  //     },
  //   })
  //   let data = await response.json()
  //   if (response.status === 200) {
  //     setClients(data)
  //   } else if (response.statusText === 'Unauthorized') {
  //     return logoutUser()
  //   }
  // }

  //get staff details
  const getStaff = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(authTokens.access),
      },
    })
    let data = await response.json()
    if (response.status === 200) {
      setStaff(data)
    } else if (response.statusText === 'Unauthorized') {
      return logoutUser()
    }
  }

  
  useEffect(() => {
    getClientList()
    getStaff()
  }, [])


  //
  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const clientData = await getClientList()
        setClients(clientData)
      } catch (error) {
        errorNotify(error)
      }
    }
    
    fetchAllClients()
    
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
                <EditForm staff={staff} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default EditStaff
