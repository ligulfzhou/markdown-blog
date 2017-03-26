import { REQUEST_BLOGS, RECEIVE_BLOGS } from '../actions/Blog.js';
import { REQUEST_BLOG, RECEIVE_BLOG } from '../actions/Blog.js';
import { SWITCH_BLOG } from '../actions/Blog.js';


export const blogs = (state={
	isFetching: false,
	didInvalidate: false,
	items: []
	}, action={}) => {
		switch(action.type){
			case REQUEST_BLOGS:
				return {
					...state,
					isFetching: true,
					didInvalidate: false
				}
			case RECEIVE_BLOGS:
				return {
					...state,
					isFetching: false,
					didInvalidate: false,
					items: action.blogs,
				}
			default:
				return state
		}
	}


export const blog = (state={
    isFetching: false,
    blog: {}
    }, action={}) => {
        switch(action.type){
            case REQUEST_BLOG:
                return {
                    ...state,
                    isFetching: true,
                }
            case RECEIVE_BLOG:
                return {
                    ...state,
                    isFetching: false,
                    blog: action.blog
                }
            default:
                return state
        }
    }

export const blog_id = (state={
    blog_id: 0
    }, action={}) => {
        switch(action.type){
        case SWITCH_BLOG:
            return {
                ...state,
                blog_id: action.blog_id
            }
        default:
            return state
        }
    }

