import { MESSAGE_TYPES } from './../types/messageTypes'
import { CONVERSATION_TYPES } from './../types/conversationTypes'
import { GLOBAL_TYPES } from './../types/globalTypes'
import { getDataAPI, postDataAPI } from './../../utils/fetchData'
import { checkTokenValidity } from './../../utils/checkTokenValidity'

export const getConversation = token => async(dispatch) => {
  const tokenValidity = await checkTokenValidity(token, dispatch)
  const accessToken = tokenValidity ? tokenValidity : token
  
  try {
    const res = await getDataAPI('message/conversation', accessToken)
    dispatch({
      type: CONVERSATION_TYPES.GET_CONVERSATION,
      payload: res.data.conversation
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const getMessages = (id, token) => async(dispatch) => {
  const tokenValidity = await checkTokenValidity(token, dispatch)
  const accessToken = tokenValidity ? tokenValidity : token

  try {
    const res = await getDataAPI(`message/${id}`, accessToken)
    dispatch({
      type: MESSAGE_TYPES.GET_MESSAGE,
      payload: res.data.messages
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const createMessage = (chatData, token) => async(dispatch) => {
  const tokenValidity = await checkTokenValidity(token, dispatch)
  const accessToken = tokenValidity ? tokenValidity : token

  try {
    await postDataAPI('message', {
      ...chatData,
      sender: chatData.sender._id,
      recipient: chatData.recipient._id
    }, accessToken)

    dispatch({
      type: MESSAGE_TYPES.CREATE_MESSAGE,
      payload: chatData
    })

    dispatch({
      type: CONVERSATION_TYPES.UPDATE_CONVERSATION,
      payload: chatData
    })
  } catch (err) {
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}