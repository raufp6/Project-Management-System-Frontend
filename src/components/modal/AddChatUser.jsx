import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { allMassage } from '../../data/massage'
import { getMyChatUsersData } from '../../services/Api'
import user from '../../data/user'
import AuthContext from '../../context/AuthContext'
import { errorNotify,sucessNotify,DefaultNotify } from '../../utils/toastUtils'

export default function AddChatUserModal({ showModal, users, onClickClose }) {
  const { user, authTokens } = useContext(AuthContext)
  const [isOnline,setOnline] = useState(true)
  const navigate = useNavigate()
//   const addMemberClickHandler_ = async (memberId) => {
//     const userId = user.user_id
//     let requestBody = {
//       members: [memberId, userId],
//       type: 'DM',
//     }
//     await ApiConnector.sendPostRequest(
//       ApiEndpoints.CHAT_URL,
//       JSON.stringify(requestBody),
//       true,
//       false
//     )
//     fetchChatUser()
//     setIsShowAddPeopleModal(false)
//   }

  //create client
  const addMemberClickHandler = async (memberId) => {
    console.log(memberId,"memberid");
    const userId = user.user_id

    // creating a form data object
    let data = {
      members: [memberId, userId],
      type: 'DM',
    }

    try {
      //api option
      const options = {
        method: 'POST',
        url: process.env.REACT_APP_LOCAL_SERVER_URL + 'chats/',
        params: { 'api-version': '1.0' },
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
          navigate('/admin/message')
        //   sucessNotify('Client created succesfully')
          onClickClose(false)
        })
        .catch((err) => {
          var errors = err.response.data
          Object.keys(errors).forEach((key) => {
            errorNotify(key.toUpperCase() + ' : ' + errors[key][0])
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
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Availabel Users</h3>
                  <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 ">
                  <ul className="pt-2 divide-y divide-bgray-300 dark:divide-darkblack-400">
                    {users?.map((item, index) => (
                      <li key={index} className="p-3.5 flex justify-between hover:bg-bgray-100 hover:dark:bg-darkblack-500 hover:rounded-lg transition-all cursor-pointer">
                        <div className="flex space-x-3 grow">
                          <div className="w-14 h-14 relative">
                            <img src={item?.profile_pic} alt="" />
                            <span
                              className={`${
                                isOnline ? 'bg-success-300' : 'bg-gray-300'
                              } dark:border-bgray-900 border-2 border-white block w-[14px] h-[14px] rounded-full absolute bottom-1 right-0`}
                            ></span>
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-bgray-900 dark:text-white">
                              {item.first_name + ' ' + item.last_name}
                            </h4>
                            <span className={`text-sm font-medium`}>
                              {/* {item.groups[0]} */}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-lg font-semibold text-bgray-700 dark:text-bgray-50">
                            <button
                              onClick={() => addMemberClickHandler(item.id)}
                            >
                              Add
                            </button>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      onClickClose(!showModal)
                    }}
                  >
                    Close
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
