import { Router } from 'express';
import * as versesController from './verses.controller';

const router = Router();
router
    .route('/verses')
    .get(versesController.readVerses);

router.
    route('/verses/:verseId').
    get(versesController.readVerseById);
    
router.
    route('/verses').
    post(versesController.createVerse);
    
router.
    route('/verses').
    put(versesController.updateVerse);
    
router.
    route('/verses/:verseId').
    delete(versesController.deleteVerse);

export default router;