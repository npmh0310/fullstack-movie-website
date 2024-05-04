const responseWithDate = (res, statusCode, data) =>
  res.status(statusCode).json(data);

const error = (res) =>
  responseWithDate(res, 500, {
    status: 500,
    message: "Oops! Something went wrong",
  });

const badrequest = (res, message) =>
  responseWithDate(res, 400, {
    status: 400,
    message,
  });

const ok = (res, data) => responseWithDate(res, 200, data);

const created = (res, data) => responseWithDate(res, 201, data);

const unauthorize = (res) =>
  responseWithDate(res, 401, {
    status: 401,
    message: "Unathorized",
  });

const notfound = (res) =>
  responseWithDate(res, 404, {
    status: 404,
    message: "resource not found",
  });

export default {
  responseWithDate,
  error,
  badrequest,
  ok,
  created,
  unauthorize,
  notfound,
  unauthorize,
};
