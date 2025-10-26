import React, { useEffect, useState } from "react";
import dataSource from '../../dataSource';

const SermonVerses = (props) => {
    const [verses, setVerses] = useState([]);
    const [allVerses, setAllVerses] = useState([]);
    const [selectedVerse, setSelectedVerse] = useState({});
    const [initialized, setInitialized] = useState(false);
    const [justAddedVerse, setJustAddedVerse] = useState(false);

    const isUndefinedOrEmptyObject = (obj) => {
        if (obj) {
            return Object.keys(obj).length === 0;
        }
        return true
    }

    const updateSelectedVerse = (event) => {
        setSelectedVerse(allVerses.filter(verse => verse.verseId === parseInt(event.target.value))[0]);
    }

    const addVerse = () => {
        setVerses([...verses, selectedVerse]);
        setAllVerses(allVerses.filter(verse => verse.verseId !== selectedVerse.verseId));
        setSelectedVerse(allVerses[0]);
        setJustAddedVerse(true);
    }

    const removeVerse = (verseToRemove) => {
        setVerses(verses.filter(verse => verse.verseId !== verseToRemove.verseId));
        setAllVerses([...allVerses, verseToRemove]);
    }    

    const currentVerses = verses.map((verse) => {
        if (!isUndefinedOrEmptyObject(verse)) {
            return (
                <li
                    key={verse.verseId}
                    className="list-group-item d-flex justify-content-between align-items-center">
                        {verse.reference}
                        <button type="button" className="btn btn-danger"
                            onClick={() => {removeVerse(verse)}}>
                            Delete
                        </button>
                </li>
            );
        } else {
            return "";
        }
    });

    const selectVerses = allVerses.map((verse) => {
        return (
            <option
                key={verse.verseId}
                value={verse.verseId}>
                    {verse.reference}
            </option>
        )
    });

    useEffect(() => {

        const loadAllVerses = async () => {
            const response = await dataSource.get('/verses');
            let allVersesFiltered = response.data;
            for (let i = 0; i < verses.length; i++) {
                allVersesFiltered = allVersesFiltered.filter(verse => verse.verseId !== verses[i].verseId);
            }
            if (allVerses.length !== allVersesFiltered.length)
                setAllVerses(allVersesFiltered);
        }

        loadAllVerses();

        if (!initialized) {
            if (isUndefinedOrEmptyObject(selectedVerse) && allVerses.length > 0) {
                setSelectedVerse(allVerses[0]);
            }
            // props.verses may not be initialized when this is rendered so do not initialize here
            if (props.hasVerses && isUndefinedOrEmptyObject(verses[0])) {
                setVerses(props.verses);
            } else if (!props.hasVerses && !isUndefinedOrEmptyObject(selectedVerse)) {
                setInitialized(true);
            }

            // initialize if verses are initialized
            if ((!initialized && !isUndefinedOrEmptyObject(verses[0])) && props.hasVerses && !isUndefinedOrEmptyObject(selectedVerse)) {
                setInitialized(true);
            } 
        } else {
            // for updating dependencies as needed after everything is initialized

            if ((allVerses[0] !== selectedVerse) && justAddedVerse) {
                // updating selected verse here since the calls above in addVerse are asynchronous
                setSelectedVerse(allVerses[0]);
            }

            if ((selectedVerse === allVerses[0]) && justAddedVerse) {
                setJustAddedVerse(false);
            }
        }
    }, [initialized, verses, allVerses, props.verses, props.hasVerses, selectedVerse, justAddedVerse]);

    if (initialized) {
        if (props.verses !== verses) {
            props.updateVerses(verses);
        }
    }

    return (
        <div>
            <label htmlFor='verseSelect' className='form-label'>Add Verses</label>
            {currentVerses.length > 0 ? <ul className="list-group mb-3">{currentVerses}</ul> : ""}
            <select id="verseSelect" className="form-select mb-3" onChange={updateSelectedVerse}>{selectVerses}</select>
            <button type="button" className="btn btn-primary mb-3"
                onClick={() => {addVerse()}}>
                Add Selected Verse
            </button>
        </div>
    )
}

export default SermonVerses;