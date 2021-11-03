import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { addClassReducer } from './reducers/classReducer';
import { userSigninReducer } from './reducers/userReducer';

const initialState = {
  userSignin: localStorage.getItem("userSigninMyClassroom") ? { userInfo: JSON.parse(localStorage.getItem("userSigninMyClassroom")) } : {}
};


const reducers = combineReducers({
  userSignin: userSigninReducer,
  classAdd: addClassReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;