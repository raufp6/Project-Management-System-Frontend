import { useState, useContext, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../../context/AuthContext'
import { DefaultNotify, sucessNotify, errorNotify } from '../../../../utils/toastUtils'
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
const ClientSchema = yup.object().shape({
  company_name: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  website: yup.string(),
  email: yup.string().email('Invalid email address format').required("Email field is required!"),
  contact_person: yup.string(),
})

function AddForm() {

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const phoneRef = useRef(null)
  
  const navigate = useNavigate()
  const { authTokens } = useContext(AuthContext)


  //create client
  const CreateClientUser = async (e) => {
    e.preventDefault()

    // creating a form data object
    let data = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      company_name: e.target.comapny_name.value,
      website: e.target.website.value,
      contact_person: e.target.contact_person.value,
    }
    //validating form
    try {
      await ClientSchema.validate(data, { abortEarly: false })
      // The form data is valid, do something with it

      //api option
      const options = {
        method: 'POST',
        url: process.env.REACT_APP_LOCAL_SERVER_URL+'clients/create/',
        params: { 'api-version': '3.0' },
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
          navigate('/admin/client')
          handleToast('Client created succesfully', 'success')
        })
        .catch((err) => {
          var errors = err.response.data
          Object.keys(errors).forEach((key) => {
            handleToast(key.toUpperCase() + ' : ' + errors[key][0], 'error')
          })
        })
    } catch (errors) {
      // There are errors in the form data
      const errorMessages = errors.inner.map((error) => error.message)
      
      for (let index = 0; index < errorMessages.length; index++) {
        errorNotify(errorMessages[index])
      }
    }
  }
  
  return (
    <form onSubmit={CreateClientUser}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="fn"
            className="block text-basse font-medium text-bgray-600 mb-2"
          >
            Company Name
          </label>
          <input
            ref={nameRef}
            type="text"
            name="comapny_name"
            className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>

        <div>
          <label
            htmlFor="fn"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Phone Number
          </label>
          <input
            ref={nameRef}
            type="text"
            name="phone"
            className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Contact person
          </label>
          <input
            ref={nameRef}
            type="text"
            name="contact_person"
            className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="fn"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="fn"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Username
          </label>
          <input
            ref={nameRef}
            type="text"
            name="username"
            className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="fn"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Password
          </label>
          <input
            ref={nameRef}
            type="text"
            name="password"
            className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
          />
        </div>
        <div>
          <label
            htmlFor="text"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            website
          </label>
          <input
            ref={nameRef}
            type="text"
            name="website"
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
          Create Client
        </button>
      </div>
    </form>
  )
}

export default AddForm
