import React from 'react';
import ReactDOM from 'react-dom';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, hashHistory } from 'react-router';

import App from './App';
import BlogDetail from './components/BlogDetail.js';
import TagDetail from './components/TagDetail.js';

import './index.css';
import reducer from './reducers/Root.js';

const middleware = [thunk, createLogger()]

const store = createStore(
	reducer,
	applyMiddleware(...middleware)
)

ReactDOM.render(
	<Provider store={ store }>
        <Router history={ hashHistory }>
            <Route path="/blogs" component={ App } />
            <Route path="/blogs/:blog_id" component={ BlogDetail } />
            <Route path="/tags" component={ App } />
            <Route path="/tags/:tag_id" component={ TagDetail } />
            <Route path="/comments" component={ App } />
        </Router>
  	</Provider>,
  	document.getElementById('root')
);

