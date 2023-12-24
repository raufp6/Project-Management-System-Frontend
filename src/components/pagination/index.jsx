import PaginationV1 from './PaginationV1'
import PaginationV2 from './PaginationV2'

function Pagination({ onPagination, nextpage, prevpage, totalpage }) {
  return (
    <div className="pagination-content w-full">
      <div className="flex w-full items-center justify-center lg:justify-between">
        {/* <PaginationV1 /> */}
        <PaginationV2
          onPagination={onPagination}
          nextpage={nextpage}
          prevpage={prevpage}
          totalpage={totalpage}
        />
      </div>
    </div>
  )
}

export default Pagination
