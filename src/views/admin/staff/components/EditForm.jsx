import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../../context/AuthContext'
import { getGroups } from '../../../../services/Api'
import profileImg from '../../../../assets/images/avatar/profile.png'
import axios from 'axios'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../../../utils/toastUtils'
import * as yup from 'yup'
import ImageUploading from 'react-images-uploading'

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
const Schema = yup.object().shape({
  username: yup.string().required('Username field is required'),
  email: yup.string().required('Email field is required'),
})
function EditForm({ staff }) {
  const { authTokens, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [ActiveImgUpload, setActiveImgUpload] = useState(false)
  const [Username, setUsername] = useState('')
  const [Email, setEmail] = useState('')
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [Phone, setPhone] = useState('')
  const [ProfilePic, setPrifilePic] = useState('')
  const [profile_pic, setProfilePicUpload] = useState({})
  const [JoinedDate, setJoindedDate] = useState('')
  const [Group, setGroup] = useState([])
  const [groupslist, setGroups] = useState([])
  const [images, setImages] = useState([])

  const onChangeProfilePic = (imageList, addUpdateIndex) => {
    setImages(imageList)
  }
  const handleChange = (e) => {
    const { name, value, type } = e.target

    // If the input is a file input, update the state with the selected file
    const updatedValue = type === 'file' ? e.target.files[0] : value

    setProfilePicUpload({
      updatedValue,
    })
  }

  useEffect(() => {
    setUsername(staff?.user.username)
    setEmail(staff?.user.email)
    setGroup(staff?.user.groups[0])

    setGroup([[staff?.user.groups[0]]])

    setFirstName(staff?.user.first_name)
    setLastName(staff?.user.last_name)
    setPhone(staff?.phone)
    setPrifilePic(staff?.user.profile_pic)
    setJoindedDate(staff?.joined_date)
  }, [staff])
  console.log(staff?.user.groups, 'Group')

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupData = await getGroups()
        setGroups(groupData.results)
      } catch (error) {
        errorNotify(error)
      }
    }
    fetchGroups()
  }, [])

  //create client
  const UpdateStaff = async (e) => {
    e.preventDefault()
    // console.log(e.target.image.files[0],"img")
    // creating a form data object
    let data = {
      username: Username,
      email: Email,
      groups: Group,
      first_name: FirstName,
      last_name: LastName,
      phone: Phone,
      joined_date: JoinedDate,
    }

    console.log(data, 'update data')
    //validating form
    try {
      await Schema.validate(data, { abortEarly: false })
      // The form data is valid, do something with it
      const form = new FormData()
      // Append each form field to the FormData object
      Object.entries(data).forEach(([key, value]) => {
        form.append(key, value)
      })
      // if (e.target.image.files[0]) {
      //   // console.log(e.target.image.files[0],"img have");
      //   //form.append('profile_pic', e.target.image.files[0])
      // }
      if (images) {
        images.forEach((image, index) => {
          form.append(`profile_pic`, image.file)
        })
      }
      //api option
      const options = {
        method: 'PATCH',
        url: `${process.env.REACT_APP_LOCAL_SERVER_URL}user/employee/${staff.id}/update/`,
        params: { 'api-version': '3.0' },
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
        data: form,
      }
      //api request for create client
      axios
        .request(options)
        .then((res) => {
          console.log(res)
          console.log(res.data)
          navigate('/admin/staff/')
          handleToast('Staff updated succesfully', 'success')
        })
        .catch((err) => {
          var errors = err.response.data
          console.log(errors)
          Object.keys(errors).forEach((key) => {
            handleToast(key.toUpperCase() + ' : ' + errors[key][0], 'error')
          })
        })
    } catch (errors) {
      // There are errors in the form data
      const errorMessages = errors.inner.map((error) => error.message)
      console.log(errorMessages)
      handleToast(errorMessages[0], 'error')
    }
  }
  return (
    <form
      onSubmit={(e) => {
        UpdateStaff(e)
      }}
    >
      <div className="xl:grid grid-cols-12 gap-12 flex 2xl:flex-row flex-col-reverse">
        <div className="2xl:col-span-8 xl:col-span-7">
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="fn"
                className="block text-basse  font-medium text-bgray-600 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="fn"
                className="block text-basse  font-medium text-bgray-600 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="fn"
                className="block text-basse  font-medium text-bgray-600 mb-2"
              >
                Mobile
              </label>
              <input
                type="text"
                name="phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="fn"
                className="block text-basse  font-medium text-bgray-600 mb-2"
              >
                Joined Date
              </label>
              <input
                type="date"
                value={JoinedDate}
                name="joined_date"
                onChange={(e) => setJoindedDate(e.target.value)}
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
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
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
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
              />
            </div>

            <div>
              <label
                htmlFor="text"
                className="block text-basse  font-medium text-bgray-600 mb-2"
              >
                User Group
              </label>
              <select
                onChange={(e) => setGroup([[e.target.value]])}
                className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
                name="group"
              >
                {groupslist?.map((item) => {
                  return (
                    <option
                      value={item.id}
                      selected={staff?.user.groups[0] == item.id}
                    >
                      {item.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              aria-label="none"
              className="rounded-lg bg-success-300 px-12 py-3.5 transition-all text-white font-semibold hover:bg-success-400"
            >
              Update
            </button>
          </div>
        </div>
        <div className="2xl:col-span-4 xl:col-span-5 2xl:mt-24">
          {/* Image Upload */}
          <div className="bg-green-100 flex flex-col items-center justify-center w-full h-auto sm:w-3/4 sm:rounded-lg sm:shadow-xl">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Profile Image</h2>
              <p className="text-xs text-gray-500">
                File should be of format .jpg,png
              </p>
            </div>
            <div
              className={`p-2 relative ${ActiveImgUpload ? 'hidden' : 'block'}`}
            >
              <img
                className="object-scale-down h-60 w-60 ..."
                src={ProfilePic}
                alt=""
              />
              <button
                aria-label="none"
                className="absolute right-4 bottom-10"
                onClick={(e) => {
                  e.preventDefault()
                  setActiveImgUpload(!ActiveImgUpload)
                }}
              >
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="14.2414"
                    cy="14.2414"
                    r="14.2414"
                    fill="#22C55E"
                  />
                  <path
                    d="M14.6994 10.2363C15.7798 11.3167 16.8434 12.3803 17.9171 13.454C17.7837 13.584 17.6403 13.7174 17.5036 13.8574C15.5497 15.8114 13.5924 17.7653 11.6385 19.7192C11.5118 19.8459 11.3884 19.9726 11.2617 20.0927C11.2317 20.1193 11.185 20.1427 11.145 20.1427C10.1281 20.146 9.11108 20.1427 8.0941 20.146C8.02408 20.146 8.01074 20.1193 8.01074 20.0593C8.01074 19.049 8.01074 18.0354 8.01408 17.0251C8.01408 16.9784 8.03742 16.9217 8.06743 16.8917C9.26779 15.688 10.4682 14.4876 11.6685 13.2873C12.6655 12.2903 13.6591 11.2967 14.6561 10.2997C14.6761 10.2797 14.6861 10.253 14.6994 10.2363Z"
                    fill="white"
                  />
                  <path
                    d="M18.6467 12.7197C17.573 11.646 16.506 10.579 15.4424 9.51537C15.6324 9.31864 15.8292 9.11858 16.0259 8.91852C16.256 8.68845 16.4894 8.45838 16.7228 8.22831C17.0162 7.93822 17.4197 7.93822 17.7097 8.22831C18.4466 8.9552 19.1802 9.68542 19.9171 10.4123C20.2038 10.6957 20.2138 11.0992 19.9371 11.3859C19.5136 11.8261 19.0868 12.2629 18.6634 12.703C18.66 12.7097 18.65 12.7163 18.6467 12.7197Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <ImageUploading
              value={images}
              onChange={onChangeProfilePic}
              maxNumber={10}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI

                <div
                  className={`relative w-4/5 h-32 max-w-xs mt-4 mb-10 bg-white bg-gray-100 rounded-lg shadow-inner ${
                    ActiveImgUpload ? 'block' : 'hidden'
                  }`}
                >
                  <div className="upload__image-wrapper">
                    {/* <input
                      type="file"
                      id="file-upload"
                      name="image"
                      className="hidden"
                      onChange={handleProfilePiccChange}
                    /> */}
                    {imageList.length == 0 ? (
                      <label
                        onClick={() => {
                          onImageUpload()
                        }}
                        htmlFor="file-upload"
                        className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
                      >
                        <p className="z-10 text-xs font-light text-center text-gray-500">
                          Drag & Drop your files here
                        </p>

                        <svg
                          className="z-10 w-8 h-8 text-indigo-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                        </svg>
                      </label>
                    ) : (
                      imageList.map((image, index) => (
                        <div
                          key={index}
                          className="relative image-item w-full h-full"
                        >
                          <img
                            src={image['data_url']}
                            alt=""
                            className="object-scale-down"
                          />
                          <button
                            aria-label="none"
                            className="absolute top-0 right-0 "
                            onClick={(e) => {
                              e.preventDefault()
                              setImages([])
                            }}
                          >
                            <svg
                              width="29"
                              height="29"
                              viewBox="0 0 29 29"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="14.2414"
                                cy="14.2414"
                                r="14.2414"
                                fill="#22C55E"
                              />
                              <path
                                d="M14.6994 10.2363C15.7798 11.3167 16.8434 12.3803 17.9171 13.454C17.7837 13.584 17.6403 13.7174 17.5036 13.8574C15.5497 15.8114 13.5924 17.7653 11.6385 19.7192C11.5118 19.8459 11.3884 19.9726 11.2617 20.0927C11.2317 20.1193 11.185 20.1427 11.145 20.1427C10.1281 20.146 9.11108 20.1427 8.0941 20.146C8.02408 20.146 8.01074 20.1193 8.01074 20.0593C8.01074 19.049 8.01074 18.0354 8.01408 17.0251C8.01408 16.9784 8.03742 16.9217 8.06743 16.8917C9.26779 15.688 10.4682 14.4876 11.6685 13.2873C12.6655 12.2903 13.6591 11.2967 14.6561 10.2997C14.6761 10.2797 14.6861 10.253 14.6994 10.2363Z"
                                fill="white"
                              />
                              <path
                                d="M18.6467 12.7197C17.573 11.646 16.506 10.579 15.4424 9.51537C15.6324 9.31864 15.8292 9.11858 16.0259 8.91852C16.256 8.68845 16.4894 8.45838 16.7228 8.22831C17.0162 7.93822 17.4197 7.93822 17.7097 8.22831C18.4466 8.9552 19.1802 9.68542 19.9171 10.4123C20.2038 10.6957 20.2138 11.0992 19.9371 11.3859C19.5136 11.8261 19.0868 12.2629 18.6634 12.703C18.66 12.7097 18.65 12.7163 18.6467 12.7197Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </ImageUploading>
            
          </div>
        </div>
      </div>
    </form>
  )
}

export default EditForm
