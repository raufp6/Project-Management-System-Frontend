import ProtoTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
function PinnedMassage({ member }) {
  const [isOnline,setOnline] = useState(true)

  return (
    <li className="p-3.5 flex justify-between hover:bg-bgray-100 hover:dark:bg-darkblack-500 hover:rounded-lg transition-all cursor-pointer">
      <div className="flex space-x-3 grow">
        <div className="w-14 h-14 relative">
          <img src={member?.image} alt="" />
          <span
            className={`${
              isOnline ? 'bg-success-300' : 'bg-gray-300'
            } dark:border-bgray-900 border-2 border-white block w-[14px] h-[14px] rounded-full absolute bottom-1 right-0`}
          ></span>
        </div>
        <div>
          <h4 className="text-xl font-bold text-bgray-900 dark:text-white">
            {member?.name}
          </h4>
          
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-lg font-semibold text-bgray-700 dark:text-bgray-50">
          10:00
        </span>
        
      </div>
    </li>
  )
}

PinnedMassage.propTypes = {
  pinnedMassage: ProtoTypes.object,
}

export default PinnedMassage
