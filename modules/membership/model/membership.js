'use strict';

function Membership(id, firstName, lastName, email, password){
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.password = password;
}

Membership.prototype.isValidPassword = function(password){
  return this.password == password
}

module.exports = Membership;
