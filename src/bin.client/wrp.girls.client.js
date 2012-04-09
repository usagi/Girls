if(typeof wrp === "undefined")
  var wrp = { };

wrp.girls = {

  etc:{
    title: "Girls; Gamificated Issue-base Real Learning System",
    container_selector: null,
    max_issue_rotate_angle_in_degrees: 10,
  },

  tmp:{
    current_data: null,
    dom: { },
    is_invoked: false,
    mask_duration_in_seconds: 0,
    mask_duration_in_ms: 0,
    issues_width: 0,
    issue_width: 0,
    show_detail: false,
  },

  initialize: function(){
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
      is.attr('ondrop'    , 'wrp.girls.drop(event)');
      
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
        i0.attr('ondragstart', 'wrp.girls.dragstart(event)');
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
        i0.click( wrp.girls.show_issue_detail );
        
        is.append(i0);
      }

      (function(){
        var m = d.mask = $('<div id="wrp_girls_mask" class="opacity_000 size_zero"></div>');
        //m.css(        'transition-duration', t.mask_duration_in_seconds + 's');
        //m.css(   '-moz-transition-duration', t.mask_duration_in_seconds + 's');
        //m.css('-webkit-transition-duration', t.mask_duration_in_seconds + 's');
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

  },
  
  mask: function(){
    var d = this.tmp.dom;
    var m = d.mask;
    m.attr('class', 'opactiry_000 size_max');
    setTimeout(function(){
      m.attr('class', 'opacity_080');
      m.click( wrp.girls.unmask );
    }, 0);
  },
  
  unmask: function(){
    var g = wrp.girls;
    var t = g.tmp;
    
    if(t.show_detail) {
      g.unshow_issue_detail();
      setTimeout(arguments.callee, t.mask_duration);
      return;
    }
    
    var d = t.dom;
    var m = d.mask;
    if(typeof m !== "object")
      throw "wrp.girls.unmask; mask is not available";
    m.attr('class', 'opacity_000');
    setTimeout(function(){
      m.attr('class','size_zero');
    }, t.mask_duration_in_ms);
  },
  
  unshow_issue_detail: function(){
    var t = wrp.girls.tmp;
    var id = t.dom.issue_detail;
    t.show_detail_body = true;
    id.attr('class', 'out');
    setTimeout(function(){
      t.show_detail = false;
      id.attr('class', 'display_none in');
    }, t.mask_duration_in_ms);
  },

  show_issue_detail: function(e){
    var tid = e.currentTarget.id;
    var o = $('#' + tid);
    var g = wrp.girls;
    g.append_to_issues(o);
    g.mask();
    
    var t = g.tmp;
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
      t.show_detail = true;
      id.attr('class', '');
    }, t.mask_duration_in_ms);
  },
  
  dragstart: function(e){
    var tid = e.target.id;
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        id: tid,
        start_position: { x:e.pageX, y:e.pageY },
      })
    );
  },
  
  drop: function(e){
    var g = wrp.girls;

    var d = JSON.parse( e.dataTransfer.getData("application/json") );
    var o = $('#' + d.id);
    g.append_to_issues(o);

    var p0 = d.start_position;
    var dx = e.pageX - p0.x;
    var dy = e.pageY - p0.y;
    
    var p = o.position();
    var t = g.tmp;
    var h = t.issue_width * 0.5;
    
    var new_x = Math.min(t.issues_width - h, Math.max(-h, p.left + dx) );
    var new_y = Math.max(0, p.top  + dy);

    o.css('left', new_x + 'px');
    o.css('top' , new_y + 'px');

    e.preventDefault();
  },

  append_to_issues: function(o){
    wrp.girls.tmp.dom.issues.append(o);
  },

  invoke: function(){
    var t = this.tmp;
    if(t.is_invoked)
      throw "Girls was invoked";
    t.is_invoked = true;
  },
  
};

