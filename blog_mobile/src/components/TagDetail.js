import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTag } from '../actions/Tag';
import BlogListCell from './BlogListCell';


class TagDetail extends Component {

    constructor(props){
        super(props);

        const { dispatch } = this.props;
        dispatch(fetchTag(this.props.params.tag_id));
    }

	render () {
        var blogs = [];
        if (this.props.tag && this.props.tag.blogs) {
            blogs = this.props.tag.blogs;
        }

		return (
		    <div style={{marginBottom: '0.8rem'}}>
			{ blogs.map(blog =>
			  <BlogListCell
				key={ blog.id }
                blog={ blog }
			  />
			) }
			</div>
		)
	}
}

export default connect(
    state=> ({
        tag: state.tag.tag
    })
)(TagDetail);

