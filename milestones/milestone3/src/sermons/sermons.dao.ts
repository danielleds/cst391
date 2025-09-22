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
    return execute<OkPacket>(sermonQueries.createSermon,
        [sermon.title, sermon.date, sermon.summary]);
};

export const updateSermon = async (sermon: Sermon) => {
    return execute<OkPacket>(sermonQueries.updateSermon,
        [sermon.title, sermon.date, sermon.summary, sermon.id]);
};

export const deleteSermon = async (sermonId: number) => {
    return execute<OkPacket>(sermonQueries.deleteSermon, [sermonId]);
};