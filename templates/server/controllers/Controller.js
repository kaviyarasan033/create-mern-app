class Controller {
  sendResponse(res, data, message = 'Success', status = 200) {
    res.status(status).json({
      success: true,
      message,
      data
    });
  }

  sendError(res, error, status = 500) {
    const message = error.message || error;
    res.status(status).json({
      success: false,
      message
    });
  }

  notFound(res, message = 'Resource not found') {
    return this.sendError(res, message, 404);
  }

  unauthorized(res, message = 'Unauthorized') {
    return this.sendError(res, message, 401);
  }
}

module.exports = Controller;
