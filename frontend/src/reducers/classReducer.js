import { ADD_CLASS_FAIL, ADD_CLASS_REQUEST, ADD_CLASS_RESET, ADD_CLASS_SUCCESS } from "../constants/classConstant";


export const addClassReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CLASS_REQUEST:
      return {
        loading: true
      }
    case ADD_CLASS_SUCCESS:
      return {
        loading: false,
        addedClass: action.payload,
      }
    case ADD_CLASS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case ADD_CLASS_RESET:
      return {}
    default:
      return state;
  }
}