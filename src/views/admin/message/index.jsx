import { useState, useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import ChatBoxLeftBar from '../../../components/massage/ChatBoxLeftBar'
import AllMessageRes from '../../../components/massage/AllMessageRes'
import Conversions from '../../../components/massage/Conversions'
import AuthContext from '../../../context/AuthContext'

import {
  sucessNotify,
  errorNotify,
  DefaultNotify,
} from '../../../utils/toastUtils'
import CommonUtil from '../../../utils/commonUtil'

//Contect Websocket

function Inbox({ children }) {
  const { user } = useContext(AuthContext)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState({})
  const [typing, setTyping] = useState(false)
  const [socket, setSocket] = useState(null)
  const [currentChattingMember, setCurrentChattingMember] = useState({})


  return (
    <main className="pt-[108px]">
      {/* write your code here */}
      <section className="lg:grid grid-cols-12 relative">
        {/* Left Column  */}
        <ChatBoxLeftBar setCurrentChattingMember={setCurrentChattingMember} />
        <AllMessageRes />

        {/* Middle Column */}
        {/* <Conversions /> */}
        <Outlet />
        {children}
        {/* Right Column  */}
      </section>
    </main>
  )
}

export default Inbox
