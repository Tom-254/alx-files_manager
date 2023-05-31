import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';
import { BasicAuthenticate, XTokenAuthenticate } from '../middlewares/auth';
import { APIError, ErrorResponse } from '../middlewares/error';

/**
 * Sets routes with their handlers to the given Express application.
 */
const SetRoutes = (app) => {
  app.get('/status', AppController.getStatus);
  app.get('/stats', AppController.getStats);

  app.get('/connect', BasicAuthenticate, AuthController.getConnect);
  app.get('/disconnect', XTokenAuthenticate, AuthController.getDisconnect);

  app.post('/users', UsersController.postNew);
  app.get('/users/me', XTokenAuthenticate, UsersController.getMe);

  app.post('/files', XTokenAuthenticate, FilesController.postUpload);
  app.get('/files/:id', XTokenAuthenticate, FilesController.getShow);
  app.get('/files', XTokenAuthenticate, FilesController.getIndex);
  app.put('/files/:id/publish', XTokenAuthenticate, FilesController.putPublish);
  app.put('/files/:id/unpublish', XTokenAuthenticate, FilesController.putUnpublish);
  app.get('/files/:id/data', FilesController.getFile);

  app.all('*', (req, res, next) => {
    ErrorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });
  app.use(ErrorResponse);
};

export default SetRoutes;
