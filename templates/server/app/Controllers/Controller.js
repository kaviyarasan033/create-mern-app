class Controller {
  // Base controller for all application controllers
  sendResponse(res, data, message = 'Success', status = 200) {
    return res.status(status).json({
      success: true,
      message,
      data
    });
  }

  sendError(res, error, status = 500) {
    return res.status(status).json({
      success: false,
      error: error.message || error,
      status
    });
  }
}

module.exports = Controller;
