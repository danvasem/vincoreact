import { combineReducers } from 'redux';
import negocio from './negocio';
import cliente from './cliente';

const reducer = combineReducers({
    negocio,
    cliente
});

export default reducer;