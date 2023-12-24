import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import TaskViewHeader from './components/TaskViewHeader'
import TaskInfo from './components/TaskInfo'
import TaskInfoRight from './components/TaskInfoRight'
import AuthContext from '../../../context/AuthContext'
import { isAdmin,isClient,isDeveloper } from '../../../utils/Permission'

function TaskView() {
  const { authTokens, logoutUser,user } = useContext(AuthContext)
  const { id } = useParams()
  const [task, setTask] = useState({})
  
  //get project details
  const getTask = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/task/${id}`, {
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
  useEffect(() => {
    getTask()
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
      </div>
    </main>
  )
}

export default TaskView
