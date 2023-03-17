const jwt = require("jsonwebtoken");

// to add sensor
// user push a sensor => go to auth middleware ==> (next()) ==> sensor added
//                                                  else    ==> no thing will happem

// next mean ===>  do something when we move to next thing
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.authorization;
        if (token) {
            // if token less than 500 it's our authintcation
            // else will be google authintcation
            const isCustomAuth = token.length < 500;

            let decodedData;

            // check is token are exist or not
            // and check is our custom authintcation or not
            if (token && isCustomAuth) {
                // get the data by token {username, id}
                const jwtKey = process.env.JWT_API_TOKEN;
                decodedData = jwt.verify(token, jwtKey);

                // send id to request [ we create property in request to save id]
                req.userId = decodedData?.id;
            }
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

module.exports = auth;
