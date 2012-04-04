window.onload = main;

var main = function(){
  console.log('main begin');
  try{
    console.log(wrp);
  }catch(e){
    console.log('main exception: ' + e);
  }
  console.log('main end');
};

window.onload = main();

