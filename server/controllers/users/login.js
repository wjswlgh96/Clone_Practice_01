const { Users } = require('../../models');
const { sign } = require('jsonwebtoken');
require("dotenv").config();

module.exports = async (req, res) => {
    const userInfo = await Users.findOne({
        where: { userId: req.body.userId, password: req.body.password }
    });

    if (!userInfo) {
        //* 로그인 실패
        res.status(200).send("로그인에 실패하였습니다.");
    } else {
        //* 로그인 성공
        const { dataValues: { id, userId, email, phone, createdAt, updatedAt } } = userInfo;
        const accessToken = sign({
            id: id,
            userId: userId,
            email: email,
            phone: phone,
            createdAt: createdAt,
            updatedAt: updatedAt,
            iat: Math.floor(Date.now()),
        },
            process.env.ACCESS_SECRET, {
            expiresIn: '15s',
        });

        const refreshToken = sign({
            userId: userId,
            email: email,
            phone: phone,
            createdAt: createdAt,
            iat: Math.floor(Date.now()),
        },
            process.env.REFRESH_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        });

        res.status(200).json({ accessToken: accessToken });
    }
}