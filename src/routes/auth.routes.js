import { Router } from 'express';
import AuthService from '../services/AuthService.js';

const authService = new AuthService();

const routes = Router();

routes.get('/', authService.getQrCode);

export default routes;