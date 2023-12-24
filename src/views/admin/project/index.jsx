import ProtoTypes from 'prop-types'
import ProjectTab from '../../../components/listTab/ProjectTab'
import { useState, useContext, useEffect } from 'react'
import AuthContext from '../../../context/AuthContext'
import ProjectFilter from '../../../components/form/ProjectFilter'
import { getProjecttList } from '../../../services/Api'
import {
  DefaultNotify,
  sucessNotify,
  handleToast,
  errorNotify,
} from '../../../utils/toastUtils'

function Project() {
  var filters = {}
  const { authTokens, logoutUser, user } = useContext(AuthContext)
  const [projects, setProjects] = useState()
  const [Client,setClient] = useState()
  const [Status, setStatus] = useState()
  const [Search, setSearch] = useState()
  const [queryParams, setqueryParams] = useState([])

  
  const handleSearchChange = (event) => {
    console.log('seach start')
    setSearch(event.target.value)
    filters = {
      search: event.target.value,
      status: Status,
      client: Client,
    }
    setqueryParams(filters)
  }
  const handleStatusChange = (event) => {
    console.log('status start')
    setStatus(event.target.value)
    filters = {
      search: Search,
      status: event.target.value,
      client: Client,
    }
    setqueryParams(filters)
  }
  const handleClientChange = (event) => {
    console.log('client start')
    setClient(event.target.value)
    filters = {
      search: Search,
      status: Status,
      client: event.target.value,
    }
    setqueryParams(filters)
  }
  const RestFilter = ()=>{
    setClient()
    setSearch()
    setStatus()
    filters = {
      search: '',
      status: '',
      client: '',
    }
    setqueryParams(filters)
  }
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const projectData = await getProjecttList(queryParams)
        setProjects(projectData)
      } catch (error) {
        errorNotify(error)
      }
    }
    fetchAllProjects()
  }, [queryParams])

  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <ProjectFilter
            onHandleStatusChange={handleStatusChange}
            onhandleClientChange={handleClientChange}
            onHandleReset={RestFilter}
          />
          <ProjectTab
            data={projects}
            pageSize={9}
            user={user}
            onhandleSearchChange={handleSearchChange}
          />
        </section>
      </div>
    </main>
  )
}
Project.propTypes = {
  pageSize: ProtoTypes.number,
}
export default Project
