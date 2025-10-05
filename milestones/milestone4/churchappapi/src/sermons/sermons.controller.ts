import { Request, RequestHandler, Response } from 'express';
import { Sermon } from './sermon.model';
import * as SermonDao from './sermons.dao';
import { OkPacket } from 'mysql';

export const readSermons: RequestHandler = async (req: Request, res: Response) => {
    try {
        let sermons = await SermonDao.readSermons();

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

        console.log('req.body', req.body);
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