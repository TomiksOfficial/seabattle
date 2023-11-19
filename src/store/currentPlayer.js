const defaultState = {}

const SET_CURRENT_PLAYER = "SET_CURRENT_PLAYER";

export const currentPlayer = (state = defaultState, action) => {
	switch(action.type) {
		case SET_CURRENT_PLAYER: {
			return {...action.payload}
		}

		default:
			return state;
	}
}

export const setCurrentPlayer = (payload) => ({type: SET_CURRENT_PLAYER, payload});