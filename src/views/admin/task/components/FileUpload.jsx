import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../../../context/AuthContext'
import axios from 'axios'
import { DefaultNotify,sucessNotify,errorNotify } from '../../../../utils/toastUtils'
import { useNavigate } from 'react-router-dom'

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

export default function FileUploadModal({ onclickhandle, modelstatus, onFileUpload }) {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [file_name, setFileName] = useState(null)

  const { authTokens, logoutUser } = useContext(AuthContext)
  const { id } = useParams()
  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }
  const handleUpload_ = async () => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('file_name', file_name)

    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL_SERVER_URL}task/file/${id}/upload/`,
        {
          method: 'POST',
          body: formData,
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + String(authTokens.access),
        }
      )

      if (response.ok) {
        const data = await response.json()
        onFileUpload(data) // Update the file list or perform any other action
      } else {
        console.error('File upload failed:', response.statusText)
      }
    } catch (error) {
      console.error('Error during file upload:', error)
    }
  }
    const handleUpload = async () => {
      try {
        // await ClientSchema.validate(data, { abortEarly: false })

        const formData = new FormData()
        formData.append('file', file)
        const options = {
          method: 'POST',
          url: `${process.env.REACT_APP_LOCAL_SERVER_URL}task/file/${id}/upload/`,
          params: { 'api-version': '3.0' },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
          data: formData,
        }
        //api request for create client
        axios
          .request(options)
          .then((res) => {
            // navigate('/admin/staff')
            handleToast('File uploaded succesfully', 'success')
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
        handleToast(errorMessages.join('\n'), 'error')
      }
    }
  return (
    <>
      {modelstatus ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Upload File</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => onclickhandle(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 ">
                  <div>
                    <label
                      htmlFor="fn"
                      className="block text-basse  font-medium text-bgray-600 mb-2"
                    >
                      File Name
                    </label>
                    <input
                      type="text"
                      name="file_name"
                      onChange={(e)=>{
                        setFileName(e.target.value)
                      }}
                      className="bg-bgray-50   p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
                    <div className="relative w-4/5 h-32 max-w-xs mb-10 bg-white bg-gray-100 rounded-lg shadow-inner">
                      <input
                        type="file"
                        id="file-upload"
                        name="image"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <label
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
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onclickhandle(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
