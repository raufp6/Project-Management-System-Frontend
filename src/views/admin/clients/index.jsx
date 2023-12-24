import ProtoTypes from 'prop-types'
import ListTab from '../../../components/listTab/'
import { useState,useContext,useEffect } from 'react'
import AuthContext from '../../../context/AuthContext'
import { getClientList } from '../../../services/Api'
import { errorNotify } from '../../../utils/toastUtils'

function Clients() {
  var filters = {}
  const { authTokens,logoutUser } = useContext(AuthContext)
  const [clients,setClients] = useState()
  const [Search, setSearch] = useState()
  const [queryParams, setqueryParams] = useState([])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    filters = {
      search: event.target.value,
    }
    setqueryParams(filters)
  }
  
  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const clientData = await getClientList(queryParams)
        setClients(clientData)
      } catch (error) {
        errorNotify(error)
      }
    }
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
