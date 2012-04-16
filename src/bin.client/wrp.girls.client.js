if(typeof wrp === "undefined")
  var wrp = { };

wrp.girls = (function(){
  
  var constractor = function() {
    var proc_length = this.proc.length;

    this.etc = {
      title: "Girls; Gamificated Issue-base Real Learning System",
      container_selector: null,
      data_source: null,
      max_issue_rotate_angle_in_degrees: 10,
    };

    this.tmp = {
      current_data: null,
      dom: { },
      is_invoked: false,
      mask_duration_in_seconds: 0,
      mask_duration_in_ms: 0,
      issues_width: 0,
      issue_width: 0,
      show_detail: false,
      phase: 0,
      proc_key: proc_length, 
    };
    
    this.proc[proc_length] = this;
  };
  
  var p = constractor.prototype;
  
  p.proc = [];
  
  p.run = function() {
    var t = this.tmp;
    switch (t.phase) {
      case 0:
        this.load_data_source();
        break;
      case 10:
      case 30:
        this.creation();
        break;
      case 100:
        t.phase = 1000;
        break;
      default:
        throw 'wrp.girls.run: unkown phase; ' + t.phase;
    }
    
    if (t.phase < 1000)
      this.run();
  };
  
  p.load_data_source = function() {
    this.tmp.phase = 1;
    var s = this.etc.data_source;
    switch(typeof s){
      case typeof function(){}:
        this.load_data_source_from_function(s);
        break;
      case typeof {}:
        if(s.type === 'GoogleDocs/spreadsheets')
          this.load_data_source_from_GoogleDocs_spreadsheets(s.key);
        break;
    }
  };
  
  p.load_data_source_from_function = function(f){
    var t = this.tmp;
    t.phase = 10;
    t.current_data = f();
  };
  
  p.load_data_source_from_GoogleDocs_spreadsheets = function(k) {
    this.tmp.phase = 20;
    var q = new google.visualization.Query('http://spreadsheets.google.com/tq?key='+k);
    q.send(this.load_data_source_from_GoogleDocs_spreadsheets_callback);
  };
  
  p.load_data_source_from_GoogleDocs_spreadsheets_callback = function(r) {
    var t = this.tmp;
    t.phase = 30;
    
    var d = { issues: [] };
    var is = d.issues;
    
    var i = {
      title: '',
      challenge_level: 0,
      repository: '',
      message: '',
      from: { href: '', icon: '' },
      committers: [ { href: '', icon: '' } ],
      tags: [ '' ],
      comments: [ { message: '', from: { href: '', icon: ''} } ],
    };
    
    is.push(i);
    
    t.current_data = d;
    
    this.run();
  };
  
  p.creation = function() {
    this.tmp.phase = 100;
    
    var e = this.etc;
    var t = this.tmp;
    var d = t.dom = { };

    if(typeof e.title === "string")
      $('title').text(e.title);
    
    var c = this.tmp.dom.container = $(e.container_selector);
    if(typeof c !== "object")
      throw "Girls cannot get container";
      
    c.attr('id', 'wrp_girls');
    c.empty();
    
    (function(){
      d.title = $('<h1 id="wrp_girls_board_title">' + e.title + '</h1>');
      var b  = d.board  = $('<div id="wrp_girls_board"></div>');
      var is = d.issues = $('<ul id="wrp_girls_board_issues" dropzone="move"><ul>');
      is.attr('ondragover', 'event.preventDefault()');
      is.attr('ondrop'    , "wrp.girls.prototype.proc['" + t.proc_key + "'].drop(event)");
      
      c.append(
        b.append(d.title)
         .append(is)
      );
      
      (function(){
        var td = b.css('transition-duration');
        if (typeof td !== 'string' || td.length === 0)
          td = b.css('-moz-transition-duration');
        if (typeof td !== 'string' || td.length === 0)
          td = b.css('-webkit-transition-duration');
        if (typeof td !== 'string' || td.length === 0)
          t.mask_duration_in_seconds = 0;
        else
          t.mask_duration_in_seconds = Number(td.match(/[0-9.]+/)[0]);
      })();
      
      t.mask_duration_in_ms = t.mask_duration_in_seconds * 1000;
      
      t.issues_width = is.width();
      
      var dis = t.current_data.issues;
      var f   = 2.0 * e.max_issue_rotate_angle_in_degrees;
      var pt, pl, plm;
      (function(){
        var i = $('<li class="wrp_girls_board_issue" style="display:none;" >&nbsp;</li>');
        is.append(i);
        var iw = t.issue_width = i.width();
        pt = b.height() - i.height();
        pl = b.width()  - iw;
        plm = pl * 0.1;
        pl *= 1.2;
        is.empty();
      })();
      
      for(var key in dis){
        var id = 'id="wrp_girls_board_issue_' + key + '"';
        var i0 = $('<a ' + id + ' href="javascript:void(0)" draggable="true" class="graggable"></a>');
        i0.attr('ondragstart', "wrp.girls.prototype.proc['" + t.proc_key + "'].dragstart(event)");
        i0.attr('ondragover' , 'event.preventDefault()');
        i0.attr('ondrop'     , 'event.preventDefault()');
        var i1 = $('<li class="wrp_girls_board_issue"></li>');
        var i2 = $('<article></article>');
        var i3 = $('<h1>' + dis[key].title + '</h1>');
        var i4 = $('<img src="images/pin.png" alt="issue_pin" class="pin" draggable="false">');
        var i5 = $('<img src="images/gear.png" alt="issue_icon" class="icon" draggable="false">');
        
        i0.append(
          i1.append(
            i2.append(i3)
              .append(i4)
              .append(i5)
          )
        )
        
        var r = 'rotate(' + (Math.random() - 0.5) * f + 'deg)';
        
        i0.css(        'transform', r);
        i0.css(   '-moz-transform', r);
        i0.css('-webkit-transform', r);
        i0.css('top' , ( pt * Math.random() + 32 ) + 'px');
        i0.css('left', ( pl * Math.random() - plm) + 'px');
        i0.click( function(){wrp.girls.prototype.proc[t.proc_key].show_issue_detail(event);} );
        
        is.append(i0);
      }

      (function(){
        var m = d.mask = $('<div id="wrp_girls_mask" class="opacity_000 size_zero"></div>');
        m.click( function(){wrp.girls.prototype.proc[t.proc_key].unmask();} );
        c.append(m);
      })();
      
      var id = d.issue_detail = $('<div id="wrp_girls_issue_detail"></div>');
      d.issue_detail_title = $('<h1 id="wrp_girls_issue_detail_title"></h1>');
      d.issue_detail_level_label = $('<p id="wrp_girls_issue_detail_level_label">Challenge Lavel</p>');
      d.issue_detail_level_stars = $('<div id="wrp_girls_issue_detail_level_stars"></div>');
      d.issue_detail_vertical_splitter = $('<hr id="wrp_girls_issue_detail_vertical_splitter">');

      d.issue_detail_message = $('<div id="wrp_girls_issue_detail_message"></div>');
      d.issue_detail_from_label = $('<p id="wrp_girls_issue_detail_from_label">Issue From:<p>');
      d.issue_detail_from_anchor =
        $('<a href="" id="wrp_girls_issue_detail_from" title="anchor of issue from"></a>');
      d.issue_detail_from_image = $('<img src="" alt="icon of issue from"/>');
      d.issue_detail_horizon_splitter = $('<hr id="wrp_girls_issue_detail_horizon_splitter">');
      d.issue_detail_tags = $('<ul id="wrp_girls_issue_detail_tags"></ul>');
      d.issue_detail_repository = $('<a id="wrp_girls_issue_detail_repository" href=""></a>');
      d.issue_detail_repository_image = $('<img src="images/gear.png" alt="repository">');
      d.issue_detail_committers = $('<ul id="wrp_girls_issue_detail_committers"></ul>');
      d.issue_detail_comments = $('<ul id="wrp_girls_issue_detail_comments"></ul>');
      
      id.append(d.issue_detail_title)
        .append(d.issue_detail_level_label)
        .append(d.issue_detail_level_stars)
        .append(d.issue_detail_vertical_splitter)
        .append(d.issue_detail_message)
        .append(d.issue_detail_from_label)
        .append(d.issue_detail_from_anchor
          .append(d.issue_detail_from_image)
        )
        .append(d.issue_detail_horizon_splitter)
        .append(d.issue_detail_tags)
        .append(d.issue_detail_repository
          .append(d.issue_detail_repository_image)
        )
        .append(d.issue_detail_committers)
        .append(d.issue_detail_comments)
        ;
      
      id.attr('class', 'display_none in');

      c.append(d.issue_detail);
    })();

  };
  
  p.mask = function(){
    var d = this.tmp.dom;
    var m = d.mask;
    m.attr('class', 'opactiry_000 size_max');
    setTimeout(function(){
      m.attr('class', 'opacity_080');
    }, 0);
  };
  
  p.unmask = function(proc_key){
    var t = this.tmp;
    if(t.show_detail) {
      this.unshow_issue_detail(t.proc_key);
      return;
    }
    var d = t.dom;
    var m = d.mask;
    if(typeof m !== "object")
      throw "wrp.girls.unmask; mask is not available";
    m.attr('class', 'opacity_000');
    setTimeout(function(){
      m.attr('class','opacity_000 size_zero');
    }, t.mask_duration_in_ms);
  };
  
  p.unshow_issue_detail = function(proc_key){
    var t = this.tmp;
    t.show_detail_body = true;
    t.dom.issue_detail.attr('class', 'out');
    setTimeout(function(){
      var me = wrp.girls.prototype.proc[proc_key];
      me.tmp.show_detail = false;
      me.tmp.dom.issue_detail.attr('class', 'display_none in');
      me.unmask();
    }, t.mask_duration_in_ms);
  };

  p.show_issue_detail = function(e){
    var tid = e.currentTarget.id;
    var o = $('#' + tid);
    this.append_to_issues(o);
    this.mask();
    
    var t = this.tmp;
    var d = t.dom;
    
    var i = (function(){
      var is = t.current_data.issues;
      var n = Number(tid.match(/[0-9]$/)[0]);
      return is[n];
    })();
    
    d.issue_detail_title.html(i.title);
    
    (function(){
      var a = d.issue_detail_level_stars
      a.empty();
      for(var c = i.challenge_level; c; --c)
        a.append('<img src="images/star.png"/>');
    })();
    
    (function(){
      var a = d.issue_detail_message;
      var ps = i.message.split("\n");
      for (var k in ps)
        a.append('<p>' + ps[k] + '</p>');
    })();
    
    (function(){
      var f = i.from;
      d.issue_detail_from_anchor.attr('href', f.href);
      d.issue_detail_from_image.attr('src', f.icon);
    })();
    
    (function(){
      var a = d.issue_detail_tags
      a.empty();
      var ts = i.tags;
      for(var k in ts)
        a.append('<li>' + ts[k] + '</li>');
    })();
    
    d.issue_detail_repository.attr('href', i.repository);
    d.issue_detail_repository_image.attr('src', 'images/gear.png');
    
    (function(i){
      var a = d.issue_detail_committers;
      a.empty();
      var cs = i.committers;
      for(var k in cs){
        var i = cs[k];
        a.append('<li><a href="' + i.href + '"><img src="' + i.icon + '"/></a></li>');
      }
    })(i);
    
    (function(){
      var a = d.issue_detail_comments
      a.empty();
      var cs = i.comments;
      for(var k in cs){
        var v = cs[k];
        var f = v.from;
        var el = $('<li></li>');
        var ef = $(
          '<a href="' + f.href + 
          '"><img src="' + f.icon + 
          '" alt="icon of comment from"/></a>'
        );
        var ep = $('<p>' + v.message + '</p>');
        a.append(
          el.append(ef)
            .append(ep)
        );
      }
    })();
    
    var id = d.issue_detail;
    
    id.attr('class', 'in');
    
    setTimeout(function(){
      if( ! t.dom.mask.attr('class').match(/opacity_080/) )
        return;
      t.show_detail = true;
      id.attr('class', '');
    }, t.mask_duration_in_ms);
  };
  
  p.dragstart = function(e){
    var tid = e.target.id;
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        id: tid,
        start_position: { x:e.pageX, y:e.pageY },
      })
    );
  };
  
  p.drop = function(e){
    var d = JSON.parse( e.dataTransfer.getData("application/json") );
    var o = $('#' + d.id);
    this.append_to_issues(o);

    var p0 = d.start_position;
    var dx = e.pageX - p0.x;
    var dy = e.pageY - p0.y;
    
    var p = o.position();
    var t = this.tmp;
    var h = t.issue_width * 0.5;
    
    var new_x = Math.min(t.issues_width - h, Math.max(-h, p.left + dx) );
    var new_y = Math.max(0, p.top  + dy);

    o.css('left', new_x + 'px');
    o.css('top' , new_y + 'px');

    e.preventDefault();
  };

  p.append_to_issues = function(o){
    this.tmp.dom.issues.append(o);
  };
  
  return constractor;
})();

