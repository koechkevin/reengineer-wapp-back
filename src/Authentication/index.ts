import express, { Router } from 'express';
import { sendMessage } from './createUser';

const authentication: Router = express.Router();

authentication.post('/', sendMessage);

export default authentication;
