const jwtHelper = require("../../utils/jwt");

class noteValidation {
    validate = (req, res, next) => {
        //check if content is present
        if (!req.body.content) {
            return res.status(400).send({
                message: "Insert something. Note content cannot be empty.",
            });
        }
        //Validating the title
        var regexPattern = new RegExp("^[A-Z]([a-zA-z\\s]+)*$");
        if (!regexPattern.test(req.body.title)) {
            return res.status(400).send({
                message:
                    "Please enter a valid title with first letter capital.",
            });
        }
        else {
            next();
        }
    };

    ensureToken = (req, res, next) => {
        const bearerHeader = req.headers["authorization"];
        if (!bearerHeader) {
            res.send("Token is empty");
        }
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        jwtHelper.verifyToken(token, (err, data) => {
            if (err) {
                res.send(err);
            }
            next();
        });
    };
}

module.exports = new noteValidation();