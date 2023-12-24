import { useContext } from 'react'
import profile from '../../assets/images/avatar/profile-52x52.png'
import ProtoTypes from 'prop-types'
import AuthContext from '../../context/AuthContext'

function Author({ showProfile }) {
  const {user} = useContext(AuthContext)
  console.log(user);
  return (
    <div
      onClick={() => showProfile('profile')}
      className="flex cursor-pointer space-x-0 lg:space-x-3 z-30"
    >
      <div className="h-[52px] w-[52px] overflow-hidden rounded-xl border border-bgray-300">
        <img className="object-cover" src={profile} alt="avater" />
      </div>
      <div className="hidden 2xl:block">
        <div className="flex items-center space-x-2.5">
          <h3 className="text-base font-bold leading-[28px] text-bgray-900 ">
            {user.username}
          </h3>
          <span>
            <svg
              className="stroke-bgray-900 "
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 10L12 14L17 10"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <p className="text-sm font-medium leading-[20px] text-bgray-600">
          {user.groups[0]}
        </p>
      </div>
    </div>
  )
}

Author.propTypes = {
  showProfile: ProtoTypes.func,
}

export default Author
