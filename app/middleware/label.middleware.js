const jwtHelper = require("../../utils/jwt");
//Check and validate title
const labelValidate = (req, res, next) => {
    if (!req.body.title) {
      return res.status(400).send({
        message: "Label content can not be empty",
      });
    }
  
    var pattern = new RegExp("(^[a-zA-z]+([\\s][a-zA-Z]+)*$)");
    if (!pattern.test(req.body.title)) {
      return res.status(400).send({
        message: "Label does not contain a valid title name",
      });
    } else {
      next();
    }
  };

  //Verify user for authentication
  const ensureTokenLabel = (req, res, next) => {
    const bearerHeader = req.headers["authorization"] || req.headers.token;
    if (!bearerHeader) {
      res.send("Empty Token.");
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwtHelper.verifyToken(token, (err, data) => {
      if (err) {
        res.send(err);
      }
      req.body.userId = data._id;
      next();
    });
  };
  
  module.exports = { labelValidate, ensureTokenLabel };

