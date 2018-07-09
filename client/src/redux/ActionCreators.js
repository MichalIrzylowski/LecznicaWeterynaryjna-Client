import {LOGIN, ERROR, REMOVE_ERRORS, FETCH_MESSAGES, DELETE_MESSAGE} from './actions';
import {apiCall, setTokenHeader} from './api'

const START_OF_ROUTES = 'api/lecznica_weterynaryjna';

export function setAuthorizationToken (token) {
  setTokenHeader(token)
}

//  === OBJECTS TO DISPATCH === //
export function DispatchAuthenticate(userInfo) {
  return {
    type: LOGIN,
    userInfo
  }
}

function DispatchError(error) {
  return {
    type: ERROR,
    error
  }
}

function RemoveErrors() {
  return {
    type: REMOVE_ERRORS
  }
}

function DispatchFetchedMessages (messages) {
  return {
    type: FETCH_MESSAGES,
    messages
  }
}

function DispatchDeletedMessage (message) {
  return {
    type: DELETE_MESSAGE,
    message
  }
}

//  ===  AUTHENTICATE AND USER ACTIONS  ===  //
export const AuthenticateUser = (type, userInfo) => {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      return apiCall('post', `${START_OF_ROUTES}/${type}`, userInfo)
             .then(({token, ...userData}) => {
               sessionStorage.setItem('jwtToken', token);
               setAuthorizationToken(token);
               console.log(userData);
               dispatch(DispatchAuthenticate(userData));
               dispatch(RemoveErrors());
               resolve();
             })
             .catch(err => {
               console.log(err)
               dispatch(DispatchError(err.response.data.error.message));
               reject();
             })
    })
  }
};

export const LogoutUser = () => {
  return dispatch => {
    sessionStorage.clear();
    setAuthorizationToken(false);
    dispatch(DispatchAuthenticate({}));
  };
}

export const UpdateUser = (userId, userData) => {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      return apiCall('put', `${START_OF_ROUTES}/user_update/${userId}`, userData)
          .then(userData => {
            dispatch(DispatchAuthenticate(userData))
          })
          .catch(e => {
            dispatch(DispatchError(e))
          })
    })
  }
}

export const UpdateImage = (userId, Image, config) => {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      return apiCall('post', `${START_OF_ROUTES}/update_user_image/${userId}`, Image, config)

    })
  }
}

//  === MESSAGE ACTIONS ===  //

export const FetchMessages = () => {
  return dispatch => {
    return apiCall('get', `${START_OF_ROUTES}/get_messages`)
            .then(messages => {
              dispatch(DispatchFetchedMessages(messages))
            })
            .catch(e => {
              console.log(e);
              dispatch(DispatchError(e));
            });
  }
}

export const CreateMessage = (userId, message) => {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      return apiCall('post', `${START_OF_ROUTES}/post_message/${userId}`, message)
              .then(res => {
                resolve()
              })
              .catch(e => {
                console.log(e);
                dispatch(DispatchError(e));
                reject();
              });
    });
  }
}

export const DeleteMessage = (userId, messageId) => {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      return apiCall('delete', `${START_OF_ROUTES}/delete_message/${userId}/${messageId}`)
              .then(res => {
                dispatch(DispatchDeletedMessage(messageId));
                resolve();
              })
              .catch( e => {
                dispatch(DispatchError(e));
                reject();
              })
    })
  }
}
