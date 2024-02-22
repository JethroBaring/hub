import { getChannels } from '../controllers/channel.controller';
import { Router } from 'express';

const channelRouter: Router = Router();

channelRouter.get('/channels/:id', getChannels);

export default channelRouter;
