const { sign, verify } = require('jsonwebtoken');
const nJwt = require('njwt');

module.exports = (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    console.log("req.cookies.refreshToken:", req.cookies.refreshToken);

    if (!refreshToken) {
        res.status(400).json({ "data": null, "message": "refresh token not provided" });
    } else {
        const token = nJwt.verify(refreshToken, process.env.REFRESH_SECRET);

        const payload = {
            id: token.body.id,
            userId: token.body.userId,
            email: token.body.email,
            phone: token.body.phone,
            createdAt: token.body.createdAt,
        }

        const accessToken = sign({
            id: token.body.id,
            userId: token.body.userId,
            email: token.body.email,
            phone: token.body.phone,
            createdAt: token.body.createdAt,
            iat: Math.floor(Date.now()),
        },
            process.env.ACCESS_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).json({
            accessToken: accessToken,
            userInfo: payload
        });
    }
};
