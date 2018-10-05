import { combineReducers } from 'redux';
import { reposData } from './repoReducer';

const rootReducers = combineReducers({
    reposData
});

export default rootReducers;