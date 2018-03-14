'use strict';

const Membership = require('../model/membership');
const generateToken = require('../jwt/jwt');

const login = function(membershipRepository){
  return function(req, res, next){
    let email = req.body.email;
    let password = req.body.password;

    membershipRepository.findByEmail(email, (err, result) => {
      if(err){
        return res.status(401).send("Invalid username or password");
      }

      if(!result.isValidPassword(password)){
        return res.status(401).send("Invalid username or password");
      }

      generateToken({memberId: result.id}, 60 * 5, (err, token) => {
        if(err){
            return res.status(401).send("Invalid username or password");
        }

        res.json({'accessToken': token});
      });
    });
  }
};

const save = function(membershipRepository){
  return function(req, res, next){
    let body = req.body;
    let member = new Membership(parseInt(body.id), body.firstName, body.lastName, body.email, body.password);
    membershipRepository.save(member, result => {
      res.json(member);
    });
  };
};

const findMemberById = function(membershipRepository){
  return function(req, res, next){
      let id = parseInt(req.params.id);
      membershipRepository.load(id, result => {
        res.json(result);
      });
  };
};

const getMe = function(membershipRepository){
  return function(req, res, next){
    let id = parseInt(req.memberId);
    membershipRepository.load(id, result => {
      res.json(result);
    });
  };
};

module.exports = {
  login: login,
  save: save,
  findMemberById: findMemberById,
  getMe: getMe
};
