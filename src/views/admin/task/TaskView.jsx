import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import TaskViewHeader from './components/TaskViewHeader'
import TaskInfo from './components/TaskInfo'
import TaskInfoRight from './components/TaskInfoRight'
import AuthContext from '../../../context/AuthContext'
import { isAdmin,isClient,isDeveloper } from '../../../utils/Permission'
import TaskResources from './components/Resources'
import Files from '../../../components/settings/Files'

function TaskView() {
  const { authTokens, logoutUser, user } = useContext(AuthContext)
  const { id } = useParams()
  const [task, setTask] = useState({})
  const [taskFiles, setTaskFiles] = useState()

  //get project details
  const getTask = async () => {
    let response = await fetch(`${process.env.REACT_APP_LOCAL_SERVER_URL}task/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(authTokens.access),
      },
    })
    let data = await response.json()
    if (response.status === 200) {
      setTask(data)
    } else if (response.statusText === 'Unauthorized') {
      return logoutUser()
    }
  }
  //Get Task Files
  const getTaskFiles = async () => {
    let response = await fetch(`${process.env.REACT_APP_LOCAL_SERVER_URL}task/files/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(authTokens.access),
      },
    })
    let data = await response.json()
    if (response.status === 200) {
      setTaskFiles(data.results)
    } else if (response.statusText === 'Unauthorized') {
      return logoutUser()
    }
  }
  useEffect(() => {
    getTask()
    getTaskFiles()
  }, [])
  return (
    <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px] dark:bg-darkblack-700">
      {/* write your code here */}
      <div className="lg:grid grid-cols-12 gap-10 flex flex-col-reverse">
        {/* Left Column */}
        <div className="2xl:col-span-9 col-span-8">
          {/* <TaskViewHeader /> */}
          <div className="rounded-lg bg-white dark:bg-darkblack-600 px-6 py-8">
            <div className="2xl:flex justify-between gap-12">
              {/* Task Info */}
              <TaskInfo task={task} />
            </div>
          </div>
        </div>

        {/* right Column */}
        {isDeveloper(user.groups[0]) && (
          <div className="w-full 2xl:col-span-3 col-span-4 space-y-10">
            <div className="bg-white dark:bg-darkblack-600 dark:border-darkblack-400 p-8 divide-y divide-bgray-300 dark:divide-darkblack-400 rounded-lg">
              <TaskInfoRight task={task} />
            </div>
          </div>
        )}
        <div className="2xl:col-span-9 col-span-8">
          {/* <TaskViewHeader /> */}
          <div className="rounded-lg bg-white dark:bg-darkblack-600 px-6 py-8">
            <div className="2xl:flex justify-between gap-12">
              {/* Task Info */}
              <h3 className="text-3xl font-bold text-bgray-900 dark:text-white mb-5">
                Files
              </h3>
              <div className="flex flex-wrap md:gap-x-10 gap-x-3 lg:gap-x-0 gap-y-5">
                {taskFiles?.map((file, key) => {
                  return (
                    <Files
                      key={file.id}
                      name={file.file_name}
                      size=""
                      link={file.file}
                      
                      id={file.id}
                    >
                      <svg
                        width="67"
                        height="86"
                        viewBox="0 0 67 86"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.4032 0H46.9892L67 19.8123V80.625C67 83.5946 64.5796 86 61.5968 86H5.4032C2.42052 86 0 83.5946 0 80.625V5.37496C0 2.40536 2.4208 0 5.4032 0Z"
                          fill="white"
                        />
                        <path
                          d="M5.4032 0.5H46.7835L66.5 20.0208V80.625C66.5 83.3158 64.306 85.5 61.5968 85.5H5.4032C2.69405 85.5 0.5 83.3158 0.5 80.625V5.37496C0.5 2.68413 2.6943 0.5 5.4032 0.5Z"
                          stroke="#E8E9EB"
                        />
                        <path
                          d="M65.9198 20.4252H51.2864C48.6265 20.4252 46.468 18.2802 46.468 15.6368V1.0752"
                          stroke="#E8E9EB"
                        />
                        <path
                          d="M17.2903 31.0996C17.2903 30.5473 17.738 30.0996 18.2903 30.0996H48.7098C49.262 30.0996 49.7098 30.5473 49.7098 31.0996V63.4996C49.7098 64.0519 49.262 64.4996 48.7098 64.4996H18.2903C17.738 64.4996 17.2903 64.0519 17.2903 63.4996V31.0996Z"
                          fill="#304FFD"
                        />
                        <path
                          d="M40.6533 41.7275C40.7643 41.4409 40.9309 41.2259 41.153 41.0825C41.3874 40.9272 41.6465 40.8496 41.9303 40.8496C42.2881 40.8496 42.5904 40.9571 42.8372 41.1721C43.0963 41.3871 43.2259 41.6797 43.2259 42.05C43.2259 42.2292 43.1888 42.4263 43.1148 42.6413L39.2652 52.8359C39.1541 53.1225 38.9567 53.3495 38.6729 53.5167C38.4015 53.672 38.0992 53.7496 37.7661 53.7496C37.4329 53.7496 37.1306 53.672 36.8592 53.5167C36.5877 53.3495 36.3965 53.1225 36.2854 52.8359L33.5278 45.2929L30.6961 52.8359C30.585 53.1225 30.3938 53.3495 30.1223 53.5167C29.8509 53.672 29.5486 53.7496 29.2155 53.7496C28.8947 53.7496 28.5924 53.672 28.3086 53.5167C28.0371 53.3495 27.8459 53.1225 27.7348 52.8359L23.8852 42.6413C23.8112 42.4382 23.7742 42.2471 23.7742 42.0679C23.7742 41.6977 23.9099 41.405 24.1813 41.19C24.4528 40.9631 24.7736 40.8496 25.1437 40.8496C25.4399 40.8496 25.7051 40.9272 25.9396 41.0825C26.1864 41.2259 26.3653 41.4409 26.4763 41.7275L29.3265 49.6646L32.2878 41.7634C32.3988 41.4767 32.5715 41.2557 32.806 41.1004C33.0527 40.9452 33.3119 40.8675 33.5833 40.8675C33.8671 40.8675 34.1262 40.9452 34.3606 41.1004C34.5951 41.2557 34.7678 41.4827 34.8788 41.7813L37.7105 49.8079L40.6533 41.7275Z"
                          fill="white"
                        />
                      </svg>
                    </Files>
                  )
                })}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default TaskView
