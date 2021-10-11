module.exports = (req, res, next) => {
    //check if content is present
    if (!req.body.content) {
        return res.status(400).send({ message: "Note: Insert something. Cannot be empty." });
    }
    //validating the title
    var regexPattern = new RegExp("^[A-Z]([a-zA-z\\s]+)*$");
    if (!regexPattern.test(req.body.title)) {
        return res.status(400).send({ message: "Please enter a valid title with first letter capital." });
    }
    else {
        next();
    }
}