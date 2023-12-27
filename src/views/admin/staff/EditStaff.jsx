import EditForm from './components/EditForm'
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




function EditStaff() {
  const { authTokens, logoutUser } = useContext(AuthContext)
  const [staff, setStaff] = useState()
  const { id } = useParams()

  //get staff details
  const getStaff = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/user/employee/${id}/`, {
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
    
    getStaff()
    console.log(staff,"Emp");
  }, [])
  console.log(staff, 'Emp')

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
