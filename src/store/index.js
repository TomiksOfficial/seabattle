import { combineReducers, createStore } from 'redux';
import { mainData } from './mainData';

const rootReducer = combineReducers({
		mainData: mainData
	}
);

export const store = createStore(rootReducer);