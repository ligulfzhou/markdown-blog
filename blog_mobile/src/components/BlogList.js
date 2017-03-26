import React, { Component } from 'react';
import BlogListCell from './BlogListCell';


export default class BlogList extends Component {
	render () {
		return (
		    <div style={{marginBottom: '0.8rem'}}>
			{ this.props.blogs.map(blog =>
			  <BlogListCell
				key={ blog.id }
                blog={ blog }
				onClick={ () => this.props.onBlogClick(blog.id) }
			  />
			) }
			</div>
		)
	}
}

