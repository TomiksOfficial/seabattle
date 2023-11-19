import { combineReducers, createStore } from 'redux';
import { mainData } from './mainData';
import { currentPlayer } from './currentPlayer';

const rootReducer = combineReducers({
		mainData: mainData,
		currentPlayer: currentPlayer
	}
);

export const store = createStore(rootReducer);