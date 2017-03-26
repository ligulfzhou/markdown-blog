import { REQUEST_TAGS, RECEIVE_TAGS } from '../actions/Tag.js';
import { REQUEST_TAG, RECEIVE_TAG } from '../actions/Tag.js';

export const tags = (state={
	isFetching: false,
	didInvalidate: false,
	items: []
	}, action={}) => {
		switch(action.type){
			case REQUEST_TAGS:
				return {
					...state,
					isFetching: true,
					didInvalidate: false
				}
			case RECEIVE_TAGS:
				return {
					...state,
					isFetching: false,
					didInvalidate: false,
					items: action.tags,
				}
			default:
				return state
		}
	}


export const tag = (state={
	isFetching: false,
	tag: {}
}, action={}) => {
	switch(action.type){
	case REQUEST_TAG:
		return {
			...state,
			isFetching: true,
		}
	case RECEIVE_TAG:
		return {
			...state,
			isFetching: false,
			tag: action.tag,
		}
	default:
		return state
	}
}
