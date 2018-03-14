'use strict';

const jwt = require('jsonwebtoken');

function generateToken(payload, expires, cb){
  jwt.sign(payload, 'secret', {expiresIn: expires}, (err, token) => {
    if(err){
      return cb(err, null);
    }

    return cb(null, token);
  });
}

module.exports = generateToken;
