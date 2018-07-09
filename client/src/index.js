import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import RootReducer from './redux/RootReducer';
import jwtDecode from 'jwt-decode';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import {DispatchAuthenticate, setAuthorizationToken} from './redux/ActionCreators'
import './index.css';

const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)))

if (sessionStorage.jwtToken) {
  setAuthorizationToken(sessionStorage.jwtToken)
  try {
    store.dispatch(DispatchAuthenticate(jwtDecode(sessionStorage.jwtToken)))
  } catch (e) {
    store.dispatch(DispatchAuthenticate({}))
  }
}

ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

, document.getElementById('root'));
registerServiceWorker();
