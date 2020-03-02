import { combineReducers } from '../redux';
import inputReducer from './inputReducer';
import countMinusReducer from './countMinusReducer';

export default combineReducers({
  input: inputReducer,
  countMinus: countMinusReducer
})