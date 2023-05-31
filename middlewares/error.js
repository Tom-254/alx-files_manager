/* eslint-disable no-unused-vars */

/**
 * A Utility class representing that creates an error representation
 */
export class APIError extends Error {
  constructor(code, message) {
    super();
    this.code = code || 500;
    this.message = message;
  }
}

export const ErrorResponse = (err, req, res) => {
  const defaultMsg = `Failed to process ${req.url}`;

  if (err instanceof APIError) {
    res.status(err.code).json({ error: err.message || defaultMsg });
    return;
  }
  res.status(500).json({
    error: err ? err.message || err.toString() : defaultMsg,
  });
};
