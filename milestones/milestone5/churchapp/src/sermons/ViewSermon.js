import React from 'react';
import SongsList from './SongsList'
import VersesList from './VersesList'

const ViewSermon = (props) => {
    // create date object to convert it to a readable format
    const date = new Date(props.sermon.date)
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-7'>
                    <h1>{props.sermon.title}</h1>
                    <small>
                        {date.toLocaleString('default', { month: 'long' })} {date.getDate()}, {date.getFullYear()}
                    </small>

                    <div id="songsList" className="accordion">
                        <SongsList songs={props.sermon.songs}></SongsList>
                    </div>

                    <p>{props.sermon.summary}</p>
                </div>
                <VersesList verses={props.sermon.verses}></VersesList>
            </div>
        </div>
    )
}

export default ViewSermon;