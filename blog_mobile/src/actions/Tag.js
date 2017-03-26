export const REQUEST_TAGS = 'REQUEST_TAGS'
export const RECEIVE_TAGS = 'RECEIVE_TAGS'


export const requestTags = () => ({
	type: REQUEST_TAGS
})

export const receiveTags = function(json) {
	return {
		type: RECEIVE_TAGS,
		tags: json.tags
	}
}

export const fetchTags = () => dispatch => {
    dispatch(requestTags())
	return fetch('http://localhost:7777/api/tags')
		.then(response => response.json())
		.then(json=>dispatch(receiveTags(json)))
}


export const REQUEST_TAG = 'REQUEST_TAG'
export const RECEIVE_TAG = 'RECEIVE_TAG'

export const requestTag = (tag_id) => ({
	type: REQUEST_TAG,
    tag_id: tag_id
})

export const receiveTag = function(json) {
	return {
		type: RECEIVE_TAG,
		tag: json.tag,
	}
}

export const fetchTag = (tag_id) => dispatch => {
    dispatch(requestTag(tag_id))
	return fetch('http://localhost:7777/api/tags/'+tag_id)
		.then(response => response.json())
		.then(json=>dispatch(receiveTag(json)))
}

