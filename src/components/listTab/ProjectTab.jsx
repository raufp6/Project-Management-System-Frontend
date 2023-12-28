import ProtoTypes from 'prop-types'
import Pagination from '../pagination'
import Filter from '../form/Filter'
import FilterFull from '../form/FilterFull'
import Search from '../form/Search'
import ProjectListTab from './ProjectListTab'
import TabHeader from './TabHeader'
import UserFilter from '../form/ProjectFilter'
import { isAdmin } from '../../utils/Permission'

function ProjectTab({
  data,
  pageSize,
  user,
  onhandleSearchChange,
  onPagination,
  nextpage,
  prevpage,
}) {
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px]">
      {isAdmin(user.groups[0]) && <TabHeader />}
      <div className="flex flex-col space-y-5">
        <div className="flex h-[56px] w-full space-x-4">
          <Search onhandleSearchChange={onhandleSearchChange} />
          {/* <Filter options={['Active', 'Inactive']} /> */}
        </div>
        {/* <FilterFull /> */}

        <ProjectListTab data={data} pageSize={pageSize} />
        <Pagination
          onPagination={onPagination}
          nextpage={nextpage}
          prevpage={prevpage}
        />
      </div>
    </div>
  )
}

ProjectTab.propTypes = {
  pageSize: ProtoTypes.number,
}

export default ProjectTab
