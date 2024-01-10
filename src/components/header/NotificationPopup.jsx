import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import ProtoTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { getNotifications } from '../../services/Api'
import moment from 'moment'
import {
  DefaultNotify,
  sucessNotify,
  handleToast,
  errorNotify,
} from '../../utils/toastUtils'

const notifications_area = (notifications)=>{
  {
    return notifications.map((prop, key) => (
        
          <li key={key} className="border-b border-bgray-200 py-4 pl-6 pr-[50px] hover:bg-bgray-100  ">
          <Link to="#">
            <div className="noti-item">
              <p className="mb-1 text-sm font-medium text-bgray-600 ">
                <strong className="text-bgray-900 ">
                  {prop.verb} from {prop?.actor_data['username']}
                </strong>
              </p>
              <span className="text-xs font-medium text-bgray-500">
                {moment(prop.timestamp).fromNow()}
              </span>
            </div>
          </Link>
          </li>
        
      ))
  }
}

function NotificationPopup({ active, notifications_data }) {
  const { user } = useContext(AuthContext)
  const [notifications,setNotifications] = useState([])
  const [queryParams, setqueryParams] = useState([])
  

  useEffect(() => {
    // try{
    //   //Connect Socket
    //   const socket = new WebSocket(
    //     `ws://127.0.0.1:8000/ws/notifications/${user.user_id}/`
    //   )
    //   // const socket = new WebSocket('ws://127.0.0.1:8000/ws/notifications/1/')
    //   socket.onopen = () => {
    //     console.log('WebSocket connected to notifications channel')
    //   }
    //   socket.onmessage = (event) => {
    //     const newNotification = JSON.parse(event.data)
    //     console.log('notification')
    //     console.log(newNotification.data)
    //     setNotifications((notifications) => [
    //       ...notifications,
    //       newNotification.data,
    //     ])
    //     DefaultNotify(
    //       `Assigned new task from ${newNotification.data.actor_data['username']}`
    //     )
    //   }
    //   socket.onclose = () => {
    //     console.log('WebSocket disconnected from notifications channel')
    //   }
    // }catch(error){
    //   console.log("Notification socket could not connect");
    // }
    


    const fetchAllNotifications = async () => {
      try {
        const NotificationtData = await getNotifications(queryParams)
        setNotifications(NotificationtData)
      } catch (error) {
        errorNotify(error)
      }
    }
    fetchAllNotifications()
  }, [queryParams])
  
  //console.log(notifications)
  return (
    <div className="notification-popup-wrapper text-left overflow-y-hidden">
      <div
        id="notification-box"
        style={{
          filter: `drop-shadow(12px 12px 40px rgba(0, 0, 0, 0.08))`,
        }}
        className={`absolute right-[0px] top-[81px]  w-[400px] transition-all origin-top  rounded-lg bg-white  overflow-y-hidden ${
          active ? ' block introAnimation' : 'hidden'
        } `}
      >
        <div className="relative w-full pb-[75px] pt-[66px] overflow-y-hidden">
          <div className="absolute left-0 top-0 flex h-[66px] w-full items-center justify-between px-8">
            <h3 className="text-xl font-bold text-bgray-900 ">Notifications</h3>
            
          </div>
          <ul className="scroll-style-1 h-[335px] w-full overflow-y-scroll">
            {notifications_area(notifications)}
          </ul>
          <div className="absolute bottom-0 left-0 flex h-[75px] w-full items-center justify-between px-8">
            <div>
              <Link to="#">
                <div className="flex items-center space-x-2">
                  <span>
                    <svg
                      width="22"
                      height="12"
                      viewBox="0 0 22 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 6L11 11L21 1M1 6L6 11M11 6L16 1"
                        stroke="#0CAF60"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-success-300">
                    Mark all as read
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
NotificationPopup.propTypes = {
  active: ProtoTypes.bool,
  handlePopup: ProtoTypes.func,
}
export default NotificationPopup
