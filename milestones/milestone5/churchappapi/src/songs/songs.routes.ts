import { Router } from 'express';
import * as songsController from './songs.controller';

const router = Router();
router
    .route('/songs')
    .get(songsController.readSongs);

router.
    route('/songs/:songId').
    get(songsController.readSongById);
    
router.
    route('/songs').
    post(songsController.createSong);
    
router.
    route('/songs').
    put(songsController.updateSong);
    
router.
    route('/songs/:songId').
    delete(songsController.deleteSong);

export default router;