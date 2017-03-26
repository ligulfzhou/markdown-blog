import { ListView } from 'antd-mobile';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { fetchComments } from '../actions/Comments';
import { switchBlog } from '../actions/Blog';
import './CommentList.css';


function Body(props) {
    return (
        <div className="am-list-body my-body">
        <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}


function Comment(props) {
    return (
        <div key={ 'comments_' + props.comment.id } className="comment_container">
            <div className='comment_username'> { props.comment.username } </div>
            <div className='comment_content'> { props.comment.content } </div>
        </div>
    )
}


class CommentList extends Component {

    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.dataBlob = {'Comments': 'Comments'};
        this.sectionIDs = [];
        this.rowIDs = [];

        this.blog_id = this.props.o_blog_id;
        this.pageIndex = 0;

        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: true,
        };
    }

    componentDidMount() {
        console.log('00000000000000000000000000000000000000000000000000000000')
        console.log('00000000000000000000000000000000000000000000000000000000')
        console.log('00000000000000000000000000000000000000000000000000000000')
        const { dispatch } = this.props;
        dispatch(switchBlog(this.blog_id))
        ++this.pageIndex;
        dispatch(fetchComments(this.blog_id, this.pageIndex));
    }

    componentWillReceiveProps(nextProps) {
        console.log('1111111111111111111111111111111111111111111111111111111')
        console.log('1111111111111111111111111111111111111111111111111111111')
        console.log('1111111111111111111111111111111111111111111111111111111')
        console.log(this.pageIndex)
        if (this.props.page===0 && this.props.page!=this.pageIndex){
            const { dispatch } = this.props;
            ++this.pageIndex;
            dispatch(fetchComments(this.blog_id, this.pageIndex));
            return;
        }

        if (this.props.page>=this.props.total_page && this.blog_id===this.props.blog_id) {
            console.log(this.props.page)
            console.log(this.props.total_page)
            console.log('已到最底下');
            return false;
        }

        if (this.props.blog_id !== this.blog_id) {
            console.log(this.props.blog_id)
            console.log(this.blog_id)
            return false;
        }

        var comments = this.props.comments;
        for (var i=0; i<comments.length; i++){
            var comment = comments[i];
            var key = 'comment_' + comment.id;

            this.dataBlob[key] = comment;
            this.dataBlob['Comments'] = 'Comments';
            this.sectionIDs = ['Comments'];

            if (this.rowIDs.length===0){
                this.rowIDs = [[]]
            }
            this.rowIDs[0].push(key);
        }

        this.rowIDs = [].concat(this.rowIDs);
        this.sectionIDs = [].concat(this.sectionIDs);

        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
            isLoading: false,
        });
    }

    onEndReached = (event) => {
        if (this.props.blog_id !== this.blog_id) {
            console.log(this.props.blog_id)
            console.log(this.blog_id)
            return false;
        }

        const { dispatch } = this.props;
        ++this.pageIndex;
        dispatch(fetchComments(this.blog_id, this.pageIndex))
    }

    render() {
        const separator = (sectionID, rowID) => (
        <div key={`${sectionID}-${rowID}`} style={{
            backgroundColor: '#F5F5F9',
            height: 8,
            borderTop: '1px solid #ECECED',
            borderBottom: '1px solid #ECECED',
        }}
        />
        );
        const row = (rowData, sectionID, rowID) => {
            return (
                <Comment comment={ rowData } />
            )
        };

        return (
                <div style={{ margin: '0 auto', width: '96%', marginBottom: '0.2rem' }}>
                    <ListView ref="lv"
                        dataSource={this.state.dataSource}
                        renderHeader={() => <span>评论列表</span>}
                        renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
                                {this.state.isLoading ? '加载中...' : '加载完毕'}
                            </div>}
                        renderBodyComponent={() => <Body />}
                        renderRow={row}
                        renderSeparator={separator}
                        className="fortest"
                        style={{
                            height: document.documentElement.clientHeight * 7/8,
                            overflow: 'auto',
                            border: '1px solid #ddd',
                            margin: '0.1rem 0',
                        }}
                        pageSize={4}
                        scrollRenderAheadDistance={500}
                        scrollEventThrottle={20}
                        onScroll={() => { console.log('scroll'); }}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
                    />
                </div>
        );
    }
}

CommentList.propTypes = {
    o_blog_id: React.PropTypes.number
}

CommentList.defaultProps = {
    o_blog_id: 1
}

export default connect(
    state => ({
        comments: state.comments.comments,
        total_page: state.comments.total_page,
        page: state.comments.page,
        blog_id: state.blog_id.blog_id
    }))(CommentList);

