'use strict';

function MembershipRepository(db){
  this.db = db;
}

MembershipRepository.prototype.save = function(m, cb){
  this.db.set(m.id, m);
  cb(m);
}

MembershipRepository.prototype.load = function(id, cb){
  let result = this.db.get(id);
  cb(result);
}

MembershipRepository.prototype.findByEmail = function(email, cb){
  let member;
  for(let value of this.db.values()) {
    if(value.email == email){
      member = value;
      break;
    }
  }

  if(member != null){
    cb(null, member);
  }else{
    cb('member not found', null);
  }

}

module.exports = MembershipRepository;
