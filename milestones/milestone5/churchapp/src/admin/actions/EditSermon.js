import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataSource from '../../dataSource';
import SermonSongs from './SermonSongs';
import SermonVerses from './SermonVerses';

const EditSermon = (props) => {

    // New sermon in case this is sermon creation
    let sermon = {
        title: "",
        date: "",
        summary: "",
        songs: [],
        verses: []
    };

    
    const [newSermonCreation, setNewSermonCreation] = useState(true);
    const [sermonTitle, setSermonTitle] = useState('');
    const [date, setDate] = useState('');
    const [summary, setSummary] = useState('');
    const [songs, setSongs] = useState([]);
    const [verses, setVerses] = useState([]);
    const navigate = useNavigate();
    
    const updateTitle = (event) => {
        setSermonTitle(event.target.value);
    };
    
    const updateDate = (event) => {
        setDate(event.target.value);
    };
    
    const updateSummary = (event) => {
        setSummary(event.target.value);
    };
    
    const updateSongs = (songs) => {
        setSongs(songs);
    };
    
    const updateVerses = (verses) => {
        setVerses(verses);
    };

    if (props.sermon) {
        sermon = props.sermon;
    }

    useEffect(() => {
        // if editing, initialize the sermon object
        // newSermonCreation ensures it will only run once
        if (props.sermon && newSermonCreation) {
            setNewSermonCreation(false);
            setSermonTitle(props.sermon.title);
            setDate(new Date(props.sermon.date).toISOString().substring(0, 10));
            setSummary(props.sermon.summary);
            setSongs(props.sermon.songs);
            setVerses(props.sermon.verses);
        }
    }, [newSermonCreation, props.sermon]);

    const handleFormSubmit = (event) => {
        console.log(songs)
        event.preventDefault();

        const editedSermon = {
            sermonId: sermon.sermonId,
            title: sermonTitle,
            date: date,
            summary: summary,
            songs: songs,
            verses: verses,
        };

        //console.log(editedSermon);

        saveSermon(editedSermon);
    }
    
    const saveSermon = async (sermon) => {
        let response;
        if (newSermonCreation)
            response = await dataSource.post('/sermons', sermon);
        else
            response = await dataSource.put('/sermons', sermon);
        //console.log(response);
        //console.log(response.data);

        if (response.status === 200) {
            alert("Sermon successfully saved.");
            navigate("/AdminDashboard/sermons");
        } else {
            alert("An error occurred.");
        }
    };
    console.log(songs);

    return (
        <form onSubmit={handleFormSubmit} className='w-100 form-group'>
            <div className='row'>
                <div className='col-7'>
                    <div className="mb-3">
                        <label htmlFor="sermonTitle" className="form-label">Sermon Title</label>
                        <input type="text" className="form-control" id="sermonTitle" placeholder="Enter Sermon Title"
                            value={sermonTitle} onChange={updateTitle} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sermonDate" className="form-label">Sermon Date</label>
                        <input type="date" className="form-control" id="sermonDate"
                            value={date} onChange={updateDate} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sermonSummary" className="form-label">Sermon Summary</label>
                        <textarea className="form-control" rows="8" id="sermonSummary" placeholder="Enter Sermon Summary"
                            value={summary} onChange={updateSummary} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <div className='col-5'>
                    <SermonSongs songs={songs} updateSongs={updateSongs} hasSongs={newSermonCreation? false : props.sermon.songs.length > 0} />
                    <SermonVerses verses={verses} updateVerses={updateVerses} hasVerses={newSermonCreation? false : props.sermon.verses.length > 0} />
                </div>
            </div>
        </form>
    )
}

export default EditSermon;