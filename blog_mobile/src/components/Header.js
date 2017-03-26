import React, { Component } from 'react';
import './Header.css';

class Header extends Component{
    render() {
        return (
            <div className="header">
                <div className="wrap">
                    <a href="#/" className="title">ligulfzhou的全栈之路</a>
                    <a href="#/about/me" className="about_me">About</a>
                </div>
            </div>
        )
    }
}

export default Header;
