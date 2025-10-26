import React from 'react';
import Song from './Song';
import 'bootstrap/dist/js/bootstrap.min.js';

const SongsList = (props) => {
    let songs = props.songs.map((song) => {
        return (
            <Song song={song} />
        )
    })

    return (
        <div className='accordion' id="songsList">
            <div className="accordion-item">
                <h2 className="accordion-header" id="songHeading">
                    <button
                        className="accordion-button collapsed"
                        type='button'
			            data-bs-toggle="collapse"
                        data-bs-target="#collapseSongs"
                        aria-expanded="false"
                        aria-controls="collapseSongs">
                            Worship Service Songs
                    </button>
                </h2>

                <div
                    id="collapseSongs"
                    className="accordion-collapse collapse"
		            aria-labelledby="songHeading"
                    data-bs-parent="#songsList"
                    style={{padding: "10px"}}>
                        {songs}
                </div>
            </div>
        </div>
    )
}

export default SongsList;