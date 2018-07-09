import {LOGIN,
        ERROR,
        REMOVE_ERRORS,
        FETCH_MESSAGES,
        DELETE_MESSAGE} from './actions';


const InitialState = {
  user: {},
  isLoggedIn: false,
  error: undefined,
  messages: []
}

export default function RootReducer (state=InitialState, action) {
  switch (action.type) {
    case LOGIN:
      console.log(action);
      return {...state, user: action.userInfo, isLoggedIn: !!Object.keys(action.userInfo).length};
    case ERROR:
      console.log(action);
      return {...state, error: action.error};
    case REMOVE_ERRORS:
      console.log(action);
      return {...state, error: undefined};
    case FETCH_MESSAGES:
      console.log(action);
      return {...state, messages: action.messages}
    case DELETE_MESSAGE:
      console.log(action);
      let messages = state.messages.filter(m => m._id !== action.message)
      return {...state, messages }
    default:
      return state;
  }
}
