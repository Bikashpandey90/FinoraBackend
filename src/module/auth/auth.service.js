const fileUploaderService = require("../../services/fileUploader.service");
const UserModel = require("../../user.model");
const bcrypt = require("bcryptjs");

class authService {
  transformUserRegister = async (req) => {
    try {
      let data = req.body;
      console.log("Data Check", req.body);
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
      let file = req.file;
      if (file) {
        data.image = await fileUploaderService.uploadFile(file.path, "/users");
      }
      data.status = "active";
      return data;
    } catch (exception) {
      console.log("Transform User Register", exception);
      throw exception;
    }
  };

  transformUpdateRequest = async (req, data) => {
    try {
      let data = req.body;

      if (req.file) {
        data.image = await fileUploaderService.uploadFile(
          req.file.path,
          "/users",
        );
      } else {
        data.image = data.image;
      }
      return data;
    } catch (exception) {
      console.log("transformUpdateRequest", exception);
      throw exception;
    }
  };

  createUser = async (data) => {
    try {
      console.log("DATA before saving", data);
      const userObj = new UserModel(data);
      return await userObj.save();
    } catch (exception) {
      console.log("Create User", exception);
      throw exception;
    }
  };
  getSingleUserByFilter = async (filter) => {
    try {
      const user = await UserModel.findOne(filter);

      if (!user) {
        throw {
          code: "422",
          status: "USER_NOT_FOUND",
          message: "User not found",
        };
      }
      return user;
    } catch (exception) {
      throw exception;
    }
  };
  getSingleUser = async (filter) => {
    try {
      const user = await UserModel.findOne(filter, {
        password: 0,
      });

      if (!user) {
        throw {
          code: "422",
          status: "USER_NOT_FOUND",
          message: "User not found",
        };
      }
      return user;
    } catch (exception) {
      throw exception;
    }
  };
  getAllUsers = async (filter = {}) => {
    try {
      const users = await UserModel.find(filter);
      if (!users) {
        throw {
          code: "422",
          status: "USER_NOT_FOUND",
          message: "User not found",
        };
      }
      return users;
    } catch (exception) {
      throw exception;
    }
  };

  deleteUser = async (filter = {}) => {
    try {
      const user = await UserModel.findOneAndDelete(filter);
      if (!user) {
        throw {
          code: "422",
          status: "USER_NOT_FOUND",
          message: "User not found",
        };
      }
      return user;
    } catch (exception) {
      throw exception;
    }
  };

  updateByFilter = async (filter, updateData) => {
    try {
      const resp = await UserModel.findOneAndUpdate(filter, {
        $set: updateData,
      });
      return resp;
    } catch (exception) {
      console.log("Update By Filter", exception);
      throw exception;
    }
  };
}
const authSvc = new authService();
module.exports = authSvc;
