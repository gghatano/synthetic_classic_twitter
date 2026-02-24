/* Old Twitter - Main Application */

(function() {
  var MAX_TWEETS = 50;
  var timelineEl = document.getElementById("timeline-list");

  // 経過時間を表示用文字列に変換
  function formatTime(timestamp) {
    var diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 5) return "たった今";
    if (diff < 60) return diff + "秒前";
    var min = Math.floor(diff / 60);
    if (min < 60) return min + "分前";
    var hour = Math.floor(min / 60);
    return hour + "時間前";
  }

  // ツイート本文をHTML化（@メンション、#ハッシュタグに色付け）
  function formatText(text) {
    var escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    // @メンション
    escaped = escaped.replace(/@([\w]+)/g, '<span class="mention">@$1</span>');
    // #ハッシュタグ
    escaped = escaped.replace(/#([^\s]+)/g, '<span class="hashtag">#$1</span>');
    return escaped;
  }

  // ユーザーアイコンの頭文字を取得
  function getInitial(name) {
    return name.charAt(0);
  }

  // ツイートカードのDOM要素を作成
  function createTweetCard(tweet) {
    var card = document.createElement("div");
    card.className = "tweet-card";
    card.setAttribute("data-time", tweet.time);

    var rtCount = tweet.rt > 0 ? tweet.rt : "";
    var favCount = tweet.fav > 0 ? tweet.fav : "";

    card.innerHTML =
      '<div class="tweet-avatar">' +
        AvatarGenerator.generate(tweet.user.screen) +
      '</div>' +
      '<div class="tweet-content">' +
        '<div class="tweet-header">' +
          '<span class="tweet-name">' + tweet.user.name + '</span>' +
          '<span class="tweet-screen">@' + tweet.user.screen + '</span>' +
        '</div>' +
        '<div class="tweet-text">' + formatText(tweet.text) + '</div>' +
        '<div class="tweet-meta">' +
          '<span class="tweet-time">' + formatTime(tweet.time) + '</span>' +
          (tweet.via ? ' <span class="tweet-via">via ' + tweet.via + '</span>' : '') +
        '</div>' +
        '<div class="tweet-actions">' +
          '<span class="tweet-action action-reply">' +
            '<span class="tweet-action-icon">\u21A9</span>' +
            '<span class="count"></span>' +
          '</span>' +
          '<span class="tweet-action action-rt" data-count="' + tweet.rt + '">' +
            '<span class="tweet-action-icon">\u267A</span>' +
            '<span class="count">' + rtCount + '</span>' +
          '</span>' +
          '<span class="tweet-action action-fav" data-count="' + tweet.fav + '">' +
            '<span class="tweet-action-icon">\u2606</span>' +
            '<span class="count">' + favCount + '</span>' +
          '</span>' +
        '</div>' +
      '</div>';

    // RT ボタン
    var rtBtn = card.querySelector(".action-rt");
    rtBtn.addEventListener("click", function() {
      if (this.classList.contains("active")) return;
      this.classList.add("active");
      var c = parseInt(this.getAttribute("data-count"), 10) + 1;
      this.setAttribute("data-count", c);
      this.querySelector(".count").textContent = c;
    });

    // FAV ボタン（トグル: ☆ ⇔ ★）
    var favBtn = card.querySelector(".action-fav");
    favBtn.addEventListener("click", function() {
      var c = parseInt(this.getAttribute("data-count"), 10);
      var icon = this.querySelector(".tweet-action-icon");
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        icon.textContent = "\u2606";
        c = Math.max(0, c - 1);
      } else {
        this.classList.add("active");
        icon.textContent = "\u2605";
        c = c + 1;
      }
      this.setAttribute("data-count", c);
      this.querySelector(".count").textContent = c > 0 ? c : "";
    });

    return card;
  }

  // タイムラインにツイートを追加
  function addTweet(tweet) {
    var card = createTweetCard(tweet);
    timelineEl.insertBefore(card, timelineEl.firstChild);

    // 最大件数を超えたら末尾を削除
    while (timelineEl.children.length > MAX_TWEETS) {
      timelineEl.removeChild(timelineEl.lastChild);
    }
  }

  // タイムスタンプを全件更新
  function updateTimestamps() {
    var cards = timelineEl.querySelectorAll(".tweet-card");
    for (var i = 0; i < cards.length; i++) {
      var time = parseInt(cards[i].getAttribute("data-time"), 10);
      var el = cards[i].querySelector(".tweet-meta .tweet-time");
      if (el) el.textContent = formatTime(time);
    }
  }

  // 次のツイートをスケジュール
  function scheduleNext() {
    var delay = 1000 + Math.random() * 4000; // 1〜5秒

    // たまに連投（10%の確率）
    if (Math.random() < 0.1) {
      delay = 300;
    }

    setTimeout(function() {
      addTweet(TweetGenerator.generate());
      scheduleNext();
    }, delay);
  }

  // --- ユーザー投稿機能 ---
  var MY_USER = { name: "やまだ たろう", screen: "yamada_taro_11", color: "#55ACEE" };
  var tweetInput = document.getElementById("tweet-input");
  var tweetBtn = document.getElementById("tweet-btn");
  var tweetCounter = document.getElementById("tweet-counter");

  function updateCounter() {
    var remaining = 140 - tweetInput.value.length;
    tweetCounter.textContent = remaining;
    if (remaining < 0) {
      tweetCounter.className = "tweet-counter warning";
      tweetBtn.className = "tweet-btn";
    } else if (remaining < 140) {
      tweetCounter.className = remaining <= 20 ? "tweet-counter warning" : "tweet-counter";
      tweetBtn.className = "tweet-btn active";
    } else {
      tweetCounter.className = "tweet-counter";
      tweetBtn.className = "tweet-btn";
    }
  }

  function postUserTweet() {
    var text = tweetInput.value.trim();
    if (text.length === 0 || text.length > 140) return;
    addTweet({
      user: MY_USER,
      text: text,
      time: Date.now(),
      rt: 0,
      fav: 0,
      via: "web"
    });
    tweetInput.value = "";
    updateCounter();
  }

  tweetInput.addEventListener("input", updateCounter);
  tweetBtn.addEventListener("click", postUserTweet);
  tweetInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      postUserTweet();
    }
  });

  // 初期化
  function init() {
    // 初期ツイート10件
    for (var i = 0; i < 10; i++) {
      var tweet = TweetGenerator.generate();
      tweet.time = Date.now() - (10 - i) * 30000; // 過去に遡ったタイムスタンプ
      addTweet(tweet);
    }

    // 1秒後から自動生成開始
    setTimeout(function() {
      scheduleNext();
    }, 1000);

    // 1分ごとにタイムスタンプ更新
    setInterval(updateTimestamps, 60000);
  }

  init();
})();
