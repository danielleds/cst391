import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Sermon } from './sermon.model';
import { sermonQueries } from './sermons.queries';

export const readSermons = async () => {
    return execute<Sermon[]>(sermonQueries.readSermons, []);
};

export const readSermonById = async (sermonId: number) => {
    return execute<Sermon[]>(sermonQueries.readSermonsById, [sermonId]);
};

export const createSermon = async (sermon: Sermon) => {
    let date = new Date(sermon.date);
    date.setDate(date.getDate() + 1); // add a day here since the date object loses one during the conversion
    return execute<OkPacket>(sermonQueries.createSermon,
        [sermon.title, date.toLocaleDateString("en-CA"), sermon.summary]);
};

export const updateSermon = async (sermon: Sermon) => {
    let date = new Date(sermon.date);
    date.setDate(date.getDate() + 1); // add a day here since the date object loses one during the conversion
    return execute<OkPacket>(sermonQueries.updateSermon,
        [sermon.title, date.toLocaleDateString("en-CA"), sermon.summary, sermon.sermonId]);
};

export const deleteSermon = async (sermonId: number) => {
    return execute<OkPacket>(sermonQueries.deleteSermon, [sermonId]);
};