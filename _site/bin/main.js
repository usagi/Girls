var main = function() {

};

window.onload = main;

if(typeof wrp === "undefined")
  var wrp = new Object();
  
wrp.girls = new Object();

var f = function(){
  var mongoose = require('mongoose');
  var user = new mongoose.Schema({
    name  : String,
    email : {
      type: String,
      index: { unique: true }
    }
  });

  user.virtual('id').get(function(){
    return this._id.toHexString();
  });

  var crypto = require('crypto');
  console.log(crypto.createHmac('sha1','NaCl').update('hoge').digest('hex'));

  mongoose.connect('mongodb://localhost/test');

  console.log("kitapo");
  
  

  mongoose.disconnect();
};

//f();

main = function(){
  console.log('main begin');
  try{
    console.log(wrp);
  }catch(e){
    console.log('main exception: ' + e);
  }
  console.log('main end');
};

main();

