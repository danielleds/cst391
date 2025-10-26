import React, { useEffect, useState } from "react";
import dataSource from '../../dataSource';

const SermonSongs = (props) => {
    const [songs, setSongs] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState({});
    const [initialized, setInitialized] = useState(false);
    const [justAddedSong, setJustAddedSong] = useState(false);

    const isUndefinedOrEmptyObject = (obj) => {
        if (obj) {
            return Object.keys(obj).length === 0;
        }
        return true
    }

    const updateSelectedSong = (event) => {
        setSelectedSong(allSongs.filter(song => song.songId === parseInt(event.target.value))[0]);
    }

    const addSong = () => {
        setSongs([...songs, selectedSong]);
        setAllSongs(allSongs.filter(song => song.songId !== selectedSong.songId));
        setSelectedSong(allSongs[0]);
        setJustAddedSong(true);
    }

    const removeSong = (songToRemove) => {
        setSongs(songs.filter(song => song.songId !== songToRemove.songId));
        setAllSongs([...allSongs, songToRemove]);
    }    

    const currentSongs = songs.map((song) => {
        if (!isUndefinedOrEmptyObject(song)) {
            return (
                <li
                    key={song.songId}
                    className="list-group-item d-flex justify-content-between align-items-center">
                        {song.title}
                        <button type="button" className="btn btn-danger"
                            onClick={() => {removeSong(song)}}>
                            Delete
                        </button>
                </li>
            );
        } else {
            return "";
        }
    });

    const selectSongs = allSongs.map((song) => {
        return (
            <option
                key={song.songId}
                value={song.songId}>
                    {song.title} - {song.artist}
            </option>
        )
    });

    useEffect(() => {

        const loadAllSongs = async () => {
            const response = await dataSource.get('/songs');
            let allSongsFiltered = response.data;
            for (let i = 0; i < songs.length; i++) {
                allSongsFiltered = allSongsFiltered.filter(song => song.songId !== songs[i].songId);
            }
            if (allSongs.length !== allSongsFiltered.length)
                setAllSongs(allSongsFiltered);
        }

        loadAllSongs();

        if (!initialized) {
            if (isUndefinedOrEmptyObject(selectedSong) && allSongs.length > 0) {
                setSelectedSong(allSongs[0]);
            }
            // props.songs may not be initialized when this is rendered so do not initialize here
            if (props.hasSongs && isUndefinedOrEmptyObject(songs[0])) {
                setSongs(props.songs);
            } else if (!props.hasSongs && !isUndefinedOrEmptyObject(selectedSong)) {
                setInitialized(true);
            }

            // initialize if songs are initialized
            if ((!initialized && !isUndefinedOrEmptyObject(songs[0])) && props.hasSongs && !isUndefinedOrEmptyObject(selectedSong)) {
                setInitialized(true);
            } 
        } else {
            // for updating dependencies as needed after everything is initialized

            if ((allSongs[0] !== selectedSong) && justAddedSong) {
                // updating selected song here since the calls above in addSong are asynchronous
                setSelectedSong(allSongs[0]);
            }

            if ((selectedSong === allSongs[0]) && justAddedSong) {
                setJustAddedSong(false);
            }
        }
    }, [initialized, songs, allSongs, props.songs, props.hasSongs, selectedSong, justAddedSong]);

    if (initialized) {
        if (props.songs !== songs) {
            props.updateSongs(songs);
        }
    }

    return (
        <div>
            <label htmlFor='songSelect' className='form-label'>Add Songs</label>
            {currentSongs.length > 0 ? <ul className="list-group mb-3">{currentSongs}</ul> : ""}
            <select id="songSelect" className="form-select mb-3" onChange={updateSelectedSong}>{selectSongs}</select>
            <button type="button" className="btn btn-primary mb-3"
                onClick={() => {addSong()}}>
                Add Selected Song
            </button>
        </div>
    )
}

export default SermonSongs;