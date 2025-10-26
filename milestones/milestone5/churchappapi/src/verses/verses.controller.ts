import { Request, RequestHandler, Response } from 'express';
import { Verse } from './verse.model';
import * as VerseDao from './verses.dao';
import { OkPacket } from 'mysql';

export const readVerses: RequestHandler = async (req: Request, res: Response) => {
    try {
        let verses = await VerseDao.readVerses();

        res.status(200).json(verses);
    } catch (error) {
        console.error('[verses.controller][readVerses][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching verses'
        });
    }
};

export const readVerseById: RequestHandler = async (req: Request, res: Response) => {
    try {
        let verse;

        let verseId = parseInt(req.params.verseId as string);

        console.log('id', verseId);
        if (Number.isNaN(verseId)) {
            res.status(500).json({
                message: 'Invalid id'
            });
            return;
        } else {
            verse = await VerseDao.readVerseById(verseId);
        }

        res.status(200).json(verse);
    } catch (error) {
        console.error('[verses.controller][readVerses][Error] ', error);
        res.status(500).json({
            message: 'There was an error when fetching verses'
        });
    }
};

export const createVerse: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await VerseDao.createVerse(req.body);

        console.log('req.body', req.body);
        console.log('verse', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[verses.controller][createVerse][Error] ', error);
        res.status(500).json({
            message: 'There was an error when writing verses'
        });
    }
};

export const updateVerse: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await VerseDao.updateVerse(req.body);

        console.log('req.body', req.body);
        console.log('verse', okPacket);

        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[verses.controller][updateVerse][Error] ', error);
        res.status(500).json({
            message: 'There was an error when updating verses'
        });
    }
};

export const deleteVerse: RequestHandler = async (req: Request, res: Response) => {
    try {
        let verseId = parseInt(req.params.verseId as string);

        console.log('verseId', verseId);
        if (!Number.isNaN(verseId)) {
            const response = await VerseDao.deleteVerse(verseId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for verseId");
        }

    } catch (error) {
        console.error('[verses.controller][deleteVerse][Error] ', error);
        res.status(500).json({
            message: 'There was an error when deleting verses'
        });
    }
};