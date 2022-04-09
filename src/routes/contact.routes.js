import { Router } from "express";
import ContactService from "../services/ContactService.js";

const routes = Router();

const contactService = new ContactService;

routes.get('/', contactService.getContacts);

routes.get('/:phone', contactService.getContactById);

routes.get('/:phone/profile_picture', contactService.getProfilePicUrl);

routes.get('/:phone/is_registered', contactService.isRegisteredUser);

export default routes;