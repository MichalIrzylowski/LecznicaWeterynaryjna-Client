function errorHandler (error, request, response, next) {
  return response.status(error.status || 500).json({
    error: {
      message: error.message || 'Coś poszło nie tak:('
    }
  });
}

export default errorHandler;
