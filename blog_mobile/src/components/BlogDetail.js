import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WhiteSpace, NavBar } from 'antd-mobile';

import { fetchBlog } from '../actions/Blog';
import CommentList from './CommentList';
import CommentStaticList from './CommentStaticList';


class BlogDetail extends Component {

    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        dispatch(fetchBlog(this.props.params.blog_id))
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchBlog(this.props.params.blog_id))
    }

    render() {
        var comments = []
        if (this.props.blog && this.props.blog.comments) {
            comments = this.props.blog.comments;
        }
        console.log(comments)

        return (
            <div>
                <NavBar leftContent='返回' mode='light' onLeftClick={ () => console.log() }> { this.props.blog.title } </NavBar>
                <WhiteSpace size='lg' />
                <div style={{ overflow: 'hidden' }}>
                <CommentStaticList comments={ comments } />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        blog: state.blog.blog,
    })
)(BlogDetail);

