if(typeof wrp === "undefined")
  var wrp = { };

wrp.girls = { };

wrp.girls.etc = {
  title: "Girls; Gamificated Issue-base Real Learning System",
  container_selector: null,
};

wrp.girls.tmp = { };

wrp.girls.var = {
  current_data: null,
  dom: { },
  is_invoked: false,
};

wrp.girls.initialize = function(){
  this.var.dom = { };
  this.var.dom.container = $(this.etc.container_selector);
  if(typeof this.var.dom.container !== "object")
    throw "Girls cannot get container";
  $('title').text(this.etc.title);
  this.var.dom.container.empty();
  this.var.dom.container.attr('id','wrp_girls');
  this.var.dom.board = $('<div id="wrp_girls_board"></div>');
  this.var.dom.title = $('<h1 id="wrp_girls_board_title">' + this.etc.title + '</h1>');
  this.var.dom.issues = $('<ul id="wrp_girls_board_issues"><ul>');
  for(var key in this.var.current_data.issues){
    var dom = $(
      '<a href="javascript:void(0)"><li id="wrp_girls_board_issue.' + key + 
      '" class="wrp_girls_board_issue">' +
      '<article><h1>' + this.var.current_data.issues[key].title +
      '</h1><img src="images/gear.png" alt="issue_image"></article></li></a>'
    );
    var r = Math.random() * 20.0 - 10.0;
    if(r < 0)
      r += 360.0;
    dom.css('-moz-transform','rotate(' + r + 'deg)');
    dom.css('-webkit-transform','rotate(' + r + 'deg)');
    dom.css('top', (Math.random() * 268 * 0.9 + 10) + 'px');
    dom.css('left', (Math.random() * 390 * 0.9 + 10) + 'px');
    dom.onClick = function(){ console.log("click"); };
    this.var.dom.issues.append(dom);
  }
  this.var.dom.container.append( this.var.dom.board );
  this.var.dom.board.append( this.var.dom.title );
  this.var.dom.board.append( this.var.dom.issues );
};

wrp.girls.invoke = function(){
  if(this.var.is_invoked)
    throw "Girls was invoked";
  this.var.is_invoked = true;
};

