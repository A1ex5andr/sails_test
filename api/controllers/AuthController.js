/**
 * AuthController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    login: function (req, res) {
        var userName = req.body.username,
                userPassword = req.body.password,
                bcrypt = require('bcrypt'),
                jwt = require('jsonwebtoken');

        Users.findOne({username: userName},
                function (err, user) {
                    if (err) return res.json(500, {error: err});

                    if (user) {
                        bcrypt.compare(userPassword, user.password, function (err, result) {
                            if (err) return res.json(500, {error: err});
                            if (result == false) return res.json(401);

                            var profile = {
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email,
                                id: user.id
                            };

                            var token = jwt.sign(profile, user.password, {expiresInMinutes: 60 * 24});
                            return res.json(200, {token: token});
                        });
                    } else {
                        return res.status(401).json({error: 'Не правильный логин/пароль'});
                    }
                });
    },

    estateCase: function(req, res){
        return res.send([{estateCaseId: 204}]);
    }

};

