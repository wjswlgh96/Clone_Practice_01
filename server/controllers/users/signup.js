const { Users } = require('../../models');

// 새로운 회원가입 정보를 만들어주는 컨트롤러
module.exports = async (req, res) => {

    const userInfo = await Users.findOne({
        where: { userId: req.body.userId }
    });

    if (!userInfo) {
        Users.create({
            userId: req.body.userId,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
        });

        res.status(200).send("Success");
    } else {

        res.status(200).send("Fail");
    }
}