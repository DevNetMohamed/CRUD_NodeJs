const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(422).json({
      status: "fail",
      mas: "You are not logged in",
    });
  }
  try {
    // console.log(authorization);

    let decoded = jwt.verify(authorization, process.env.SECRET);
    // console.log(decoded);
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "You are not authenticated",
    });
  }
};

// Middleware Autherization
exports.restrictTO = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      res.status(401).json({
        status: "Not Found",
        message: "You Do not Have Permision",
      });
    } else {
      next();
    }
  };
};
