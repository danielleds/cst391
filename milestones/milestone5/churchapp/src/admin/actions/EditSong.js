import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataSource from '../../dataSource';

const EditSong = (props) => {
    // New song in case this is song creation
    let song = {
        title: "",
        artist: "",
        video: ""
    };

    const [newSongCreation, setNewSongCreation] = useState(true);
    const [songTitle, setSongTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [video, setVideo] = useState('');
    const navigate = useNavigate();

    const updateTitle = (event) => {
        setSongTitle(event.target.value);
    };
    
    const updateArtist = (event) => {
        setArtist(event.target.value);
    };
    
    const updateVideo = (event) => {
        setVideo(event.target.value);
    };

    if (props.song) {
        song = props.song;
    }

    useEffect(() => {
        // if editing, initialize the song object
        // newSongCreation ensures it will only run once
        if (props.song && newSongCreation) {
            setNewSongCreation(false);
            setSongTitle(props.song.title);
            setArtist(props.song.artist);
            setVideo(props.song.video);
        }
    }, [newSongCreation, props.song]);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const editedSong = {
            songId: song.songId,
            title: songTitle,
            artist: artist,
            video: video,
        };

        saveSong(editedSong);
    }
    
    const saveSong = async (song) => {
        let response;
        if (newSongCreation)
            response = await dataSource.post('/songs', song);
        else
            response = await dataSource.put('/songs', song);
        console.log(response);
        console.log(response.data);

        if (response.status === 200) {
            alert("Song successfully saved.");
            navigate("/AdminDashboard/songs");
        } else {
            alert("An error occurred.");
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className='w-100 form-group'>
            <div className="mb-3">
                <label htmlFor="songTitle" className="form-label">Song Title</label>
                <input type="text" className="form-control" id="songTitle" placeholder="Enter Song Title"
                    value={songTitle} onChange={updateTitle} />
            </div>
            <div className="mb-3">
                <label htmlFor="songArtist" className="form-label">Song Artist</label>
                <input type="text" className="form-control" id="songArtist" placeholder="Enter Song Artist"
                    value={artist} onChange={updateArtist} />
            </div>
            <div className="mb-3">
                <label htmlFor="songVideo" className="form-label">Song Video</label>
                <input type="text" className="form-control" id="songVideo" placeholder="Enter Song Video Link"
                    value={video} onChange={updateVideo} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default EditSong;