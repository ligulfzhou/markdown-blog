import React, { Component } from 'react';


function Comment(props) {
    return (
        <div key={ 'comments_' + props.comment.id } className="comment_container">
            <div className='comment_username'> { props.comment.username } </div>
            <div className='comment_content'> { props.comment.content } </div>
        </div>
    )
}

export default class CommentStaticList extends Component {
	render () {
		return (
		    <div style={{marginBottom: '0.8rem'}}>
			{ this.props.comments.map(comment =>
			  <Comment
				key={ comment.id }
                comment={ comment }
			  />
			) }
			</div>
		)
	}
}
