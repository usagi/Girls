var generate_data = function(){
  var r = { issues: [] };
  var i = {
    title: "Girls",
    challenge_level: 5,
    committers:
    [
      {
        href: "https://github.com/usagi",
        icon: "https://secure.gravatar.com/avatar/dbc8b835bed12dd8194c240139033bc8",
      },
    ],
    tags:
    [
      "Visual Design", "Node.js", "Browser", "CSS", "Gamification",
      "Wonder Rabbit Project",
    ],
    repository: "https://github.com/usagi/Girls",
    message:"Girls(Gamificated Issue-base Real Learning System)の開発者を若干名募集しています。\nこのシステムは現在モックアップを試験的に配置しています。というか今使っているこのシステムです・ｘ・； \nワイヤーフレームレベルのデザインはあるので、これを元に綺麗なデザインとイケてるUI、またシステム本体をモックアップから実装して下さい。",
    from:
    {
      href: "https://github.com/usagi",
      icon: "https://secure.gravatar.com/avatar/dbc8b835bed12dd8194c240139033bc8",
    },
    comments:
    [
      {
        message: "この案件の設計は基本的にはうさぎ先生が行います。実装面での協力者を募集しています・ｘ・",
        from:
        {
          href: "https://github.com/usagi",
          icon: "https://secure.gravatar.com/avatar/dbc8b835bed12dd8194c240139033bc8",
        },
      },
    ],
  };
  var is = r.issues;
  for(var n = 16 - 1; n; --n)
    is.push(i);
  return r;
};

var main = function(){
  console.log('main begin');
  try {
    var g = new wrp.girls;
    g.etc.container_selector = 'body';
    g.etc.data_source = generate_data;
    //g.etc.data_source = {
    //  type: 'GoogleDocs/spreadsheets',
    //  key : '0As7NXUDzM875dHdXeEtSQ3NpLXpKdmFGNk5IR2U2QlE',
    //};
    g.run();
  } catch(e) {
    console.log('main exception: ' + e);
  }
  console.log('main end');
};

//$( main );
google.setOnLoadCallback( main );

