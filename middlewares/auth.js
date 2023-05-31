import { UserFromXToken, UserFromAuthorization } from '../utils/auth';

/**
 * Applies Basic authentication to a route.
 */
export const BasicAuthenticate = async (req, res, next) => {
  const user = await UserFromAuthorization(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};

/**
 * Applies X-Token authentication to a route.
 */
export const XTokenAuthenticate = async (req, res, next) => {
  const user = await UserFromXToken(req);

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};
