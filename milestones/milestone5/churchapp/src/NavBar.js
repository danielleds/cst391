import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light mb-3'>
            <span className='navbar-brand ms-3' href='#'>
                <Link to='/'>Eastern Ridge Church</Link>
            </span>
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarNavAltMarkup'
                aria-controls='navbarNavAltMarkup'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                <div className='navbar-nav'>
                    <span className='nav-item nav-link' href='#'>
                        <Link to='/sermons'>Sermons</Link>
                    </span>
                    <span className='nav-item nav-link' href='#'>
                        <Link to='/AdminDashboard'>Administrator Dashboard</Link>
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

