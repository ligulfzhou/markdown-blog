import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabBar } from 'antd-mobile';
import { Link } from 'react-router';

import './App.css';
import { fetchBlogs } from './actions/Blog';
import { selectTab } from './actions/Tabbar';
import { fetchTags } from './actions/Tag';
import BlogList from './components/BlogList';
import TagList from './components/TagList';
import CommentList from './components/CommentList.js';


class App extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        var pathname = this.props.location.pathname;

        if(pathname==='/blogs'){
            console.log('/blogs')
            dispatch(fetchBlogs())
        }else if(pathname==='/tags'){
            console.log('/tags')
            dispatch(fetchTags());
            dispatch(selectTab(2))
        }else{
            console.log('/comments')
            dispatch(fetchTags());
            dispatch(selectTab(3))
        }
    }

    onClickTab(tabbar) {
        if (this.props.tabbar === tabbar){
            return
        }
        const { dispatch } = this.props;

        if (tabbar===1){
            dispatch(fetchBlogs());
            console.log('switch /blogs')
        }else if(tabbar===2){
            console.log('switch /tags')
            dispatch(fetchTags());
        }else{
            console.log('switch /comments')
            dispatch(fetchTags());
        }
        dispatch(selectTab(tabbar))
    }

    render() {
        return (
            <TabBar
              unselectedTintColor="#949494"
              tintColor="#33A3F4"
              barTintColor="white"
              hidden={ false }
            >
              <TabBar.Item
                title="博客"
                key="博客"
                icon={<Link to="/blogs"><div style={{
                  width: '0.44rem',
                  height: '0.44rem',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
                /></Link>
                }
                selectedIcon={<div style={{
                  width: '0.44rem',
                  height: '0.44rem',
                  background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
                />
                }
                selected={this.props.tabbar === 1}
                // badge={1}
                onPress={() => {
                  this.onClickTab(1)
                }}
                data-seed="logId"
              >
              <BlogList blogs={this.props.blogs}/>

              </TabBar.Item>

              <TabBar.Item
                icon={<Link to="/tags"><div style={{
                    width: '0.44rem',
                    height: '0.44rem',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg) center center /  0.42rem 0.42rem no-repeat' }}
                  /></Link>
                }
                selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                title="分类"
                key="分类"
                badge={''}
                selected={this.props.tabbar === 2}
                onPress={() => {
                    this.onClickTab(2)
                }}
                data-seed="logId1"
              >
              <TagList tags={ this.props.tags } />
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <Link to="/comments"><div style={{
                    width: '0.44rem',
                    height: '0.44rem',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat' }}
                  /></Link>
                }
                selectedIcon={
                  <div style={{
                    width: '0.44rem',
                    height: '0.44rem',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat' }}
                  />
                }
                title="评论"
                key="评论"
                selected={this.props.tabbar === 3}
                onPress={() => {
                    this.onClickTab(3)
                }}
              >
                <CommentList />
              </TabBar.Item>
            </TabBar>
        );
    }
}

export default connect(
    state => ({
        blogs: state.blogs.items,
        tags: state.tags.items,
        tabbar: state.tabbar.tabbar,
    })
)(App);

