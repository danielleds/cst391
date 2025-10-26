import { Request, RequestHandler, Response } from 'express';
import { Sermon } from './sermon.model';
import { Song } from '../songs/song.model';
import { Verse } from '../verses/verse.model';
import * as SermonDao from './sermons.dao';
import * as SongsDao from '../songs/songs.dao';
import * as VersesDao from '../verses/verses.dao';
import { OkPacket } from 'mysql';

export const readSermons: RequestHandler = async (req: Request, res: Response) => {
    try {
        let sermons = await SermonDao.readSermons();

        await readSongs(sermons, res);
        await readVerses(sermons, res);

        res.status(200).json(sermons);
    } catch (error) {
        console.error('[sermons.controller][readSermons][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching sermons'
        });
    }
};

export const readSermonById: RequestHandler = async (req: Request, res: Response) => {
    try {
        let sermon;

        let sermonId = parseInt(req.params.sermonId as string);

        console.log('id', sermonId);
        if (Number.isNaN(sermonId)) {
            res.status(500).json({
                message: 'Invalid id'
            });
            return;
        } else {
            sermon = await SermonDao.readSermonById(sermonId);
        }
        
        await readSongs(sermon, res)
        await readVerses(sermon, res);

        res.status(200).json(sermon);
    } catch (error) {
        console.error('[sermons.controller][readSermons][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching sermons'
        });
    }
};

export const createSermon: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await SermonDao.createSermon(req.body);

        console.log('req.body', req.body);
        console.log('sermon', okPacket);

        let tempSermon : Sermon = {
            sermonId: okPacket.insertId,
            title: "",
            date: new Date(),
            summary: "",
            songs: [],
            verses: []
        }

        await setSermonSongsAndVerses(tempSermon, req.body.songs, req.body.verses);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[sermons.controller][createSermon][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing sermons'
        });
    }
};

export const updateSermon: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await SermonDao.updateSermon(req.body);

        let tempSermon : Sermon = {
            sermonId: req.body.sermonId,
            title: "",
            date: new Date(),
            summary: "",
            songs: [],
            verses: []
        }

        await readSongs([tempSermon], res)
        await readVerses([tempSermon], res);

        await setSermonSongsAndVerses(tempSermon, req.body.songs, req.body.verses);

        console.log('req.body', req.body);
        console.log('req.body.songs', req.body.songs)
        console.log('sermon', okPacket);

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[sermons.controller][updateSermon][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating sermons'
        });
    }
};

export const deleteSermon: RequestHandler = async (req: Request, res: Response) => {
    try {
        let sermonId = parseInt(req.params.sermonId as string);

        console.log('sermonId', sermonId);
        if (!Number.isNaN(sermonId)) {

            const response = await SermonDao.deleteSermon(sermonId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for sermonId");
        }

    } catch (error) {
        console.error('[sermons.controller][deleteSermon][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting sermons'
        });
    }
};

async function readSongs(sermons: Sermon[], res: Response<any, Record<string, any>>) {
    for (let i = 0; i < sermons.length; i++) {
        try {
            const songs = await SongsDao.readSongsBySermonId(sermons[i].sermonId);
            sermons[i].songs = songs;

        } catch (error) {
            console.error('[sermons.controller][readSongs][Error] ', error);
            res.status(500).json({
                message: 'There was an error when fetching sermon songs'
            });
        }
    }
};

async function readVerses(sermons: Sermon[], res: Response<any, Record<string, any>>) {
    for (let i = 0; i < sermons.length; i++) {
        try {
            const verses = await VersesDao.readVersesBySermonId(sermons[i].sermonId);
            sermons[i].verses = verses;

        } catch (error) {
            console.error('[sermons.controller][readVerses][Error] ', error);
            res.status(500).json({
                message: 'There was an error when fetching sermon verses'
            });
        }
    }
};

async function setSermonSongsAndVerses(sermon: Sermon, newSongsList: Song[], newVersesList: Verse[]) {
    let songsToAdd: Song[] = [];
    let songsToRemove: Song[] = [];

    // going through the old list first to see if any need to be removed
    sermon.songs.forEach(song => {
        let result = newSongsList.filter((newSong) => newSong.songId === song.songId);
        if (result.length === 0) {
            songsToRemove.push(song);
        }
    });
    
    // going through the new list to see which ones require new entries in the database
    newSongsList.forEach((song) => {
        let result = sermon.songs.filter((oldSong) => oldSong.songId === song.songId);
        if (result.length === 0) {
            songsToAdd.push(song);
        }
    });

    songsToAdd.forEach(async (song) => await SongsDao.addSongToSermon(song.songId, sermon.sermonId));
    songsToRemove.forEach(async (song) => await SongsDao.removeSongFromSermon(song.songId, sermon.sermonId));

    let versesToAdd: Verse[] = [];
    let versesToRemove: Verse[] = [];

    // going through the old list first to see if any need to be removed
    sermon.verses.forEach(verse => {
        let result = newVersesList.filter((newVerse) => newVerse.verseId === verse.verseId);
        if (result.length === 0) {
            versesToRemove.push(verse);
        }
    });
     
    // going through the new list to see which ones require new entries in the database
    newVersesList.forEach((verse) => {
        let result = sermon.verses.filter((oldVerse) => oldVerse.verseId === verse.verseId);
        if (result.length === 0) {
            versesToAdd.push(verse);
        }
    });

    versesToAdd.forEach(async (verse) => await VersesDao.addVerseToSermon(verse.verseId, sermon.sermonId));
    versesToRemove.forEach(async (verse) => await VersesDao.removeVerseFromSermon(verse.verseId, sermon.sermonId));

}