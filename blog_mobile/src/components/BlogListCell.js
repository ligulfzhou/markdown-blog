import React, { Component } from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';


export default class BlogListCell extends Component {

	render () {
	    return (
            <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Card style={{ overflow: 'hidden' }} full>
                    <Card.Header
                        title={<Link to={"/tags/"+this.props.blog.tag_id}>{ this.props.blog.tag_title }</Link>}
                        thumb={ this.props.blog.tag_img_url }
                        thumbStyle={{ width: '0.44rem' }}
                        extra={<span>{ this.props.blog.create_time.split(' ')[0] }</span>}
                    />
                    <Card.Body style={{ overflow: 'auto'}}>
                    <Link to={"/blogs/"+this.props.blog.id}><center><h3>{ this.props.blog.title }</h3></center></Link>
                        <ReactMarkdown source={ this.props.blog.content } />
                    </Card.Body>
                    <Card.Footer content={ "评论数: " + this.props.blog.count } />
                </Card>
                <WhiteSpace size="lg" />
            </WingBlank>
		);
	}
}

