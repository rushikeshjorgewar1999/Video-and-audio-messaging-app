import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBAL_TYPES } from './redux/types/globalTypes'
import { MESSAGE_TYPES } from './redux/types/messageTypes'
import { CONVERSATION_TYPES } from './redux/types/conversationTypes'

const SocketClient = () => {
  const dispatch = useDispatch()
  const { auth, socket, status } = useSelector(state => state)

  useEffect(() => {
    socket.emit('joinUser', auth.user)
  }, [socket, auth.user])

  useEffect(() => {
    socket.on('createMessageToClient', data => {
      const addConversationData = {
        senderId: data.sender._id,
        senderName: data.sender.name,
        senderAvatar: data.sender.avatar,
        recipientId: data.recipient._id,
        recipientName: data.recipient.name,
        recipientAvatar: data.recipient.avatar,
        media: data.media,
        createdAt: data.createdAt,
        text: data.text
      }

      dispatch({
        type: CONVERSATION_TYPES.ADD_CONVERSATION,
        payload: addConversationData
      })

      dispatch({
        type: MESSAGE_TYPES.CREATE_MESSAGE,
        payload: data
      })

      dispatch({
        type: CONVERSATION_TYPES.UPDATE_CONVERSATION,
        payload: data
      })
    })

    return () => socket.off('createMessageToClient')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('typingToClient', data => {
      dispatch({
        type: GLOBAL_TYPES.TYPE,
        payload: data
      })
    })

    return () => socket.off('typingToClient')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('doneTypingToClient', data => {
      dispatch({
        type: GLOBAL_TYPES.TYPE,
        payload: {}
      })
    })

    return () => socket.off('doneTypingToClient')
  }, [dispatch, socket])
  
  useEffect(() => {
    socket.emit('checkUserOnline', {})
  }, [socket, auth])

  useEffect(() => {
    socket.on('checkUserOnlineToClient', data => {
      data.forEach(item => {
        if (!status.includes(item.id) && item.id !== auth.user?._id) {
          dispatch({
            type: GLOBAL_TYPES.ONLINE,
            payload: item.id
          })  
        }
      })
    })

    return () => socket.off('checkUserOnlineToClient')
  }, [dispatch, status, socket, auth.user])

  useEffect(() => {
    socket.on('checkUserOffline', data => {
      dispatch({
        type: GLOBAL_TYPES.OFFLINE,
        payload: data
      })
    })

    return () => socket.off('checkUserOffline')
  }, [dispatch, socket])

  useEffect(() => {
    socket.on('readMessageToClient', data => {
      dispatch({
        type: MESSAGE_TYPES.UPDATE_MESSAGE_READ,
        payload: data
      })

      dispatch({
        type: MESSAGE_TYPES.UPDATE_READ_STATUS,
        payload: data.conversation
      })
    })

    return () => socket.off('readMessageToClient')
  }, [socket, dispatch])

  return (
    <div></div>
  )
}

export default SocketClient