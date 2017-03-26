export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'


export const requestComments = () => ({
	type: REQUEST_COMMENTS
})

export const receiveComments = function(json) {
	return {
		type: RECEIVE_COMMENTS,
		comments: json.comments,
        total_page: json.total_page,
        page: json.page,
        blog_id: json.blog_id
	}
}

export const fetchComments = (blog_id, page=1) => dispatch => {
    dispatch(requestComments())
    return fetch('http://localhost:7777/api/blogs/'+blog_id+'/comments?page='+page)
        .then(response => response.json())
		.then(json=>dispatch(receiveComments(json)))
}
