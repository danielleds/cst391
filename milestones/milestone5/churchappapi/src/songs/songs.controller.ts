import { Request, RequestHandler, Response } from 'express';
import { Song } from './song.model';
import * as SongDao from './songs.dao';
import { OkPacket } from 'mysql';

export const readSongs: RequestHandler = async (req: Request, res: Response) => {
    try {
        let songs = await SongDao.readSongs();

        res.status(200).json(songs);
    } catch (error) {
        console.error('[songs.controller][readSongs][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching songs'
        });
    }
};

export const readSongById: RequestHandler = async (req: Request, res: Response) => {
    try {
        let song;

        let songId = parseInt(req.params.songId as string);

        console.log('id', songId);
        if (Number.isNaN(songId)) {
            res.status(500).json({
                message: 'Invalid id'
            });
            return;
        } else {
            song = await SongDao.readSongById(songId);
        }

        res.status(200).json(song);
    } catch (error) {
        console.error('[songs.controller][readSongs][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching songs'
        });
    }
};

export const createSong: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await SongDao.createSong(req.body);

        console.log('req.body', req.body);
        console.log('song', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[songs.controller][createSong][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing songs'
        });
    }
};

export const updateSong: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await SongDao.updateSong(req.body);

        console.log('req.body', req.body);
        console.log('song', okPacket);

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[songs.controller][updateSong][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating songs'
        });
    }
};

export const deleteSong: RequestHandler = async (req: Request, res: Response) => {
    try {
        let songId = parseInt(req.params.songId as string);

        console.log('songId', songId);
        if (!Number.isNaN(songId)) {
            const response = await SongDao.deleteSong(songId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for songId");
        }

    } catch (error) {
        console.error('[songs.controller][deleteSong][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting songs'
        });
    }
};