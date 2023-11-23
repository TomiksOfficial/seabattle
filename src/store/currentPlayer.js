const defaultState = {}

const SET_CURRENT_PLAYER = "SET_CURRENT_PLAYER";
const SET_PLAYER_TURN = "SET_PLAYER_TURN";
const SET_GAME_STATE = "SET_GAME_STATE";

export const currentPlayer = (state = defaultState, action) => {
	switch(action.type) {
		case SET_CURRENT_PLAYER: {
			return {...action.payload}
		}

		case SET_PLAYER_TURN: {
			return {...state, "player_turn": action.payload.player_turn}
		}

		case SET_GAME_STATE: {
			return {...state, "inGame": action.payload}
		}

		default:
			return state;
	}
}

export const setCurrentPlayer = (payload) => ({type: SET_CURRENT_PLAYER, payload});
export const setPlayerTurn = (payload) => ({type: SET_PLAYER_TURN, payload});
export const setGameState = (payload) => ({type: SET_GAME_STATE, payload});