const { Users } = require('../../models');
const nJwt = require('njwt');

module.exports = async (req, res) => {
    // TODO: urclass의 가이드를 참고하여 GET /accesstokenrequest 구현에 필요한 로직을 작성하세요.
    const { headers: { authorization } } = req;

    if (!authorization) {
        res.status(400).json({ "data": null, "message": "invalid access token" });
    } else {

        const token = authorization.split(' ')[1];
        const { body: { id, userId, email, createdAt, updatedAt } } = nJwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await Users.findOne({
            where: { id: id, userId: userId, email: email, createdAt: createdAt, updatedAt: updatedAt }
        });

        if (!userInfo) {
            res.status(400).json({ "data": null, "message": "access token has been tempered" });
        } else {

            const { dataValues: { id, userId, email, phone, createdAt, updatedAt } } = userInfo;

            res.status(200).json({
                userInfo: {
                    "id": id,
                    "userId": userId,
                    "email": email,
                    "phone": phone,
                    "createdAt": createdAt,
                    "updatedAt": updatedAt
                }
            });
        }
    }
};