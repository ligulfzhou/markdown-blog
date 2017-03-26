export const REQUEST_BLOGS = 'REQUEST_BLOGS'
export const RECEIVE_BLOGS = 'RECEIVE_BLOGS'

export const requestBlogs = () => ({
	type: REQUEST_BLOGS
})

export const receiveBlogs = function(json) {
	return {
		type: RECEIVE_BLOGS,
		blogs: json.blogs
	}
}

export const fetchBlogs = () => dispatch => {
    dispatch(requestBlogs())
	return fetch('http://localhost:7777/api/blogs')
		.then(response => response.json())
		.then(json=>dispatch(receiveBlogs(json)))
}


export const REQUEST_BLOG = 'REQUEST_BLOG'
export const RECEIVE_BLOG = 'RECEIVE_BLOG'

export const requestBlog = (blog_id) => ({
    type: REQUEST_BLOG
})

export const receiveBlog = function(json) {
    return {
        type: RECEIVE_BLOG,
        blog: json.blog
    }
}

export const fetchBlog = (blog_id) => dispatch => {
    dispatch(requestBlog());
    return fetch('http://localhost:7777/api/blogs/'+blog_id)
        .then(response => response.json())
        .then(json=>dispatch(receiveBlog(json)))
}

export const SWITCH_BLOG = 'SWITCH_BLOG'

export const switchBlog = (blog_id) => ({
    type: SWITCH_BLOG,
    blog_id: blog_id
})
