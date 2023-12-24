import ProtoTypes from 'prop-types'
import Pagination from '../../../../components/pagination'
import Filter from '../../../../components/form/Filter'
import FilterFull from '../../../../components/form/Search'
import Search from '../../../../components/form/Search'
import TaskTab from './TaskTab'
import TabHeader from '../../../../components/listTab/TabHeader'
import { isAdmin } from '../../../../utils/Permission'

function ListTabTask({
  data,
  user,
  pageSize,
  onhandleSearchChange,
  onPagination,
  nextpage,
  prevpage,
  totalpage
}) {
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] ">
      {isAdmin(user.groups[0]) && <TabHeader />}
      <div className="flex flex-col space-y-5">
        <div className="flex h-[56px] w-full space-x-4">
          <Search onhandleSearchChange={onhandleSearchChange} />
          {/* <Filter options={['Active', 'Inactive']} /> */}
        </div>
        {/* <FilterFull /> */}

        <TaskTab data={data} pageSize={pageSize} />
        <Pagination
          onPagination={onPagination}
          nextpage={nextpage}
          prevpage={prevpage}
          totalpage={totalpage}
        />
      </div>
    </div>
  )
}

ListTabTask.propTypes = {
  pageSize: ProtoTypes.number,
}

export default ListTabTask
