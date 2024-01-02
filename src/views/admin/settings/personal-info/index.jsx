import { useState, useContext, useEffect } from 'react'
import ProtoTypes from 'prop-types'
import profileImg from '../../../../assets/images/avatar/profile.png'
import coverImg from '../../../../assets/images/others/cover.jpg'
import PersonalInfoFrom from '../../../../components/form/PersonalInfoFrom'
import AuthContext from '../../../../context/AuthContext'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../../../utils/toastUtils'
import { getUser } from '../../../../services/Api'
import { UsertUrl } from '../../../../services/apiUrls'
import ImageUploading from 'react-images-uploading'
import axios from 'axios'

function PersonalInfo() {
  const { user, authTokens } = useContext(AuthContext)
  const [queryParams, setqueryParams] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const [ActiveImgUpload, setActiveImgUpload] = useState(false)
  const [ProfilePic, setPrifilePic] = useState('')
  const [images, setImages] = useState([])

  const onChangeProfilePic = (imageList, addUpdateIndex) => {
    
    setImages(imageList)
  }
  const UploadProfilePic = async () => {
    if (images.length == 0) {
      errorNotify('Please select a Image')
      return false
    }
    // creating a form data object
    let data = {}

    console.log(data, 'update profile pic')
    //validating form
    try {
      const form = new FormData()

      if (images) {
        images.forEach((image, index) => {
          form.append(`profile_pic`, image.file)
        })
      }
      console.log(form, 'update profile pic')
      //api option
      const options = {
        method: 'PATCH',
        url: `http://127.0.0.1:8000/api/user/${user.user_id}/update/`,
        params: { 'api-version': '3.0' },
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
        data: form,
      }
      axios
        .request(options)
        .then((res) => {
          sucessNotify('Profile Picture updated succesfully')
          setActiveImgUpload(!ActiveImgUpload)
          setImages([])
          setPrifilePic(res.data.profile_pic)
        })
        .catch((err) => {
          var errors = err.response.data
          console.log(errors)
          Object.keys(errors).forEach((key) => {
            errorNotify(key.toUpperCase() + ' : ' + errors[key][0])
          })
        })
    } catch (errors) {
      // There are errors in the form data
      const errorMessages = errors.inner.map((error) => error.message)
      console.log(errorMessages)
      errorNotify(errorMessages[0])
    }
  }

  //get user details
  const fetchUser = async (url) => {
    console.log('get user')
    try {
      const userData = await getUser(queryParams, url)
      setUserInfo(userData)
      setPrifilePic(userData?.profile_pic)
    } catch (error) {
      errorNotify(error)
    }
  }

  useEffect(() => {
    fetchUser(UsertUrl + user.user_id)
  }, [queryParams])

  return (
    <div id="tab1" className="tab-pane active">
      <div className="xl:grid grid-cols-12 gap-12 flex 2xl:flex-row flex-col-reverse">
        <PersonalInfoFrom userInfo={userInfo} />
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
                        for="file-upload"
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
                        <div key={index} className="image-item w-full h-full">
                          <img
                            src={image['data_url']}
                            alt=""
                            className="object-scale-down"
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </ImageUploading>
            <div className={`${ActiveImgUpload ? 'block' : 'hidden'}`}>
              <button
                onClick={UploadProfilePic}
                aria-label="none"
                className="rounded-lg bg-success-300 text-white font-semibold py-2 px-4 mb-3"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

PersonalInfo.propTypes = {
  name: ProtoTypes.string,
  activeTab: ProtoTypes.string,
}

export default PersonalInfo
