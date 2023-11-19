const defaultState = {}

const SET_ACTIVE_PLAYERS = "SET_ACTIVE_PLAYERS";

export const mainData = (state = defaultState, action) => {
	switch(action.type) {
		case SET_ACTIVE_PLAYERS: {
			return {...action.payload}
		}

		default:
			return state;
	}
}

export const setActivePlayers = (payload) => ({type: SET_CURRENT_MODULE, payload});