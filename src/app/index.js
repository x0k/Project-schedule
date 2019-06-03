import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/appContainer'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'

import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import configureStore, { history } from '../store'

let store = configureStore({})

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route exact path="/" component={App} />
      <Route path="/(:schedule)" component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
