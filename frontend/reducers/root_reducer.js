import {combineReducers} from 'redux';
import EntitiesReducer from './entities_reducer';
import SessionsReducer from './session_reducer';
import ErrorsReducer from './errors_reducer';


const RootReducer = combineReducers({
  entities: EntitiesReducer,
  session: SessionsReducer,
  errors: ErrorsReducer
});

export default RootReducer;