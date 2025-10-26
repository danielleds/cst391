import React from 'react';

const Song = (props) => {
    console.log(props.song)
    return (
        <div className="row song">
            <div className='col'>{props.song.title}</div>
            <div className='col'>{props.song.artist}</div>
            <div className='col'>
                <small><a href={props.song.video}>View on Youtube</a></small>
            </div>
        </div>
    )
}

export default Song;