import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ProtoTypes from 'prop-types'
import flag from '../../assets/images/flag/us-sm.svg'
import AuthContext from '../../context/AuthContext'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../utils/toastUtils'
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


function AddClientModal({ isActive, handleClose,user }) {
  const navigate = useNavigate()

  const { authTokens, logoutUser } = useContext(AuthContext)

  const handleBack = ()=>{
    navigate('admin/client/')
  }
  

  const [Phone, setPhone] = useState('')
  const [CompanyName, setCompanyName] = useState('')
  const [Website, setWebsite] = useState('')
  const [ContactPerson, setContactPerson] = useState('')
  
  useEffect(() => {
    setCompanyName(user?.company_name)
    setPhone(user?.phone)
    setContactPerson(user?.contact_person)
    setWebsite(user?.website)
  }, [user])

  const updateClient = async (id,e) => {
    e.preventDefault();

    // creating a form data object
    let data = {
      phone: Phone,
      company_name: CompanyName,
      website: Website,
      contact_person: ContactPerson,
    }

    try {
      await ClientSchema.validate(data, { abortEarly: false })
    
      //api option
      const options = {
        method: 'PATCH',
        url: `http://127.0.0.1:8000/api/clients/${id}/update/`,
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
          
          handleToast('Client updated succesfully', 'success')
          handleClose(false)
          window.location.reload();
          
        })
        .catch((err) => {
          var errors = err.response.data
          Object.keys(errors).forEach((key) => {
            handleToast(key.toUpperCase() + ' : ' + errors[key][0], 'error')
          })
        })
    } catch (errors) {
      console.log(errors);
      const errorMessages = errors.inner.map((error) => error.message)
      handleToast(errorMessages.join('\n'), 'error')
    }
  }

  return (
    <div
      className={`modal fixed inset-0 z-50 h-full overflow-y-auto flex items-center justify-center ${
        isActive ? '' : 'hidden'
      }`}
      id="multi-step-modal"
    >
      <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75 "></div>
      <div className="modal-content md:w-full max-w-3xl px-4">
        <div className="step-content step-1">
          {/* My Content */}
          <div className="max-w-[750px] rounded-lg bg-white p-6 pb-10 transition-all relative">
            <header>
              <div>
                <h3 className="font-bold text-bgray-900  text-2xl mb-1">
                  Client Details
                </h3>
              </div>
              <div className="absolute top-0 right-0 pt-5 pr-5">
                <button
                  aria-label="none"
                  type="button"
                  onClick={() => handleClose(false)}
                  id="step-1-cancel"
                  className="rounded-md bg-white focus:outline-none btn-closemodal"
                >
                  <span className="sr-only">Close</span>
                  {/* Cross Icon  */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 6L18 18M6 18L18 6L6 18Z"
                      stroke="#747681"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </header>
            <form
              action=""
              onSubmit={(e) => {
                updateClient(user?.id, e)
              }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="chn"
                    className="block mb-3 text-base font-medium text-bgray-600 "
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    className="bg-bgray-50 w-full font-medium border-0 rounded-xl p-4 h-14 placeholder:text-bgray-900 "
                    placeholder="Your company name"
                    value={CompanyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="chn"
                    className="block mb-3 text-base font-medium text-bgray-600 "
                  >
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contact_person"
                    className="bg-bgray-50   w-full font-medium border-0 rounded-xl p-4 h-14 placeholder:text-bgray-900 "
                    placeholder=""
                    value={ContactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="chn"
                    className="block mb-3 text-base font-medium text-bgray-600 "
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-bgray-50   w-full font-medium border-0 rounded-xl p-4 h-14 placeholder:text-bgray-900 "
                    placeholder="012 300 004 5641"
                  />
                </div>
                <div>
                  <label
                    htmlFor="chn"
                    className="block mb-3 text-base font-medium text-bgray-600 "
                  >
                    Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={Website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="bg-bgray-50   w-full font-medium border-0 rounded-xl p-4 h-14 placeholder:text-bgray-900 "
                    placeholder="03/23"
                  />
                </div>
              </div>
              <div className="flex justify-center pt-11">
                <button
                  aria-label="none"
                  className="bg-success-300 hover:bg-success-400 text-white font-semibold text-sm py-4 flex justify-center items-center rounded-lg px-20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

AddClientModal.propTypes = {
  isActive: ProtoTypes.bool,
  handleClose: ProtoTypes.func,
}

export default AddClientModal
