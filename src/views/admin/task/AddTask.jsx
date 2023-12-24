import ProtoTypes from 'prop-types'
import AddForm from './components/AddForm'
import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../context/AuthContext'
import { getStaffList,getProjecttList } from '../../../services/Api'
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

function AddTask() {
  const { authTokens, logoutUser } = useContext(AuthContext)
  const [projects, setProjects] = useState()
  const [users, setUsers] = useState()

 

  useEffect(() => {
    const fetchAllStaff = async () => {
      try {
        const staffData = await getStaffList({usertype:'emp'})
        setUsers(staffData)
        console.log(staffData)
      } catch (error) {
        errorNotify(error)
      }
    }
    const fetchAllProjects = async () => {
      try {
        const staffData = await getProjecttList({ usertype: 'emp' })
        setProjects(staffData)
      } catch (error) {
        errorNotify(error)
      }
    }
    fetchAllStaff()
    fetchAllProjects()

  }, [])
  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <div className="2xl:col-span-9 col-span-8">
            <div className="rounded-lg bg-white dark:bg-darkblack-600 px-6 py-8">
              <div className="2xl:flex justify-between gap-12">
                {/* Form  */}
                <AddForm users={users} projects={projects} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AddTask
