import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
//import rootReducer from './store/rootReducer';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

//const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(

  //<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  //</Provider>

, document.getElementById('root'));
registerServiceWorker();
