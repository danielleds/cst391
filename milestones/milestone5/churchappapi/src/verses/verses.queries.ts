export const verseQueries = {
    readVerses: `
        SELECT
            id as verseId, reference AS reference, text AS text
        FROM church.verses
        `,

    readVerseById: `
        SELECT
        id as verseId, title AS title, artist AS artist, video AS video
        FROM church.verses
        WHERE church.verses.id = ?
        `,

    readVersesBySermonId: `
        SELECT 
        church.verses.id as verseId, church.verses.reference AS reference, church.verses.text AS text
        FROM church.verses
        INNER JOIN church.sermonVerses sermonVerses
        ON church.verses.id = sermonVerses.verseId
        WHERE sermonVerses.sermonId = ?
    `,


    createVerse: `
        INSERT INTO VERSES(reference, text) VALUES(?, ?)
        `,

    updateVerse: `
        UPDATE church.verses
        SET reference = ?, text = ?
        WHERE id = ?
        `,

    deleteVerse: `
        DELETE FROM church.verses
        WHERE id = ?
        `,

    addVerseToSermon: `
        INSERT INTO SERMONVERSES(verseId, sermonId) VALUES(?, ?)
        `,

    removeVerseFromSermon: `
        DELETE FROM church.sermonverses
        WHERE church.sermonverses.verseId = ?
        AND church.sermonverses.sermonId = ?
        `
}