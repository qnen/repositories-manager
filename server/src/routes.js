import { Router } from 'express';

import SessionController from './controllers/SessionController.js';
import RepositoryController from './controllers/RepositoryController.js';
import SearchController from './controllers/SearchController.js';

const routes = Router();

routes.post('/sessions', new SessionController().create);

routes.get('/repositories', new RepositoryController().index);
routes.post('/repositories', new RepositoryController().create);
routes.delete('/repositories/:id', new RepositoryController().delete);

routes.post('/search', new SearchController().index);

export default routes;