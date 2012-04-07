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
      var is = d.issues = $('<ul id="wrp_girls_board_issues"><ul>');
      
      c.append(
        b.append(d.title)
         .append(is)
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
        var i0 = $('<a href="javascript:void(0)"></a>');
        var i1 = $('<li id="wrp_girls_board_issue_' + key + '" class="wrp_girls_board_issue"></li>');
        var i2 = $('<article></article>');
        var i3 = $('<h1>' + dis[key].title + '</h1>');
        var i4 = $('<img src="images/pin.png" alt="issue_pin" class="pin">');
        var i5 = $('<img src="images/gear.png" alt="issue_icon" class="icon">');
        
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

  show_issue_detail: function(){
    wrp.girls.mask();
  },

  invoke: function(){
    if(this.tmp.is_invoked)
      throw "Girls was invoked";
    this.tmp.is_invoked = true;
  },
  
};

