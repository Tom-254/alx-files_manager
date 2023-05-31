import express from 'express';

/**
 * Adds middlewares to the given express application.
 */
const SetMiddlewares = (app) => {
  app.use(express.json({ limit: '200mb' }));
};

export default SetMiddlewares;
