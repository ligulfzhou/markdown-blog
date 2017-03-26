import { SELECT_TAB } from '../actions/Tabbar.js';

export const tabbar = (state={tabbar: 1}, action={}) => {
	switch(action.type){
		case SELECT_TAB:
			return {
				...state,
				tabbar: action.tabbar,
                hidden: false
			}
		default:
			return state
	}
}
