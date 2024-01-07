import { jwtDecode } from 'jwt-decode'

const getUserId = () => {
  let decodedToken = localStorage.getItem('authTokens')
    ? jwtDecode(localStorage.getItem('authTokens'))
    : null
  return decodedToken.user_id
}
const getFormatedChatUser = (chatUsers, onlineUserList) => {
  const userId = getUserId()
  return chatUsers.reduce((acumulator, item) => {
    if (item.type === 'DM' || item.type === 'SELF') {
      let newResult = {}
      newResult['roomId'] = item.roomId
      let member = null
      for (let user of item.member) {
        if (user.id !== userId || item.type === 'SELF') {
          member = user
        }
      }
      if (member) {
        newResult['name'] = member.first_name + ' ' + member.last_name
        newResult['image'] = member.profile_pic
        newResult['id'] = member.id
        newResult['isOnline'] = onlineUserList?.includes(member.id)
      }
      acumulator.push(newResult)
      return acumulator
    }
    return acumulator
  }, [])
}

const CommonUtil = {
  getUserId: getUserId,
  getFormatedChatUser: getFormatedChatUser,
}

export default CommonUtil
