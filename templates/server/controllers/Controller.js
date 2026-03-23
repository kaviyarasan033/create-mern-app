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
}

module.exports = Controller;
