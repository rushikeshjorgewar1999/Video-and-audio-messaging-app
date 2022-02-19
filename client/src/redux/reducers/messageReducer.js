import { MESSAGE_TYPES } from './../types//messageTypes'

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case MESSAGE_TYPES.CREATE_MESSAGE:
      return [...state, action.payload]
    case MESSAGE_TYPES.GET_MESSAGE:
      return action.payload
    case MESSAGE_TYPES.CLEAR_MESSAGE:
      return []
    case MESSAGE_TYPES.UPDATE_MESSAGE_READ:
      return state.map(item => (item.recipient._id === action.payload.sender) && (item.sender._id === action.payload.recipient) ? {...item, isRead: true} : item)
    default:
      return state
  }
}

export default messageReducer