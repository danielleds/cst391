import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Song } from './song.model';
import { songQueries } from './songs.queries';

export const readSongs = async () => {
    return execute<Song[]>(songQueries.readSongs, []);
};

export const readSongById = async (songId: number) => {
    return execute<Song[]>(songQueries.readSongById, [songId]);
};

export const readSongsBySermonId = async (sermonId: number) => {
    return execute<Song[]>(songQueries.readSongsBySermonId, [sermonId]);
}

export const createSong = async (song: Song) => {
    return execute<OkPacket>(songQueries.createSong,
        [song.title, song.artist, song.video]);
};

export const updateSong = async (song: Song) => {
    return execute<OkPacket>(songQueries.updateSong,
        [song.title, song.artist, song.video, song.songId]);
};

export const deleteSong = async (songId: number) => {
    return execute<OkPacket>(songQueries.deleteSong, [songId]);
};

export const addSongToSermon = async (songId: number, sermonId: number) => {
    return execute<OkPacket>(songQueries.addSongToSermon,
        [songId, sermonId]);
};

export const removeSongFromSermon = async (songId: number, sermonId: number) => {
    return execute<OkPacket>(songQueries.removeSongFromSermon,
        [songId, sermonId]);
};