/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        id: {
            type: 'integer',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

        agreement_accepted: {
            type: 'boolean'
        },

        last_logged_in: {
            type: 'datetime'
        },


        username: {
            type: 'string',
            required: true,
            maxLength: 512
        },

        email: {
            type: 'email',
            required: true,
            maxLength: 100
        },

        emailVerified: {
            type: 'boolean',
            defaultsTo: 0
        },

        first_name: {
            type: 'string',
            required: true,
            maxLength: 30
        },

        last_name: {
            type: 'string',
            required: true,
            maxLength: 30
        },

        password: {
            type: 'string',
            required: true,
            maxLength: 512
        }

    },

    beforeCreate: function (attrs, next) {
        var bcrypt = require('bcrypt');

        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(attrs.password, salt, function (err, hash) {
                if (err) return next(err);

                attrs.password = hash;
                next();
            });
        });
    }
};

