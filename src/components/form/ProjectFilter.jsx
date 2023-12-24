import { useState,useEffect} from 'react'
import { getClientList } from '../../services/Api'
import {
  DefaultNotify,
  sucessNotify,
  errorNotify,
} from '../../utils/toastUtils'

function ProjectFilter({
  onHandleStatusChange,
  onhandleClientChange,
  onHandleReset,
}) {
  const [activeFilter, setActiveFilter] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [clients, setClients] = useState([])

  const handleActiveFilter = (e) => {
    setActiveFilter(e.target.innerText)
  }
  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const clientData = await getClientList()
        setClients(clientData)
      } catch (error) {
        errorNotify(error)
      }
    }
    fetchAllClients()
  }, [])

  return (
    <div className="bg-white grid grid-cols-3 rounded-lg p-4 mb-8 items-center gap-1 justify-evenly">
      <div className="">
        <div>
          <label
            htmlFor="ln"
            className="block text-basse  font-medium text-bgray-600 mb-2"
          >
            Client
          </label>

          <select
            className="bg-bgray-50  p-4 rounded-lg border-0 focus:border focus:border-success-300 focus:ring-0 w-full"
            name="client"
            onChange={(e) => {
              onhandleClientChange(e)
            }}
          >
            <option value="">All</option>
            {clients.map((client, index) => {
              return <option value={client.id}>{client.company_name}</option>
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
            <option value="notstarted">Not Started</option>
            <option value="inprogress">In Progress</option>
            <option value="onhold">On Hold</option>
            <option value="canceled">Canceled</option>
            <option value="finished">Finished</option>
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

export default ProjectFilter
