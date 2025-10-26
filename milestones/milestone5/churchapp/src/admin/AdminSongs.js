import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import dataSource from '../dataSource';

const AdminSongs = (props) => {
    const [songsList, setSongsList] = useState([]);
    const navigate = useNavigate();

    const loadSongs = async () => {
        const response = await dataSource.get('/songs');
        setSongsList(response.data);
    }

    const handleSelection = (songId, uri) => {
        console.log('Song ID:', songId);
        for (var i = 0; i < songsList.length; ++i) {
            if (songsList[i].songId === songId) {
                // change the selected song object for parent component (App)
                props.changeSong(songsList[i]);
                // navigate to the song view
                navigate(uri +  i);
            }
        }
    }

    const deleteSong = async (songId) => {
        const response1 = await dataSource.delete("/songs/" + songId);
        console.log(response1);
        const response2 = await dataSource.get('/songs');
        setSongsList(response2.data);
    }

    // initialize the songs list
    useEffect(() => {
        loadSongs();
    }, []);

    const songs = songsList.map((song) => {
        return (
            <li
                key={song.songId}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
                {song.title}
                <div>
                    <button type="button" className="btn btn-secondary me-1"
                    onClick={() => {handleSelection(song.songId, "/edit/song/")}}>
                        Edit</button>
                    <button type="button" className="btn btn-danger"
                    onClick={() => {deleteSong(song.songId)}}>
                        Delete
                    </button>
                </div>
            </li>
        )
    })

    return (
        <>
            <Link to="/new/song">
                <button type="button" className="btn btn-secondary mb-3">Create New Song</button>
            </Link>
            <ul className="list-group">{songs}</ul>
        </>
    )
}

export default AdminSongs;