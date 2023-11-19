const defaultState = {}

const ADD_ACTIVE_PLAYERS = "ADD_ACTIVE_PLAYERS";
const SET_ACTIVE_PLAYERS = "SET_ACTIVE_PLAYERS";

export const mainData = (state = defaultState, action) => {
	switch(action.type) {
		case ADD_ACTIVE_PLAYERS: {
			return {...state, ...action.payload}
		}

		case SET_ACTIVE_PLAYERS: {
			return {...action.payload}
		}

		default:
			return state;
	}
}

export const setActivePlayers = (payload) => ({type: SET_ACTIVE_PLAYERS, payload});
export const addActivePlayers = (payload) => ({type: ADD_ACTIVE_PLAYERS, payload});