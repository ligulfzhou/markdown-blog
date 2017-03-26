import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Grid } from 'antd-mobile';


export default class TagList extends Component {
	render () {
        var tags = this.props.tags;
        var data = tags.map(tag => ({
            id: tag.id,
            icon: tag.img_url,
            text: tag.title +" "+ tag.count + "篇",
        }))
		return (
            <Grid
                data={data}
                onClick={(el, index) => {
                    hashHistory.push('/tags/'+el.id)
                }}
                />
		)
	}
}
