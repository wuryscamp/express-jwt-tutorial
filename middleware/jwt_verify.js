'use strict';

const jwt = require('jsonwebtoken');

function jwtVerify(cert){
  return function(req, res, next){

      if(!req.get('Authorization')){
        return res.status(401).send('Invalid token format');
      }

      let authorization = req.get('Authorization');

      // Bearer ex888xxxx
      let authorizationArr = authorization.split(' ');

      if(authorizationArr[0] != 'Bearer'){
        return res.status(401).send('Invalid token format');
      }

      let token = authorizationArr[1];

      jwt.verify(token, cert, (err, decoded) =>{

        //add memberId to request object
        req.memberId = decoded.memberId;
        next();
      });
  };
};

module.exports = jwtVerify;
