export const songQueries = {
    readSongs: `
        SELECT
            id as songId, title AS title, artist AS artist, video AS video
        FROM church.songs
        `,

    readSongById: `
        SELECT
        id as songId, title AS title, artist AS artist, video AS video
        FROM church.songs
        WHERE church.songs.id = ?
        `,

    readSongsBySermonId: `
        SELECT 
        church.songs.id as songId, church.songs.title AS title, church.songs.artist AS artist, church.songs.video AS video
        FROM church.songs
        INNER JOIN church.sermonSongs sermonSongs
        ON church.songs.id = sermonSongs.songId
        WHERE sermonSongs.sermonId = ?
    `,

    createSong: `
        INSERT INTO SONGS(title, artist, video) VALUES(?, ?, ?)
        `,

    updateSong: `
        UPDATE church.songs
        SET title = ?, artist = ?, video = ?
        WHERE id = ?
        `,

    deleteSong: `
        DELETE FROM church.songs
        WHERE id = ?
        `,

    addSongToSermon: `
        INSERT INTO SERMONSONGS(songId, sermonId) VALUES(?, ?)
        `,

    removeSongFromSermon: `
        DELETE FROM church.sermonsongs
        WHERE church.sermonsongs.songId = ?
        AND church.sermonsongs.sermonId = ?
        `
}