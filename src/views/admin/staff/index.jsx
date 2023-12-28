import ProtoTypes from 'prop-types'
import ListTabStaff from './components/ListTabStaff'
import { useState, useContext, useEffect } from 'react'
import AuthContext from '../../../context/AuthContext'
import { getStaffList } from '../../../services/Api'
import { errorNotify } from '../../../utils/toastUtils'
import { StafftUrl } from '../../../services/apiUrls'

function Staff() {
  var filters = {}
  const { authTokens, logoutUser } = useContext(AuthContext)
  const [users, setUsers] = useState()
  const [Search, setSearch] = useState()
  const [queryParams, setqueryParams] = useState([])
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const [Page, SetPage] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchAllStaffs = async (url) => {
    try {
      const staffData = await getStaffList(queryParams,url)
      setUsers(staffData.results)
      setNextPage(staffData.next)
      setPrevPage(staffData.previous)
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
  const handlePageChange = (page) => {
    console.log('pagination start')
    SetPage(page)
    
    fetchAllStaffs(page)
  }
  useEffect(() => {
    
    fetchAllStaffs()
  }, [queryParams])
  return (
    <main className="w-full px-6 pb-6 pt-[100px] sm:pt-[156px] xl:px-12 xl:pb-12">
      {/* write your code here */}
      <div className="2xl:flex 2xl:space-x-[48px]">
        <section className="mb-6 2xl:mb-0 2xl:flex-1">
          <ListTabStaff
            data={users}
            pageSize={9}
            onhandleSearchChange={handleSearchChange}
            onPagination={handlePageChange}
            nextpage={nextPage}
            prevpage={prevPage}
            totalpage={totalPages}
          />
        </section>
      </div>
    </main>
  )
}
Staff.propTypes = {
  pageSize: ProtoTypes.number,
}
export default Staff
