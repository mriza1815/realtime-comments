
import { createStore, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import auth from './auth/reducer'

const combinedReducer = combineReducers({ auth })

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (state.auth) nextState.auth = state.auth // preserve count value on client side navigation
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

const initStore = context => createStore(reducer)

export const wrapper = createWrapper(initStore, {debug: true})