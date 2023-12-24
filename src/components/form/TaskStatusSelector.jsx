import { useState,useEffect } from 'react'

function TaskStatusSelector({ status_list, status, onsetStatus }) {
  const [filterShow, setFilterShow] = useState(false)
  const [currentStatus, setStatus] = useState(status)
  const handleClick = (val) => {
    setStatus(val)
    setFilterShow(!filterShow)
    onsetStatus(val)
  }
  useEffect(() => {
    setStatus(status)
  }, [status])
  return (
    <div className="date-filter relative">
      <button
        aria-label="none"
        onClick={() => setFilterShow(!filterShow)}
        type="button"
        className="p-3.5 border border-bgray-300 dark:border-darkblack-400 flex space-x-1 items-center rounded-lg overflow-hidden"
      >
        <div
          className={`w-3 h-3 ${status_list[currentStatus]?.color} rounded-full`}
        ></div>
        <span className="text-sm font-medium text-bgray-900 dark:text-white">
          {status_list[currentStatus]?.title}
        </span>
        <span>
          <svg
            className="stroke-bgray-900 dark:stroke-white"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6.5L8 10.5L12 6.5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        id="location-filter"
        className={`rounded-lg w-[150px] shadow-lg bg-white dark:bg-darkblack-500 absolute right-0 z-10 top-ful  overflow-hidden ${
          filterShow ? 'block' : 'hidden'
        }`}
      >
        <ul>
          <li
            onClick={() => handleClick('incomplete')}
            className={`text-sm text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold ${
              currentStatus == 'incomplete' ? 'hidden' : 'block'
            } `}
          >
            In Complete
          </li>
          <li
            onClick={() => handleClick('todo')}
            className={`text-sm text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold ${
              currentStatus == 'todo' ? 'hidden' : 'block'
            } `}
          >
            To Do
          </li>
          <li
            onClick={() => handleClick('doing')}
            className={`text-sm text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold ${
              currentStatus == 'doing' ? 'hidden' : 'block'
            } `}
          >
            Doing
          </li>
          <li
            onClick={() => handleClick('completed')}
            className={`text-sm text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold ${
              currentStatus == 'completed' ? 'hidden' : 'block'
            } `}
          >
            Completed
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TaskStatusSelector
