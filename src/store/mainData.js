const defaultState = {}

const ADD_ACTIVE_PLAYERS = "ADD_ACTIVE_PLAYERS";
const SET_ACTIVE_PLAYERS = "SET_ACTIVE_PLAYERS";
const REMOVE_ACTIVE_PLAYERS = "REMOVE_ACTIVE_PLAYERS";

export const mainData = (state = defaultState, action) => {
	switch(action.type) {
		case ADD_ACTIVE_PLAYERS: {
			const temp = Object.assign(Object.assign({}, state), action.payload);

			return {...state, ...action.payload}
		}

		case SET_ACTIVE_PLAYERS: {
			return {...action.payload}
		}

		case REMOVE_ACTIVE_PLAYERS: {
			const temp = Object.values(state);
			return Object.assign({}, temp.filter(x => x.id != action.payload.id));
		}

		default:
			return state;
	}
}

export const setActivePlayers = (payload) => ({type: SET_ACTIVE_PLAYERS, payload});
export const addActivePlayers = (payload) => ({type: ADD_ACTIVE_PLAYERS, payload});
export const removeActivePlayers = (payload) => ({type: REMOVE_ACTIVE_PLAYERS, payload});