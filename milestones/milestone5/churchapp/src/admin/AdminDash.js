import React from "react";
import { Link, Outlet } from 'react-router-dom';

const AdminDash = () => {
    return (
        <div className="container">
            <ul className="list-group list-group-horizontal mb-3">
                <Link to='sermons'>
                    <li className="list-group-item list-group-item-action">
                        Sermons
                    </li>
                </Link>
                <Link to='songs'>
                    <li className="list-group-item list-group-item-action">
                        Songs
                    </li>
                </Link>
                <Link to='verses'>
                    <li className="list-group-item list-group-item-action">
                        Verses
                    </li>
                </Link>
            </ul>

            <Outlet />
        </div>
    )
}

export default AdminDash;