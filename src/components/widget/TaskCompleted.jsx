import React from 'react'
import totalEarn from '../../assets/images/icons/total-earn.svg'
function TaskCompleted({ title, count }) {
  return (
    <div className="rounded-lg bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center space-x-[7px]">
          <div className="icon">
            <span>
              <img src={totalEarn} alt="icon" />
            </span>
          </div>
          <span className="text-lg font-semibold text-bgray-900">{title}</span>
        </div>
        <div>
          <img src={totalEarn} alt="members" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex-1">
          <p className="text-3xl font-bold leading-[48px] text-bgray-900">
            {count}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TaskCompleted