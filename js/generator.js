/* Old Twitter - Tweet Generator */

var TweetGenerator = (function() {

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // 重み付きランダム選択
  function weightedPick(weights) {
    var total = 0;
    var keys = Object.keys(weights);
    for (var i = 0; i < keys.length; i++) {
      total += weights[keys[i]];
    }
    var r = Math.random() * total;
    var sum = 0;
    for (var i = 0; i < keys.length; i++) {
      sum += weights[keys[i]];
      if (r < sum) return keys[i];
    }
    return keys[keys.length - 1];
  }

  // エピソード番号生成（1〜24話）
  function randomEpisode() {
    return (Math.floor(Math.random() * 24) + 1) + "";
  }

  // テンプレート内のプレースホルダーを置換
  function fillTemplate(template, user) {
    var result = template;

    result = result.replace(/\{place\}/g, function() { return pick(VOCAB.places); });
    result = result.replace(/\{food\}/g, function() { return pick(VOCAB.foods); });
    result = result.replace(/\{activity\}/g, function() { return pick(VOCAB.activities); });
    result = result.replace(/\{weather\}/g, function() { return pick(VOCAB.weather); });
    result = result.replace(/\{anime\}/g, function() { return pick(VOCAB.anime); });
    result = result.replace(/\{character\}/g, function() { return pick(VOCAB.characters); });
    result = result.replace(/\{feeling\}/g, function() { return pick(VOCAB.feelings); });
    result = result.replace(/\{song\}/g, function() { return pick(VOCAB.songs); });
    result = result.replace(/\{wisdom\}/g, function() { return pick(VOCAB.wisdom); });
    result = result.replace(/\{episode\}/g, function() { return randomEpisode(); });
    result = result.replace(/\{subject\}/g, function() { return pick(VOCAB.subjects); });
    result = result.replace(/\{professor\}/g, function() { return pick(VOCAB.professors); });
    result = result.replace(/\{drink\}/g, function() { return pick(VOCAB.drinks); });
    result = result.replace(/\{company\}/g, function() { return pick(VOCAB.companies); });
    result = result.replace(/\{game\}/g, function() { return pick(VOCAB.games); });
    result = result.replace(/\{tv_show\}/g, function() { return pick(VOCAB.tv_shows); });
    result = result.replace(/\{vocaloid_producer\}/g, function() { return pick(VOCAB.vocaloid_producers); });

    // リプライ先: 自分以外のユーザーをランダム選択
    result = result.replace(/\{mention\}/g, function() {
      var others = USERS.filter(function(u) { return u.screen !== user.screen; });
      return pick(others).screen;
    });

    return result;
  }

  // ダミーの RT / Fav カウント生成
  function randomCounts() {
    var rt = 0;
    var fav = 0;
    var r = Math.random();
    if (r > 0.7) {
      rt = Math.floor(Math.random() * 5);
      fav = Math.floor(Math.random() * 10);
    }
    if (r > 0.93) {
      rt = Math.floor(Math.random() * 30) + 5;
      fav = Math.floor(Math.random() * 50) + 10;
    }
    return { rt: rt, fav: fav };
  }

  // ============================================================
  // via クライアント名
  // ============================================================
  var clients = [
    "web", "web",
    "jigtwi", "jigtwi",
    "ついっぷる", "ついっぷる",
    "Keitai Web",
    "Tweetbot for iOS",
    "Twatter for iPhone",
    "Twatter for Android",
    "TweetDeck",
    "Janetter",
    "Tween",
    "モバツイ",
    "ケータイTwatter",
    "twicca",
    "Echofon",
    "Seesmic",
    "HootSuite"
  ];

  function randomClient() {
    return pick(clients);
  }

  // ============================================================
  // 非公式RT生成
  // ============================================================
  function generateUnofficialRT(user) {
    // 他のユーザーの通常ツイートをRT
    var origUser = pick(USERS);
    while (origUser.screen === user.screen) {
      origUser = pick(USERS);
    }
    var weights = CATEGORY_WEIGHTS[origUser.type] || CATEGORY_WEIGHTS.daily;
    var category = weightedPick(weights);
    var templates = TEMPLATES[category];
    var template = pick(templates);
    var origText = fillTemplate(template, origUser);

    // RTコメントのバリエーション
    var rtComments = ["", "", "", "ｗｗｗ ", "これ ", "ほんとこれ ", "わかる ", "www "];
    var comment = pick(rtComments);

    var rt = comment + "RT @" + origUser.screen + ": " + origText;

    // 140字に収まるよう切り詰め
    if (rt.length > 140) {
      rt = rt.substring(0, 137) + "...";
    }
    return rt;
  }

  // ============================================================
  // 時間帯連動ツイート
  // ============================================================
  var timeBasedTweets = {
    morning: [ // 5-9時
      "おはようございます",
      "おはよー",
      "おは！今日も一日がんばるぞい",
      "朝から{weather}かー",
      "朝ごはん{food}なう",
      "1限間に合わない…",
      "眠すぎて電車で寝過ごしそう",
      "朝活なう。早起き最高。",
      "今日の1限{subject}だるいな…"
    ],
    noon: [ // 11-13時
      "お昼！{food}食べる",
      "学食混みすぎて座れないんだが",
      "昼飯何食べよう",
      "午後の講義眠くなるやつだ…",
      "{place}で{food}なう",
      "ランチなう！"
    ],
    evening: [ // 17-20時
      "帰宅わず",
      "バイト行ってくる…",
      "{activity}わず。つかれたー",
      "今日の夜ご飯何にしよう",
      "そろそろ飯の時間だ",
      "夕方の{place}きれい"
    ],
    night: [ // 22-2時
      "そろそろ寝るか",
      "おやすみなさい",
      "深夜のTL好き",
      "寝れない…",
      "深夜テンションで変なこと呟きそう",
      "明日{activity}なのにまだ起きてるｗ",
      "夜食に{food}食べてしまった…",
      "おまいらおやすみ",
      "深夜の{food}はうまい"
    ]
  };

  function getTimeBasedTweet(user) {
    var hour = new Date().getHours();
    var pool = null;
    if (hour >= 5 && hour < 9) pool = timeBasedTweets.morning;
    else if (hour >= 11 && hour < 13) pool = timeBasedTweets.noon;
    else if (hour >= 17 && hour < 20) pool = timeBasedTweets.evening;
    else if (hour >= 22 || hour < 2) pool = timeBasedTweets.night;

    if (pool) {
      return fillTemplate(pick(pool), user);
    }
    return null;
  }

  // ============================================================
  // 長文ツイート生成システム
  // ============================================================

  // 文を接続するパーツ
  var connectors = ["。", "。", "。", "…", "！", "w ", "けど、", "し、", "から、", "って思った。", "んだけど、"];

  // 末尾の感想・リアクション
  var reactions = [
    "まじで", "やばい", "つらい", "最高", "ウケる",
    "しんどい", "たのしい", "幸せ", "もう無理", "神",
    "意味わからん", "どうしよう", "ありえない", "嬉しすぎる"
  ];

  var endings = [
    "ｗｗｗ", "…", "！", "！！", "！！！", "ｗ",
    "（泣）", "（笑）", "（白目）", "（震え声）",
    "ww", "んだが", "のだが", "なう", "わず"
  ];

  // 長文パターン: 状況 + 展開 + 感想の3段構成で生成
  var longPatterns = {
    daily: [
      // 日常の出来事を詳しく語る
      function(f, u) {
        return pick([
          "今日{place}行ったら{food}が売り切れてて、仕方なく隣の店で{food}食べたんだけど、これが意外と美味かった" + pick(endings),
          "朝起きたら{weather}で最悪だったんだけど、{place}着いたら晴れてきて、帰ろうとしたらまた{weather}っていう…なにこれ",
          "電車で隣の人がめっちゃ{food}の匂いさせてて、こっちまでお腹空いてきて結局{place}で{food}買っちゃった" + pick(endings),
          "{place}で久しぶりに友達に会ったんだけど、お互い変わりすぎてて最初気づかなかったｗ 3年ぶりとかやばいな",
          "今日一日で{food}と{food}と{food}食べた。食べすぎだろって思うけど美味しかったからいいのだ" + pick(endings),
          "コンビニで{food}買おうとしたら財布忘れたことに気づいて、家まで戻ったらもう出る気力なくなった…結局{food}は幻に…",
          "さっき{place}で知らない人に道聞かれたんだけど、俺もこの辺詳しくなくて二人で迷子になるっていう" + pick(endings),
          "家出る5分前にコーヒーこぼして着替えるハメになって遅刻した。朝からついてないわ…でも{place}の{food}美味しかったから許す"
        ]);
      },
      // 深夜テンション
      function(f, u) {
        return pick([
          "深夜3時だけど目が冴えてしまった。明日{activity}あるのに。なんで夜になると元気になるんだろう…人間の設計ミスでしょこれ",
          "こんな時間に{food}食べてる。明日の自分に謝りたい。でも深夜の{food}ってなんであんなに美味いんだろうな" + pick(endings),
          "眠れないから窓開けたら外めっちゃ{weather}じゃん。こういう夜に限って明日{activity}なんだよなぁ…世界は残酷",
          "深夜のテンションで変なこと呟いてるかもしれないけど明日の俺に任せた。おやすみ世界。"
        ]);
      }
    ],
    campus: [
      function(f, u) {
        return pick([
          "{subject}のテストまであと3日なのにまだ1ページも勉強してない。過去問見たら意味不明すぎてそっ閉じした。誰か助けて" + pick(endings),
          "今日{subject}の{professor}が「ここテストに出ます」って言ったのに誰もメモ取ってなくて{professor}がキレてた" + pick(endings),
          "レポートの締め切り明日なのに3000字中まだ200字しか書けてない。参考文献だけは完璧に揃えた（本文は白紙）",
          "履修登録でミスって月曜1限に{subject}入れちゃったの、今期最大の後悔。先週から出席率50%切ってる" + pick(endings),
          "{subject}の講義中に寝てたら教授に当てられて「すいません聞いてませんでした」って正直に言ったらなぜか笑いが起きた",
          "テスト前に友達5人で集まって勉強会したけど、3時間中2時間半は雑談で終わった。残り30分で焦るやつ" + pick(endings),
          "空きコマに図書館行ったら席全部埋まってて、結局学食でダラダラTwatter見て終わった。こうやって大学生活は過ぎていく…",
          "ゼミの発表で教授に「で？」って一言だけ言われて頭真っ白になった。あの「で？」がトラウマになりそう" + pick(endings),
          "友達が「過去問あるよ」って言うから期待したら3年前のやつだった。{professor}もう変わってるんだが" + pick(endings)
        ]);
      }
    ],
    otaku: [
      function(f, u) {
        return pick([
          "{anime}の{episode}話見終わった…{feeling}。こんなの深夜に見るもんじゃない。明日目腫れてたら{anime}のせい" + pick(endings),
          "今日アニメイト行ったら{anime}のグッズ新作出てて全部買った。財布は死んだけど心は満たされた。これがオタクの生き方",
          "{character}のフィギュア届いたんだけど出来良すぎて30分くらい眺めてた。造形した人天才すぎん？？ありがとう…ありがとう…",
          "友達に{anime}薦めたら「3話まで見たけど微妙」って言われた。違うんだよ{episode}話からが本番なんだよ。頼むからそこまで見てくれ",
          "今期アニメ録画溜まりすぎて消化が追いつかない。{anime}と{anime}はリアタイで見てるけど、あと5本くらい未視聴がある" + pick(endings),
          "カラオケで{song}歌ったら友達に「オタクじゃんｗ」って言われた。いや、これは名曲だから。オタクとか関係ないから" + pick(endings),
          "{anime}の最終回リアタイで見たけどTLの実況が楽しすぎた。みんな同じところで叫んでて一体感やばかった" + pick(endings)
        ]);
      }
    ],
    ishiki: [
      function(f, u) {
        return pick([
          "今日のセミナーで「20代の過ごし方が人生を決める」って聞いて、改めて時間の使い方を見直そうと思った。{wisdom}。本当にそう思う。",
          "朝5時起きでカフェに来て読書してる。周り誰もいない空間で集中できるこの時間が最高に贅沢。{wisdom}を体現していく。",
          "インターン先の社長に「君は何がしたいの？」って聞かれて即答できなかった。自分のビジョンを明確にしないと。これは課題。",
          "今日出会った起業家の方の話が刺激的すぎた。やっぱり行動してる人は違う。自分も{wisdom}の精神で挑戦し続けたい。感謝。",
          "学生団体の仲間とブレストしてたら朝になってた。こういう時間が一番楽しい。想いを共有できる仲間がいることに圧倒的感謝。"
        ]);
      }
    ],
    drinking: [
      function(f, u) {
        return pick([
          "飲み会で「{drink}しか飲まない」って宣言したのに気づいたら{drink}も{drink}も飲んでて記憶がところどころない" + pick(endings),
          "先輩に「もう一杯だけ」って言われて断れなくて、その「もう一杯」が5回続いた結果、終電逃した。タクシー代がやばい" + pick(endings),
          "新歓の飲み会で1年生がめっちゃ元気で、先輩のほうが先につぶれるっていう。俺たちも老いたな…" + pick(endings),
          "宅飲みしてたはずなのに気づいたら{place}にいた。どうやってここまで来たのか誰も覚えてないの怖すぎるｗ",
          "飲み会帰りに{place}で{food}食べてる。酔った後の{food}は世界一美味い。カロリーは明日考える" + pick(endings)
        ]);
      }
    ],
    shukatsu: [
      function(f, u) {
        return pick([
          "今日の面接で「あなたを動物に例えると？」って聞かれて咄嗟に「ハムスター」って答えたんだけど、理由聞かれて詰んだ" + pick(endings),
          "ES10社分同時に書いてたら内容が混ざって、{company}に出すやつに別の会社の志望理由書いてた。気づいてよかった…危なすぎる",
          "グルディス中に「じゃあ私がタイムキーパーやります」って言う人、毎回いるの面白い。逆に言わない回に遭遇したことない" + pick(endings),
          "面接で「学生時代に力を入れたこと」をもう30回は話してる。話しすぎて自分でも何が本当の経験だったかわからなくなってきた",
          "お祈りメールのテンプレ「今後のご活躍をお祈り申し上げます」の「ご活躍」って何だよ…お前が祈ってどうすんだよ…" + pick(endings),
          "就活終わった人の「就活楽しかったよ」が信じられない。どの世界線の話？こっちはES書くだけで魂抜けそうなんだが" + pick(endings)
        ]);
      }
    ],
    love: [
      function(f, u) {
        return pick([
          "好きな人がTwatterで他の人と楽しそうにリプしてるの見るのつらすぎる。自分からリプすればいいのに勇気が出ない…なにこのチキン",
          "友達に「あの人のこと好きでしょ」ってバレた。隠してたつもりだったのに。そんなにわかりやすかったか…" + pick(endings),
          "合コンで「趣味は？」って聞かれて「アニメ鑑賞」って正直に答えたら空気が変わった。嘘つけばよかったのか…いや、これが俺だ" + pick(endings),
          "クリスマスのイルミネーション見に行く相手がいないので、一人で{place}行って{food}食べて帰ってきた。充実してたよ？充実してたから" + pick(endings)
        ]);
      }
    ],
    neta: [
      function(f, u) {
        return pick([
          "コンビニで「温めますか？」って聞かれて「大丈夫です」って答えたけど、何が大丈夫なのか自分でもよくわからない" + pick(endings),
          "電車で前に立ってる人のスマホ画面がめっちゃ気になるけど見ちゃいけない。でも気になる。この葛藤わかるやついるだろ" + pick(endings),
          "「明日から本気出す」と言い続けて3年が経った。明日はいつ来るのか。答え：来ない" + pick(endings),
          "ATMの前で残高見て膝から崩れ落ちそうになった。先月あんなにあったのに…{food}と{food}に消えた説ある",
          "美容院で「今日どうします？」って聞かれて「いい感じにしてください」しか言えないの俺だけ？毎回これ" + pick(endings),
          "バイト先の新人に敬語使われて「自分そんな老けて見えます？」って聞いたら「いえ…先輩なので…」って言われた。そうだった" + pick(endings)
        ]);
      }
    ]
  };

  // 長文生成（30%の確率で長文を生成）
  function generateLong(user) {
    var typePatterns = longPatterns[user.type] || [];

    // ユーザータイプに対応するパターンと汎用パターンを合わせる
    var available = [].concat(typePatterns, longPatterns.daily || []);
    if (user.type === "neta") available = available.concat(longPatterns.neta || []);
    if (user.type === "otaku") available = available.concat(longPatterns.otaku || []);

    if (available.length === 0) return null;

    var patternFn = pick(available);
    var text = patternFn(fillTemplate, user);

    // fillTemplateを通してプレースホルダーを置換
    text = fillTemplate(text, user);

    // 140字に収まるように切り詰め
    if (text.length > 140) {
      text = text.substring(0, 137) + "...";
    }

    return text;
  }

  // ============================================================
  // メイン生成
  // ============================================================
  function generate() {
    var user = pick(USERS);
    var counts = randomCounts();
    var text;
    var r = Math.random();

    if (r < 0.12) {
      // 12%: 非公式RT
      text = generateUnofficialRT(user);
    } else if (r < 0.22) {
      // 10%: 時間帯連動ツイート
      text = getTimeBasedTweet(user);
    } else if (r < 0.45) {
      // 23%: 長文ツイート
      text = generateLong(user);
    }

    // 上記で生成できなかった場合は通常テンプレート
    if (!text) {
      var weights = CATEGORY_WEIGHTS[user.type] || CATEGORY_WEIGHTS.daily;
      var category = weightedPick(weights);
      var templates = TEMPLATES[category];
      var template = pick(templates);
      text = fillTemplate(template, user);
    }

    return {
      user: user,
      text: text,
      time: Date.now(),
      rt: counts.rt,
      fav: counts.fav,
      via: randomClient()
    };
  }

  return {
    generate: generate
  };

})();
