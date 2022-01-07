import { Router } from 'express';

import SessionController from './controllers/SessionController.js';
import RepositoryController from './controllers/RepositoryController.js';
import SearchController from './controllers/SearchController.js';

import AuthMiddleware from './middlewares/AuthMiddleware.js';

const routes = Router();

routes.post('/sessions', new SessionController().create);

routes.get('/repositories', new RepositoryController().index);
routes.post('/repositories', new AuthMiddleware().auth, new RepositoryController().create);
routes.delete('/repositories/:id', new AuthMiddleware().auth, new RepositoryController().delete);

routes.post('/search', new SearchController().index);

export default routes;