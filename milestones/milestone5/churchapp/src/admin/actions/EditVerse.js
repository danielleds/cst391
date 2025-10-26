import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataSource from '../../dataSource';

const EditVerse = (props) => {
    // New verse in case this is verse creation
    let verse = {
        reference: "",
        text: ""
    };

    const [newVerseCreation, setNewVerseCreation] = useState(true);
    const [reference, setReference] = useState('');
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const updateReference = (event) => {
        setReference(event.target.value);
    };
    
    const updateText = (event) => {
        setText(event.target.value);
    };

    if (props.verse) {
        verse = props.verse;
    }

    useEffect(() => {
        // if editing, initialize the verse object
        // newVerseCreation ensures it will only run once
        if (props.verse && newVerseCreation) {
            setNewVerseCreation(false);
            setReference(props.verse.reference);
            setText(props.verse.text);
        }
    }, [newVerseCreation, props.verse]);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const editedVerse = {
            verseId: verse.verseId,
            reference: reference,
            text: text,
        };

        saveVerse(editedVerse);
    }
    
    const saveVerse = async (verse) => {
        let response;
        if (newVerseCreation)
            response = await dataSource.post('/verses', verse);
        else
            response = await dataSource.put('/verses', verse);
        console.log(response);
        console.log(response.data);

        if (response.status === 200) {
            alert("Verse successfully saved.");
            navigate("/AdminDashboard/verses");
        } else {
            alert("An error occurred.");
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className='w-100 form-group'>
            <div className="mb-3">
                <label htmlFor="reference" className="form-label">Verse Reference</label>
                <input type="text" className="form-control" id="reference" placeholder="Enter Verse Reference"
                    value={reference} onChange={updateReference} />
            </div>
            <div className="mb-3">
                <label htmlFor="verseText" className="form-label">Verse Text</label>
                <textarea className="form-control" rows="8" id="verseText" placeholder="Enter Verse Text"
                    value={text} onChange={updateText} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default EditVerse;