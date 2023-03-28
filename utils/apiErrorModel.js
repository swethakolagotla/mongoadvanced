class ApiErrorModel extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode;
    this.status = statusCode.startsWith("4")
      ? "please check your request"
      : "server error";
    this.applicationError = true;
    Error.captureStackTrace(this);
  }
}
export default ApiErrorModel;
