import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Verse } from './verse.model';
import { verseQueries } from './verses.queries';

export const readVerses = async () => {
    return execute<Verse[]>(verseQueries.readVerses, []);
};

export const readVerseById = async (verseId: number) => {
    return execute<Verse[]>(verseQueries.readVerseById, [verseId]);
};

export const readVersesBySermonId = async (sermonId: number) => {
    return execute<Verse[]>(verseQueries.readVersesBySermonId, [sermonId]);
}

export const createVerse = async (verse: Verse) => {
    return execute<OkPacket>(verseQueries.createVerse,
        [verse.reference, verse.text]);
};

export const updateVerse = async (verse: Verse) => {
    return execute<OkPacket>(verseQueries.updateVerse,
        [verse.reference, verse.text, verse.verseId]);
};

export const deleteVerse = async (verseId: number) => {
    return execute<OkPacket>(verseQueries.deleteVerse, [verseId]);
};

export const addVerseToSermon = async (verseId: number, sermonId: number) => {
    return execute<OkPacket>(verseQueries.addVerseToSermon,
        [verseId, sermonId]);
};

export const removeVerseFromSermon = async (verseId: number, sermonId: number) => {
    return execute<OkPacket>(verseQueries.removeVerseFromSermon,
        [verseId, sermonId]);
};