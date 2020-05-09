import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './NavBar.css';

function NavBar(props) {
    if (props.user) {
        return (
        <div className="App-header">
            <div className='Logo'>
            <Link to="/" className="logo-holder"><p><img src="https://cdn.auth0.com/blog/react-js/react.png" alt="logo" width="40px"/> Preppy</p></Link>
            </div>
            <div className='right-info'>
                <p className="name">Welcome {props.user.name}</p>
                <Link to='/'><Button variant="info" className="nav-buttons" onClick={props.handleLogout}>
                    Logout
                </Button></Link>
            </div>
        </div>
        )
    }
    
    return (
    <div className="App-header">
        <div className='Logo'>
            <Link to="/" className="logo-holder"><p><img src="https://cdn.auth0.com/blog/react-js/react.png" alt="logo" width="40px"/> Preppy</p></Link>
        </div>
        <div className='about-info'>
            <Link to='/about'><Button variant="info" className="nav-buttons">About Us</Button></Link>
        </div>
        <div className='account-info btn-group'>
            <button type="button" class="btn btn-info dropdown-toggle nav-buttons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                My Account
            </button>
            <div className="dropdown-menu">
                <a className="dropdown-item" href="/signup">Signup</a>
                <div class="dropdown-divider"></div>
                <a className="dropdown-item" href="/login">Login</a>
            </div>
        </div>
    </div>
    )
};

export default NavBar;