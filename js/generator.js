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

  // ツイート1件を生成
  function generate() {
    var user = pick(USERS);
    var weights = CATEGORY_WEIGHTS[user.type] || CATEGORY_WEIGHTS.daily;
    var category = weightedPick(weights);
    var templates = TEMPLATES[category];
    var template = pick(templates);
    var text = fillTemplate(template, user);
    var counts = randomCounts();

    return {
      user: user,
      text: text,
      time: Date.now(),
      rt: counts.rt,
      fav: counts.fav
    };
  }

  return {
    generate: generate
  };

})();
