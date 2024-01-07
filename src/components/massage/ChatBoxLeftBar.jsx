import { useState, useContext, useEffect } from 'react'
import SidebarHeader from './SidebarHeader'
import PinnedMassages from './PinnedMassages'
import AllMessages from './AllMessages'
import AuthContext from '../../context/AuthContext'
import { getChatUserData, getUser } from '../../services/Api'
import { ChatUserUrl, UsertUrl } from '../../services/apiUrls'
import CommonUtil from '../../utils/commonUtil'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function ChatBoxLeftBar(props) {
  const { user } = useContext(AuthContext)
  const [chatUsers, setChatUsers] = useState([]) //sidebar users
  const [users, setUsers] = useState([]) //popup users
  const [onlineUserList, setOnlineUserList] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const { chatId } = useParams()

  const redirectUserToDefaultChatRoom = (chatUsers) => {
    if (location.pathname === '/admin/message') {
      props.setCurrentChattingMember(chatUsers[0])
      navigate('c/' + chatUsers[0].roomId)
    } else {
      const activeChatId = chatId
      const chatUser = chatUsers.find((user) => user.roomId === activeChatId)
      props.setCurrentChattingMember(chatUser)
    }
  }
  const fetchChatUsers = async () => {
    const url = ChatUserUrl.replace('<userId>', user.user_id)
    try {
      const chatUSersData = await getChatUserData({}, url)
      const formatedChatUser = CommonUtil.getFormatedChatUser(
        chatUSersData,
        onlineUserList
      )
      setChatUsers(formatedChatUser)
      redirectUserToDefaultChatRoom(formatedChatUser)
    } catch (error) {}
  }

  useEffect(() => {
    fetchChatUsers()
  }, [])

  const getConnectedUserIds = () => {
    let connectedUsers = ''
    for (let chatUser of chatUsers) {
      connectedUsers += chatUser.id + ','
    }
    return connectedUsers.slice(0, -1)
  }
  const fetchUsers = async () => {
    try {
      const UsersData = await getChatUserData(
        { exlude: getConnectedUserIds() },
        UsertUrl
      )
      setUsers(UsersData)
    } catch (error) {}
  }
  const getActiveChatClass = (roomId) => {
    let activeChatId = chatId
    return roomId === activeChatId ? 'active-chat' : ''
  }
  return (
    <aside className="h-full 2xl:col-span-3 xl:col-span-4 lg:col-span-5 bg-white dark:bg-darkblack-600 border border-bgray-200 dark:border-darkblack-400 pr-7 pl-12 pt-6 pb-10 hidden lg:block">
      <SidebarHeader />
      <div className="pt-6">
        {/* Pinned Message  */}
        <PinnedMassages
          chatUsers={chatUsers}
          setCurrentChattingMember={props.setCurrentChattingMember}
        />
        {/* All Message  */}

        <AllMessages />
      </div>
    </aside>
  )
}

export default ChatBoxLeftBar
