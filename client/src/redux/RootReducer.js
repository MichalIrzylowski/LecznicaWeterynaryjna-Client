import {LOGIN} from './actions';


const InitialState = {
  user: undefined
}

export default function RootReducer (state=InitialState, action) {
  switch (action.type) {
    case LOGIN:
      console.log(action)
      return state;
    default:
      return state;
  }
}
