import { Router } from "express";
import GroupService from "../services/GroupService.js";


const routes = Router();

const groupService = new GroupService();

routes.post('/:groupName', groupService.sendMessage);

routes.post('/:groupName/media', groupService.sendMedia);

routes.post('/:groupName/location', groupService.sendLocation);

export default routes;