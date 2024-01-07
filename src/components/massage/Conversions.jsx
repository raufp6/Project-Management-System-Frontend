import { useState, useContext, useEffect } from 'react'

import uSm from '../../assets/images/message/u-sm.png'
import uSm1 from '../../assets/images/message/u-sm-1.png'

import ConversionsHeader from './ConversionsHeader'
import Conversion from './Conversion'
import Typing from './Typing'
import SendMassage from '../form/SendMassage'
import Profile from './Profile'
import AuthContext from '../../context/AuthContext'
import { getChatMessageData } from '../../services/Api'
import { ChatMessageUrl } from '../../services/apiUrls'
import { useParams } from 'react-router-dom'
import SocketActions from '../../lib/socketActions'

function Conversions() {
  const { user } = useContext(AuthContext)
  const [isOpen, toggleSetting] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState({})
  const [typing, setTyping] = useState(false)
  const [socket, setSocket] = useState(null)
  const { chatId } = useParams()

  const fetchChatMessage = async () => {
    const url = ChatMessageUrl.replace('<chatId>', chatId)
    const ChatMessageData = await getChatMessageData({}, url)
    setMessages(ChatMessageData)
  }

  useEffect(() => {
    if (!socket) {
      const socket = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${user.user_id}/chat/`
      )

      socket.onopen = () => console.log('WebSocket connected')
      socket.onclose = () => console.log('WebSocket disconnected')
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)

        // setMessages((messages) => [...messages, data.message])
      }

      setSocket(socket)
    }

    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [socket])

  useEffect(() => {
    fetchChatMessage()
  }, [chatId])

  const getChatMessageClassName = (userId) => {
    return user.user_id === userId ? true : false
  }

  const messageSubmitHandler = () => {
    console.log("send message start");
    if (inputMessage) {
      console.log('send messag inner')
      socket.send(
        JSON.stringify({
          action: SocketActions.MESSAGE,
          message: inputMessage,
          user: user.user_id,
          roomId: chatId,
        })
      )
    }
    setInputMessage('')
    console.log('send messag done')
  }

  return (
    <>
      <div className="2xl:col-span-9 xl:col-span-8 dark:bg-darkblack-500 lg:col-span-7 col-span-12 relative">
        <ConversionsHeader toggleSetting={() => toggleSetting(!isOpen)} />
        <div className="lg:pt-20 dark:bg-darkblack-500 lg:px-11 p-5 mb-5 lg:mb-0 space-y-10">
          {messages?.results?.map((message, index) => (
            <Conversion
              key={index}
              img={uSm}
              text={message.message}
              time="09:30 AM"
              self={getChatMessageClassName(message.user)}
            />
          ))}

          {/* <Conversion
            img={uSm1}
            text="Hi, how can I help you with?"
            time="10:00 pM"
            self={true}
          />
          <Conversion
            img={uSm}
            text=" HIs this possible to refund?"
            time="09:30 AM"
          />
          <Conversion
            img={uSm1}
            text=" Of course, it is available in 38 and several other sizes which are very complete"
            time="10:00 pM"
            self={true}
          /> */}
          {/* <Typing /> */}
        </div>
        <SendMassage
          onmessageSubmitHandler={messageSubmitHandler}
          onsetInputMessage={setInputMessage}
          inputMessage={inputMessage}
        />
      </div>
      <Profile isOpen={isOpen} close={() => toggleSetting(!isOpen)} />
    </>
  )
}

export default Conversions
