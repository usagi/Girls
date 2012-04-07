if(typeof wrp === "undefined")
  var wrp = { };

wrp.girls = {

  etc:{
    title: "Girls; Gamificated Issue-base Real Learning System",
    container_selector: null,
    max_issue_rotate_angle_in_degrees: 10,
    mask_duration_in_seconds: 0.200,
  },

  tmp:{
    current_data: null,
    dom: { },
    is_invoked: false,
    mask_duration_in_ms: 0,
  },

  initialize: function(){
    var e = this.etc;
    var t = this.tmp;
    var d = t.dom = { };
    
    t.mask_duration_in_ms = e.mask_duration_in_seconds * 1000;
    
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
        b.append(is)
         .append(d.title)
      );
      
      var dis = t.current_data.issues;
      var f   = 2.0 * e.max_issue_rotate_angle_in_degrees;
      var pt, pl, plm;
      (function(){
        var i = $('<li class="wrp_girls_board_issue" style="display:none;" >&nbsp;</li>');
        is.append(i);
        pt = b.height() - i.height();
        pl = b.width()  - i.width();
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
        
        i0.css(   '-moz-transform', r);
        i0.css('-webkit-transform', r);
        i0.css('top' , ( pt * Math.random() + 32 ) + 'px');
        i0.css('left', ( pl * Math.random() - plm) + 'px');
        i0.click( wrp.girls.show_issue_detail );
        
        is.append(i0);
      }

      (function(){
        var m = d.mask = $('<div id="wrp_girls_mask" class="opacity_000 size_zero"></div>');
        m.css(   '-moz-transition-duration', e.mask_duration_in_seconds + 's');
        m.css('-webkit-transition-duration', e.mask_duration_in_seconds + 's');
        d.container.append(m);
      })();
      
      d.issue_detail = $('<article id="#wrp_girls_issue_detail"></article>');
      d.issue_detail_title = $('<h1 id="wrp_girls_issue_detail_title"></h1>');
      d.issue_detail_level_label = $('<p id="wrp_girls_issue_detail_level_label">Challenge Lavel</p>');
      d.issue_detail_level_stars = $('<div id="wrp_girls_issue_detail_level_stars"></div>');
      d.issue_detail_vertical_splitter = $('<hr id="wrp_girls_issue_detail_vertical_splitter">');

      d.issue_detail_message = $('<div id="wrp_girls_issue_detail_message"></div>');
      d.issue_detail_horizon_splitter = $('<hr id="wrp_girls_issue_detail_horizon_splitter">');
      d.issue_detail_tags = $('<ul id="wrp_girls_issue_detail_tags"></ul>');
      d.issue_detail_repository = $('<a id="wrp_girls_issue_detail_repository" href=""></a>');
      d.issue_detail_repository_image = $('<img src="images/gear.png" alt="repository">');
      d.issue_detail_comitters = $('<ul id="wrp_girls_issue_detail_comitters"></ul>');
      d.issue_detail_comments = $('<ul id="wrp_girls_issue_detail_comments"></ul>');
      
      d.issue_detail.append(d.issue_detail_title)
                    .append(d.issue_detail_level_label)
                    .append(d.issue_detail_level_stars)
                    .append(d.issue_detail_vertical_splitter)
                    .append(d.issue_detail_message)
                    .append(d.issue_detail_horizon_splitter)
                    .append(d.issue_detail_tags)
                    .append(d.issue_detail_repository.append(d.issue_detail_repository_image))
                    .append(d.issue_detail_comitters)
                    .append(d.issue_detail_comments)
                    ;


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
    var t = wrp.girls.tmp;
    var d = t.dom;
    var m = d.mask;
    if(typeof m !== "object")
      throw "wrp.girls.unmask; mask is not available";
    m.attr('class', 'opacity_000');
    setTimeout(function(){
      console.log(d, m);
      m.attr('class','size_zero');
    }, t.mask_duration_in_ms);
  },

  show_issue_detail: function(e){
    var o = $('#' + (e.currentTarget.id));
    var g = wrp.girls;
    g.append_to_issues(o);
    g.mask();
  },
  
  dragstart: function(e){
    var tid = e.target.id;
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        id: tid,
        start_position: { x:e.x, y:e.y },
      })
    );
  },
  
  drop: function(e){
    var d = JSON.parse( e.dataTransfer.getData("application/json") );
    var o = $('#' + d.id);
    
    wrp.girls.append_to_issues(o);

    var p0 = d.start_position;
    var dx = e.x - p0.x;
    var dy = e.y - p0.y;
    
    var p = o.position();
      
    o.css('left', (p.left + dx) + 'px');
    o.css('top' , (p.top  + dy) + 'px');
    
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

