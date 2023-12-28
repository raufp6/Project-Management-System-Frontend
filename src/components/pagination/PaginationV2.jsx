function PaginationV2({ onPagination, nextpage, prevpage, totalpage }) {
  console.log(nextpage)
  return (
    <div className="flex items-center space-x-5 sm:space-x-[35px]">
      <button
        className="rounded-lg bg-success-50 px-4 py-1.5 text-xs font-bold text-bgray-500 dark:bg-darkblack-500 dark:text-bgray-50 lg:px-6 lg:py-2.5 lg:text-sm"
        aria-label="none"
        type="button"
        onClick={() => {
          onPagination(prevpage)
        }}
        disabled={prevpage === null}
      >
        <span>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7217 5.03271L7.72168 10.0327L12.7217 15.0327"
              stroke="#A0AEC0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div className="flex items-center">
        {/* {Array.from({ length: Math.ceil(totalpage / 10) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => onPagination(index + 1)}
            aria-label="none"
            type="button"
            className="rounded-lg bg-success-50 px-4 py-1.5 text-xs font-bold text-bgray-500 dark:bg-darkblack-500 dark:text-bgray-50 lg:px-6 lg:py-2.5 lg:text-sm"
          >
            {index + 1}
          </button>
        ))} */}
        {/* <button
          aria-label="none"
          type="button"
          className="rounded-lg px-4 py-1.5 text-xs font-bold text-bgray-500 transition duration-300 ease-in-out hover:bg-success-50 hover:text-success-300 dark:hover:bg-darkblack-500 lg:px-6 lg:py-2.5 lg:text-sm"
        >
          2
        </button>

        <span className="text-sm text-bgray-500">. . . .</span>
        <button
          aria-label="none"
          type="button"
          className="rounded-lg px-4 py-1.5 text-xs font-bold text-bgray-500 transition duration-300 ease-in-out hover:bg-success-50 hover:text-success-300 dark:hover:bg-darkblack-500 lg:px-6 lg:py-2.5 lg:text-sm"
        >
          20
        </button> */}
      </div>
      <button
        className="rounded-lg bg-success-50 px-4 py-1.5 text-xs font-bold text-bgray-500 dark:bg-darkblack-500 dark:text-bgray-50 lg:px-6 lg:py-2.5 lg:text-sm"
        aria-label="none"
        type="button"
        onClick={() => {
          onPagination(nextpage)
        }}
        disabled={nextpage === null}
      >
        <span>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.72168 5.03271L12.7217 10.0327L7.72168 15.0327"
              stroke="#A0AEC0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  )
}

export default PaginationV2
