const authSvc = require("./auth.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class authController {
  login = async (req, res, next) => {
    try {
      const data = req.body;
      const user = await authSvc.getSingleUserByFilter({
        email: data.email,
      });
      if (user.status !== "active") {
        throw {
          code: 401,
          message: "User is not active",
          status: "USER_NOT_ACTIVE",
        };
      }
      if (bcrypt.compareSync(data.password, user.password)) {
        let accessToken = jwt.sign(
          {
            sub: user._id,
            typ: "bearer",
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "5d",
          },
        );
        let refreshToken = jwt.sign(
          {
            sub: user._id,
            typ: "refresh",
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "30d",
          },
        );
        res.json({
          detail: {
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          },
          message: "User Login Success",
          status: "LOGIN_SUCCESS",
          options: null,
        });
      } else {
        throw {
          code: 401,
          message: "Invalid Password",
          status: "INVALID_PASSWORD",
        };
      }
    } catch (exception) {
      console.log("Login exception : ", exception);
      next(exception);
    }
  };

  profile = async (req, res, next) => {
    try {
      console.log(req.authUser);
      res.json({
        detail: req.authUser,
        message: "Your Profile",
        status: "YOUR_PROFILE",
        options: null,
      });
    } catch (exception) {
      console.log("Profile exception : ", exception);
      next(exception);
    }
  };

  list = async (req, res, next) => {
    try {
      const response = await authSvc.getAllUsers();
      res.json({
        detail: response,
        message: "USERS LIST",
        status: "USERS_LIST",
        options: null,
      });
    } catch (exception) {
      console.log("list exception : ", exception);
      next(exception);
    }
  };

  add = async (req, res, next) => {
    try {
      console.log("First check", req.body);
      let data = await authSvc.transformUserRegister(req);
      const user = await authSvc.createUser(data);

      res.json({
        data: user,
        message: "User registered successfully",
        status: "USER_REGISTERED",
        options: null,
      });
    } catch (exception) {
      console.log("Add Exception: ", exception);
      next(exception);
    }
  };
  detail = async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await authSvc.getSingleUser({ _id: id });
      res.json({
        detail: response,
        message: "USER Fetch success",
        status: "USERS_DATA",
        options: null,
      });
    } catch (exception) {
      console.log("list exception : ", exception);
      next(exception);
    }
  };

  delete = async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await authSvc.deleteUser({ _id: id });
      res.json({
        detail: response,
        message: "USER Delete Sucess",
        status: "DELETE_SUCESS",
        options: null,
      });
    } catch (exception) {
      console.log("Delete Exception : ", exception);
      next(exception);
    }
  };
  update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await authSvc.getSingleUserByFilter({
        _id: id,
      });
      const transformData = await authSvc.transformUpdateRequest(req, data);

      const response = await authSvc.updateByFilter(
        {
          _id: req.params.id,
        },
        transformData,
      );
      res.json({
        detail: {},
        message: "USER Update Sucess",
        status: "UPDATE_SUCESS",
        options: null,
      });
    } catch (exception) {
      console.log("Delete Exception : ", exception);
      next(exception);
    }
  };
}
const authCtrl = new authController();
module.exports = authCtrl;
