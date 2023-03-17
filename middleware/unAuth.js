const unAuth = async (req, res, next) => {
    try {
        if (req.cookies.authorization === undefined) {
            // to pass the action to next thing
            next();
        } else {
            res.status(404).send("no page are here");
        }
    } catch (error) {
        res.status(404).send("no page are here");
        console.log(error);
    }
};

module.exports = unAuth;
