import ProtoTypes from 'prop-types'
import ListTab from '../../../components/listTab/'
import { useState,useContext,useEffect } from 'react'
import AuthContext from '../../../context/AuthContext'
import { getClientList } from '../../../services/Api'
import { errorNotify } from '../../../utils/toastUtils'
import { ClienttUrl } from '../../../services/apiUrls'

function Clients() {
  var filters = {}
  const { authTokens,logoutUser } = useContext(AuthContext)
  const [clients,setClients] = useState()
  const [Search, setSearch] = useState()
  const [queryParams, setqueryParams] = useState([])
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const [Page, SetPage] = useState()
  // const [currentPage, setCurrentPage] = useState(1)
  // const [totalPages, setTotalPages] = useState(1)

  const fetchAllClients = async (url) => {
    try {
      const clientData = await getClientList(queryParams,url)
      setClients(clientData)
      setNextPage(clientData.next)
      setPrevPage(clientData.previous)
    } catch (error) {
      errorNotify(error)
    }
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    filters = {
      search: event.target.value,
    }
    setqueryParams(filters)
  }
  
  useEffect(() => {
    
    fetchAllClients()
  }, [queryParams])
  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <ListTab
            clients={clients}
            pageSize={9}
            onhandleSearchChange={handleSearchChange}
          />
        </section>
      </div>
    </main>
  )
}
ListTab.propTypes = {
  pageSize: ProtoTypes.number,
}
export default Clients
