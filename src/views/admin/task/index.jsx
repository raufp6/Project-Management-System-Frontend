import ProtoTypes from 'prop-types'
import ListTabTask from './components/ListTabTask'
import { useState, useContext, useEffect,useMemo } from 'react'
import AuthContext from '../../../context/AuthContext'
import TaskFilter from '../../../components/form/TaskFilter'

import {
  errorNotify,
} from '../../../utils/toastUtils'
import {getTaskData} from '../../../services/Api'

function Task() {
  var filters = {}
  const { authTokens, logoutUser,user } = useContext(AuthContext)

  const [Project, setProject] = useState()
  const [Priority, setPriority] = useState()
  const [Status, setStatus] = useState()
  const [Search, setSearch] = useState()
  const [queryParams, setqueryParams] = useState([])
  
  const [tasks, setTask] = useState()
  
  const handleSearchChange = (event) => {
    console.log('seach start')
    setSearch(event.target.value)
    filters = {
      search: event.target.value,
      status: Status,
      project: Project,
      priority: Priority,
    }
    setqueryParams(filters)
  }
  const handleProjectChange = (event) => {
    console.log('filter project start')
    setProject(event.target.value)
    filters = {
      search: Search,
      status: Status,
      project: event.target.value,
      priority: Priority,
    }
    setqueryParams(filters)
  }
  const handlePriorityChange = (event) => {
    console.log('filter Priority start')
    setPriority(event.target.value)
    filters = {
      search: Search,
      status: Status,
      project: Project,
      priority: event.target.value,
    }
    setqueryParams(filters)
  }

  const handleStatusChange = (event) => {
    console.log('status start')
    setStatus(event.target.value)
    filters = {
      search: Search,
      status: event.target.value,
      project: Project,
      priority:Priority
    }
    setqueryParams(filters)
  }

  const RestFilter = () => {
    setProject()
    setSearch()
    setStatus()
    setPriority()
    filters = {
      search: '',
      status: '',
      project: '',
      priority:''
    }
    setqueryParams(filters)
  }
  
  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        const tasksData = await getTaskData(queryParams)
        setTask(tasksData)
      } catch (error) {
        errorNotify(error)
      }
    }
    fetchAllTask()
  }, [queryParams])


  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <TaskFilter
            onhandleProjectChange={handleProjectChange}
            onHandleReset={RestFilter}
            onHandleStatusChange={handleStatusChange}
            OnhandlePriorityChange={handlePriorityChange}
          />
          <ListTabTask
            data={tasks}
            user={user}
            pageSize={9}
            onhandleSearchChange={handleSearchChange}
          />
        </section>
      </div>
    </main>
  )
}
Task.propTypes = {
  pageSize: ProtoTypes.number,
}
export default Task
