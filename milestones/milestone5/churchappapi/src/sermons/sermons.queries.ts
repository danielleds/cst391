export const sermonQueries = {
    readSermons: `
        SELECT
            id as sermonId, title AS title, date AS date, summary AS summary
        FROM church.sermons
        `,

    readSermonsById: `
        SELECT
        id as sermonId, title AS title, date AS date, summary AS summary
        FROM church.sermons
        WHERE church.sermons.id = ?
        `,

    createSermon: `
        INSERT INTO SERMONS(title, date, summary) VALUES(?, ?, ?)
        `,

    updateSermon: `
        UPDATE church.sermons
        SET title = ?, date = ?, summary = ?
        WHERE id = ?
        `,

    deleteSermon: `
        DELETE FROM church.sermons
        WHERE id = ?
        `,
}