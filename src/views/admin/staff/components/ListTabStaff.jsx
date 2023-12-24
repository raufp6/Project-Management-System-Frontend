import ProtoTypes from 'prop-types'
import Pagination from '../../../../components/pagination'
import Filter from '../../../../components/form/Filter'
import FilterFull from '../../../../components/form/Search'
import Search from '../../../../components/form/Search'
import StaffTab from './StaffTab'
import TabHeader from '../../../../components/listTab/TabHeader'

function ListTab({ data, pageSize, onhandleSearchChange }) {
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] ">
      <TabHeader />
      <div className="flex flex-col space-y-5">
        <div className="flex h-[56px] w-full space-x-4">
          <Search onhandleSearchChange={onhandleSearchChange} />
          {/* <Filter options={['Active', 'Inactive']} /> */}
        </div>
        {/* <FilterFull /> */}

        <StaffTab data={data} pageSize={pageSize} />
        <Pagination />
      </div>
    </div>
  )
}

ListTab.propTypes = {
  pageSize: ProtoTypes.number,
}

export default ListTab
