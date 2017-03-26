import { combineReducers } from 'redux';

import { blogs, blog, blog_id  } from './Blog';
import { tabbar } from './Tabbar';
import { tags, tag } from './Tag';
import { comments } from './Comment';

const rootReducer = combineReducers({
    comments,
    blog,
	blogs,
    tabbar,
    tags,
    tag,
    blog_id
})

export default rootReducer
