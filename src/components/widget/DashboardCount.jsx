import React, { useState, useEffect, useContext } from 'react'
import totalEarn from '../../assets/images/icons/total-earn.svg'
import memberImg from '../../assets/images/avatar/members-2.png'
import TaskCompleted from './TaskCompleted'
import { isAdmin, isClient, isDeveloper } from '../../utils/Permission'
import { getPopjectCount, getUserCount, getTaskCount } from '../../services/Api'
import { errorNotify } from '../../utils/toastUtils'
import AuthContext from '../../context/AuthContext'

function DashboardCount() {
  const { user } = useContext(AuthContext)
  const [project_count, setProjectCount] = useState()
  const [user_count, setUSerCount] = useState()
  const [task_count, setTaskCount] = useState()
  const [completed_task_count, setCompletedTaskCount] = useState()
  const [totdo_task_count, setToDOTaskCount] = useState()
  const [doing_task_count, setDoingTaskCount] = useState()
  const [incomplete_task_count, setInCompleteTaskCount] = useState()
  useEffect(() => {
    const fetchProjectCount = async () => {
      try {
        const project_count = await getPopjectCount()
        setProjectCount(project_count)
      } catch (error) {
        errorNotify(error)
      }
    }
    const fetchUserCount = async () => {
      try {
        const count = await getUserCount()
        setUSerCount(count)
      } catch (error) {
        errorNotify(error)
      }
    }
    const fetchTaskCount = async () => {
      try {
        const count = await getTaskCount()
        setTaskCount(count)
      } catch (error) {
        errorNotify(error)
      }
    }
    const fetchCompletedTaskCount = async () => {
      try {
        const count = await getTaskCount({ status: 'completed' })
        setCompletedTaskCount(count)
      } catch (error) {
        errorNotify(error)
      }
    }
    const fetchToDoTaskCount = async () => {
      try {
        const count = await getTaskCount({ status: 'todo' })
        setToDOTaskCount(count)
      } catch (error) {
        errorNotify(error)
      }
    }
    const fetchDoingTaskCount = async () => {
      try {
        const count = await getTaskCount({ status: 'doing' })
        setDoingTaskCount(count)
      } catch (error) {
        errorNotify(error)
      }
    }
    const fetchInCompleteTaskCount = async () => {
      try {
        const count = await getTaskCount({ status: 'doing' })
        setInCompleteTaskCount(count)
      } catch (error) {
        errorNotify(error)
      }
    }
    fetchProjectCount()
    fetchUserCount()
    fetchTaskCount()
    fetchCompletedTaskCount()
    fetchToDoTaskCount()
    fetchDoingTaskCount()
    fetchInCompleteTaskCount()
  }, [])
  console.log(project_count)
  return (
    <div className="mb-[24px] w-full">
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
        <TaskCompleted title="Total Project" count={project_count?.count} />
        {isAdmin(user.groups[0]) && (
          <TaskCompleted title="Total Staff" count={user_count?.count} />
        )}
        <TaskCompleted title="Total Task" count={task_count?.count} />
        <TaskCompleted
          title="Completed Task"
          count={completed_task_count?.count}
        />
        <TaskCompleted title="To Do Task" count={totdo_task_count?.count} />
        <TaskCompleted title="Doing Task" count={doing_task_count?.count} />
        <TaskCompleted
          title="Incomplete Task"
          count={incomplete_task_count?.count}
        />
      </div>
    </div>
  )
}

export default DashboardCount
