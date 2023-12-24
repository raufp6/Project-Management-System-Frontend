import { useState, useEffect } from 'react'
import { getClientList,getProjecttList } from '../../services/Api'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../utils/toastUtils'

function TaskFilter({
  onHandleStatusChange,
  onHandleReset,
  onhandleProjectChange,
  OnhandlePriorityChange,
}) {
  const [activeFilter, setActiveFilter] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [clients, setClients] = useState([])
  const [projects, setProjects] = useState([])

  const handleActiveFilter = (e) => {
    setActiveFilter(e.target.innerText)
  }
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const projecttData = await getProjecttList()
        console.log(projecttData.results)
        setProjects(projecttData.results)
      } catch (error) {
        errorNotify(error)
      }
    }
    fetchAllProjects()
  }, [])

  return (
    <div className="bg-white grid grid-cols-3 rounded-lg p-4 mb-8 items-center gap-1 justify-evenly">
      <div className="">
        <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Project
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="project"
            onChange={(e) => {
              onhandleProjectChange(e)
            }}
          >
            <option value="">All</option>
            {projects.map((project, index) => {
              return <option value={project.id}>{project.name}</option>
            })}
          </select>
        </div>
      </div>
      <div className="">
        <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Status
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="status"
            onChange={(e) => {
              onHandleStatusChange(e)
            }}
          >
            <option value="">All</option>
            <option value="incomplete">In Complete</option>
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="">
        <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Priority
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="piority"
            onChange={(e) => {
              OnhandlePriorityChange(e)
            }}
          >
            <option value="">All</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="pl-10 md:block hidden">
        <button
          aria-label="none"
          className="py-3 px-10 bg-bgray-600 rounded-lg text-white font-medium text-sm"
          onClick={() => {
            onHandleReset()
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default TaskFilter
