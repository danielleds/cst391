import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import dataSource from '../dataSource';

const SermonsList = (props) => {
    const [sermonList, setSermonList] = useState([]);
    const navigate = useNavigate();

    const loadSermons = async () => {
        const response = await dataSource.get('/sermons');
        setSermonList(response.data);
    }

    const handleSelection = (sermonId, uri) => {
        console.log('Sermon ID:', sermonId);
        for (var i = 0; i < sermonList.length; ++i) {
            if (sermonList[i].sermonId === sermonId) {
                // change the selected sermon object for parent component (App)
                props.changeSermon(sermonList[i]);
                // navigate to the sermon view
                navigate(uri +  i);
            }
        }
    }

    const deleteSermon = async (sermonId) => {
        const response1 = await dataSource.delete("/sermons/" + sermonId);
        console.log(response1)
        const response2 = await dataSource.get('/sermons');
        setSermonList(response2.data);
    }

    // initialize the sermons list
    useEffect(() => {
        loadSermons();
    }, []);

    const sermons = sermonList.map((sermon) => {
        return (
            <li
                key={sermon.sermonId}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                onClick={props.adminView? null : () => {handleSelection(sermon.sermonId, "/sermon/")}}>
                    {sermon.title}
                    {props.adminView ?
                        <div>
                            <button type="button" className="btn btn-secondary me-1"
                                onClick={() => {handleSelection(sermon.sermonId, "/edit/sermon/")}}>
                                Edit</button>
                            <button type="button" className="btn btn-danger"
                                onClick={() => {deleteSermon(sermon.sermonId)}}>
                                Delete
                            </button>
                        </div>
                        : ""
                    }
            </li>
        )
    });

    return (
        <div className='container'>
            <ul className="list-group">{sermons}</ul>
        </div>
    );
}

export default SermonsList;