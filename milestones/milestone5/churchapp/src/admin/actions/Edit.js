import React from "react";
import { Outlet } from 'react-router-dom';

const Edit = () => {
    return (
        <div className="container">
            <Outlet />
        </div>
    )
}

export default Edit;