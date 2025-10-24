const BaseError = require("../errors/base.error");
const tokenService = require("../service/token.service");

module.exports = function (req, res, next) {
  try {
    console.log(req.headers.authorization);
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(BaseError.unAuthorizedError());
    }
    const accessToken = authorization.split(" ")[1];

    if (!accessToken) {
      return next(BaseError.unAuthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(BaseError.unAuthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(BaseError.unAuthorizedError());
  }
};
