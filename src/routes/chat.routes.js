import { Router } from 'express';
import ChatService from '../services/ChatService.js';

const chattingService = new ChatService();

const routes = Router();

routes.get('/', chattingService.getChats);

routes.get('/:phone', chattingService.getChatById);

routes.post('/message/:phone', chattingService.sendMessage);

routes.post('/location/:phone', chattingService.sendLocation);

routes.post('/media/:phone', chattingService.sendMedia);

export default routes;