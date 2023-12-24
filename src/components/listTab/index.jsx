import ProtoTypes from 'prop-types'
import Pagination from '../pagination'
import Filter from '../form/Filter'
import FilterFull from '../form/FilterFull'
import Search from '../form/Search'
import UserTab from './UserTab'
import TabHeader from "./TabHeader"

function ListTab({ clients, pageSize, onhandleSearchChange }) {
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] ">
      <TabHeader />
      <div className="flex flex-col space-y-5">
        <div className="flex h-[56px] w-full space-x-4">
          <Search onhandleSearchChange={onhandleSearchChange} />
          {/* <Filter options={['Active', 'Inactive']} /> */}
        </div>
        {/* <FilterFull /> */}

        <UserTab clients={clients} pageSize={pageSize} />
        <Pagination />
      </div>
    </div>
  )
}

ListTab.propTypes = {
  pageSize: ProtoTypes.number,
}

export default ListTab
