import React from 'react';

const Verse = (props) => {
    console.log(props.verse)
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type='button'
			        data-bs-toggle="collapse"
                    data-bs-target={"#collapse" + props.verse.verseId}
                    aria-expanded="false"
                    aria-controls={"collapse" + props.verse.verseId}>
                        {props.verse.reference}
                </button>
            </h2>

            <div
                id={"collapse" + props.verse.verseId}
                className="accordion-collapse collapse"
                data-bs-parent="#versesList"
                style={{padding: "10px"}}>
                    {props.verse.text}
            </div>
        </div>
    )
}

export default Verse;