const CastError = require("mongoose").Error.CastError;

const UserSuccess = require("../successes/UserSuccess");
const UserService = require("../services/UserService");
const CustomError = require("../helpers/CustomError");
const CommonError = require("../errors/CommonError");
const Response = require("../helpers/Response");

exports.profile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserService.profileService(userId.trim());

    Response.success(res, UserSuccess.GetProfile(), user);
  } catch (error) {
    if (error instanceof CustomError)
      return Response.withError(res, error);
    if (error instanceof CastError) {
      error.message = "Güncellenmek istenen sektör id hatalı";
      Object.assign(error, { statusCode: 400 });
      return Response.withError(res, error);
    }
    console.log(error);
    Response.withError(res, CommonError.serverError());
  }
};
