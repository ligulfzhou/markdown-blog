import { REQUEST_COMMENTS, RECEIVE_COMMENTS } from '../actions/Comments.js';

export const comments = (state={
	isFetching: false,
	comments: [],
    total_page: 0,
    page: 0,
    blog_id: 0
	}, action={}) => {
		switch(action.type){
			case REQUEST_COMMENTS:
				return {
					...state,
					isFetching: true,
				}
			case RECEIVE_COMMENTS:
				return {
					...state,
					isFetching: false,
                    total_page: action.total_page,
                    page: action.page,
					comments: action.comments,
                    blog_id: action.blog_id
				}
			default:
				return state
		}
	}

