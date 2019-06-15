import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { createLogger } from 'redux-logger'

import application from './application'

export const history = createBrowserHistory()

const loggerMiddleware = createLogger()

const initialState = {
  application: {
    drawerOpen: false
  }
}

const reducer = combineReducers({
  application,
  router: connectRouter(history)
})

export const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      loggerMiddleware
    )
  )
)
