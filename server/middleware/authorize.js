const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try 
    {
        let token = req.header('authorization');

        if (!token)
        {
            res.status(401).json( {message: 'access denied'} );
            return;
        }

        if (token.startsWith('Bearer'))
        {
            token = token.slice(7, token.length).trimLeft();
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err)
            {
                res.status(403).json( {message: 'access denied'} );
                return;
            }

            req.user = user;
            next();
        });
    }

    catch (error)
    {
        res.status(500).status( {message: error.status} );
    }
};

module.exports = verifyToken;