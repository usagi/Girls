var mongoose = require('mongoose');
var schema = mongoose.Scgena;

var test_schema = new schema({
  name: String,
  value: Number,
});

mongoose.model('test', test_schema);

var test = new mongoose.model('test');
test.name = 'soy souce';
test.value = 123.456;
test.save();
  
