import { uploader } from '../middlewares/uploder';
import {
  getProfileUserController,
  updateFotoProfileController,
  updateProfileController,
} from '../controllers/profile.controller';
import { Router } from 'express';

const profileRouter = Router();

profileRouter.get('/:profile_id', getProfileUserController);
profileRouter.put('/:profile_id', updateProfileController);
profileRouter.put(
  '/foto/:profile_id',
  uploader('IMG', '/images').single('file'),
  updateFotoProfileController,
);

export default profileRouter;
