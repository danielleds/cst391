import { Router } from 'express';
import * as SermonsController from './sermons.controller';

const router = Router();
router
    .route('/sermons')
    .get(SermonsController.readSermons);

router.
    route('/sermons/:sermonId').
    get(SermonsController.readSermonById);
    
router.
    route('/sermons').
    post(SermonsController.createSermon);
    
router.
    route('/sermons').
    put(SermonsController.updateSermon);
    
router.
    route('/sermons/:sermonId').
    delete(SermonsController.deleteSermon);

export default router;