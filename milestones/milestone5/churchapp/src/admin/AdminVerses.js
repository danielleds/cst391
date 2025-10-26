import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import dataSource from '../dataSource';

const AdminVerses = (props) => {
    const [versesList, setVersesList] = useState([]);
    const navigate = useNavigate();

    const loadVerses = async () => {
        const response = await dataSource.get('/verses');
        setVersesList(response.data);
    }

    const handleSelection = (verseId, uri) => {
        console.log('Verse ID:', verseId);
        for (var i = 0; i < versesList.length; ++i) {
            if (versesList[i].verseId === verseId) {
                // change the selected verse object for parent component (App)
                props.changeVerse(versesList[i]);
                // navigate to the verse view
                navigate(uri +  i);
            }
        }
    }

    const deleteVerse = async (verseId) => {
        const response1 = await dataSource.delete("/verses/" + verseId);
        console.log(response1);
        const response2 = await dataSource.get('/verses');
        setVersesList(response2.data);
    }

    // initialize the verses list
    useEffect(() => {
        loadVerses();
    }, []);

    const verses = versesList.map((verse) => {
        return (
            <li
                key={verse.verseId}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
                {verse.reference}
                <div>
                    <button type="button" className="btn btn-secondary me-1"
                    onClick={() => {handleSelection(verse.verseId, "/edit/verse/")}}>
                        Edit</button>
                    <button type="button" className="btn btn-danger"
                    onClick={() => {deleteVerse(verse.verseId)}}>
                        Delete
                    </button>
                </div>
            </li>
        )
    })

    return (
        <>
            <Link to="/new/verse">
                <button type="button" className="btn btn-secondary mb-3">Create New Verse</button>
            </Link>
            <ul className="list-group">{verses}</ul>
        </>
    )
}

export default AdminVerses;