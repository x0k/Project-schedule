import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { createLogger } from 'redux-logger'

import generator from './middleware/generator'

import application from './application'

import schedules from './schedules'

export const history = createBrowserHistory()

const loggerMiddleware = createLogger()

const initialState = {
  application: {
    drawerOpen: false,
    schedule: -1
  },
  schedules: []
}

const reducer = combineReducers({
  application,
  schedules,
  router: connectRouter(history)
})

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(
    generator,
    routerMiddleware(history),
    loggerMiddleware
  )
)
