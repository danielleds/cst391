import React from 'react';
import Verse from './Verse';
import 'bootstrap/dist/js/bootstrap.min.js';

const VersesList = (props) => {
    const verses = props.verses.map((verse) => {
        return (
            <Verse verse={verse}></Verse>
        )
    })

    return (
        <div className='col-5 accordion' id="versesList">
            <h3>Verses Referenced</h3>
            {verses}
        </div>
    );
}

export default VersesList;