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
import CommonUtil from '../../utils/commonUtil'
import moment from 'moment'

const userid = CommonUtil.getUserId()
// let socket = new WebSocket(
//   process.env.REACT_APP_WS_SERVER_URL + 'chat/' + userid + '/chat/'
// )

export default function Conversions({
  currentChattingMember,
  setOnlineUserList,
}) {
  const { user } = useContext(AuthContext)
  const [isOpen, toggleSetting] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState({})
  const [typing, setTyping] = useState(false)
  const [socket, setSocket] = useState(null)
  const { chatId } = useParams()

  // socket.onopen = () => console.log('WebSocket connected')
  const fetchChatMessage = async () => {
    const url = ChatMessageUrl.replace('<chatId>', chatId)
    const ChatMessageData = await getChatMessageData({}, url)
    setMessages(ChatMessageData)
  }

  useEffect(() => {
    const socket_new = new WebSocket(
      'wss://visitkeralaonline.com/ws/' + 'chat/' + user.user_id + '/chat/'
    )
    socket_new.onopen = () => console.log('WebSocket connected')
    setSocket(socket_new)

    socket_new.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const userId = user.user_id
      if (chatId === data.roomId) {
        if (data.action === SocketActions.MESSAGE) {
          data['userImage'] = data.profile_pic
          setMessages((prevState) => {
            let messagesState = JSON.parse(JSON.stringify(prevState))
            messagesState.results.push(data)
            return messagesState
          })
          setTyping(false)
        } else if (
          data.action === SocketActions.TYPING &&
          data.user !== userId
        ) {
          setTyping(data.typing)
        }
      }
      if (data.action === SocketActions.ONLINE_USER) {
        // setOnlineUserList(data.userList)
      }
    }
  }, [])

  // useEffect(() => {
  //   if (!socket) {
  //     const socket = new WebSocket(
  //       process.env.REACT_APP_WS_SERVER_URL + 'chat/' + user.user_id + '/chat/'
  //     )

  //     socket.onopen = () => console.log('WebSocket connected')
  //     socket.onclose = () => console.log('WebSocket disconnected')
  //     socket.onmessage = (event) => {
  //       const data = JSON.parse(event.data)
  //       console.log(event)

  //       // setMessages((messages) => [...messages, data.message])
  //     }

  //     setSocket(socket)
  //   }

  //   return () => {
  //     if (socket) {
  //       socket.close()
  //     }
  //   }
  // }, [socket])

  useEffect(() => {
    fetchChatMessage()
  }, [chatId])

  const getChatMessageClassName = (userId) => {
    return user.user_id === userId ? false : true
  }
  // socket.onmessage = (event) => {
  //   const data = JSON.parse(event.data)
  //   console.log(event)

  //   // setMessages((messages) => [...messages, data.message])
  // }

  const messageSubmitHandler = () => {
    console.log('send message start')
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
  const removeHTMLTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent || ''
  }

  return (
    <>
      <div className="2xl:col-span-9 xl:col-span-8 dark:bg-darkblack-500 lg:col-span-7 col-span-12 relative">
        <ConversionsHeader
          toggleSetting={() => toggleSetting(!isOpen)}
          currentChattingMember={currentChattingMember}
        />
        <div className="lg:pt-20 dark:bg-darkblack-500 lg:px-11 p-5 mb-5 lg:mb-0 space-y-10">
          {messages?.results?.map((message, index) => (
            <Conversion
              key={index}
              img={uSm}
              text={removeHTMLTags(message.message)}
              time={moment(message.timestamp).format('hh:mm')}
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

// export default Conversions
