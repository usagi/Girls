var generate_data = function(){
  wrp.girls.tmp.current_data =
  {
    issues:
    [
      {
        title: "Girls",
        challenge_level: 5,
        photo_keys:
        [
          "[WANTED!]"
        ],
        tags:
        [
          "Visual Design", "Node.js", "Browser", "CSS", "Gamification",
          "Wonder Rabbit Project"
        ],
        repository: "https://github.com/usagi/Girls",
        message:"Girls(Gamificated Issue-base Real Learning System)の開発者を若干名募集しています。このシステムは現在モックアップを試験的に配置しています。というか今使っているこのシステムです・ｘ・； ワイヤーフレームレベルのデザインはあるので、これを元に綺麗なデザインとイケてるUI、またシステム本体をモックアップから実装して下さい。",
        from_key:"usagi@WonderRabbitProject.net",
        commets:
        [
          {
            message: "この案件の設計は基本的にはうさぎ先生が行います。実装面での協力者を募集しています・ｘ・",
            from_key: "usagi@WonderRabbitProject.net"
          }
        ]
      }
    ]
  };
  var a = wrp.girls.tmp.current_data.issues;
  var b = a[0];
  for(var n = 16 - 1; n; --n)
    a.push(b);
};

var main = function(){
  console.log('main begin');
  try {
    generate_data();
    var g = wrp.girls;
    g.etc.container_selector = 'body';
    g.initialize();
    g.invoke();
  } catch(e) {
    console.log('main exception: ' + e);
  }
  console.log('main end');
};

$( main );

