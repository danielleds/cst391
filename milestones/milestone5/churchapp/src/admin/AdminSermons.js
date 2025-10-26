import React from "react";
import { Link } from "react-router-dom";
import SermonsList from '../main/SermonsList';

const AdminSermons = (props) => {
    return (
        <>
            <Link to="/new/sermon">
                <button type="button" className="btn btn-secondary mb-3">Create New Sermon</button>
            </Link>
            <SermonsList changeSermon={props.changeSermon} adminView={true} />
        </>
    )
}

export default AdminSermons;