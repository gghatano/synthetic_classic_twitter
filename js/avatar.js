/* Old Twitter - SVG Avatar Generator */
/* 配分: アニメ/動物アイコン 80%, たまご 10%, 人 10% */

var AvatarGenerator = (function() {

  function hash(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
      h = ((h << 5) - h) + str.charCodeAt(i);
      h = h & h;
    }
    return Math.abs(h);
  }

  function pick(arr, seed) {
    return arr[seed % arr.length];
  }

  var bgColors = [
    "#FFE4E9", "#E4F0FF", "#E4FFE9", "#FFF4E4", "#F0E4FF",
    "#E4FFFA", "#FFF0F5", "#F0FFF0", "#FFFACD", "#E6E6FA",
    "#F5F5DC", "#FFEFD5", "#E0FFFF", "#FFF8DC", "#F0F8FF"
  ];

  // ============================================================
  // たまごアイコン（旧Twitterデフォルト）
  // ============================================================
  var eggBgs = ["#C0DEED", "#AAD1E6", "#9FC5E0", "#B8D8E8", "#A8CCE0"];

  function generateEgg(h) {
    var bg = pick(eggBgs, h);
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="48" height="48">' +
      '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
      '<ellipse cx="25" cy="27" rx="11" ry="14" fill="#E8E8E8"/>' +
      '<ellipse cx="25" cy="25" rx="10" ry="13" fill="#F5F5F5"/>' +
      '<ellipse cx="22" cy="23" rx="3" ry="4" fill="#fff" opacity="0.5"/>' +
      '</svg>';
  }

  // ============================================================
  // 動物アイコン
  // ============================================================
  var animalIcons = [
    // 猫
    function(bg, accent) {
      return '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
        // 耳
        '<polygon points="12,8 18,20 6,20" fill="' + accent + '"/>' +
        '<polygon points="38,8 44,20 32,20" fill="' + accent + '"/>' +
        '<polygon points="13,10 17,19 9,19" fill="#FFB6C1"/>' +
        '<polygon points="37,10 41,19 33,19" fill="#FFB6C1"/>' +
        // 顔
        '<circle cx="25" cy="28" r="14" fill="' + accent + '"/>' +
        // 目
        '<ellipse cx="19" cy="26" rx="2.5" ry="3" fill="#333"/>' +
        '<ellipse cx="31" cy="26" rx="2.5" ry="3" fill="#333"/>' +
        '<circle cx="20" cy="25" r="1" fill="#fff"/>' +
        '<circle cx="32" cy="25" r="1" fill="#fff"/>' +
        // 鼻・口
        '<ellipse cx="25" cy="31" rx="2" ry="1.5" fill="#FFB6C1"/>' +
        '<path d="M25,32.5 L23,35" stroke="#333" stroke-width="0.8" fill="none"/>' +
        '<path d="M25,32.5 L27,35" stroke="#333" stroke-width="0.8" fill="none"/>' +
        // ひげ
        '<line x1="8" y1="29" x2="17" y2="30" stroke="#333" stroke-width="0.6"/>' +
        '<line x1="8" y1="32" x2="17" y2="32" stroke="#333" stroke-width="0.6"/>' +
        '<line x1="33" y1="30" x2="42" y2="29" stroke="#333" stroke-width="0.6"/>' +
        '<line x1="33" y1="32" x2="42" y2="32" stroke="#333" stroke-width="0.6"/>';
    },
    // 犬
    function(bg, accent) {
      return '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
        // 垂れ耳
        '<ellipse cx="11" cy="22" rx="7" ry="12" fill="' + accent + '"/>' +
        '<ellipse cx="39" cy="22" rx="7" ry="12" fill="' + accent + '"/>' +
        // 顔
        '<circle cx="25" cy="26" r="14" fill="' + accent + '"/>' +
        // マズル
        '<ellipse cx="25" cy="32" rx="8" ry="6" fill="#F5E6D3"/>' +
        // 目
        '<circle cx="19" cy="24" r="3" fill="#fff"/>' +
        '<circle cx="31" cy="24" r="3" fill="#fff"/>' +
        '<circle cx="19" cy="24" r="2" fill="#333"/>' +
        '<circle cx="31" cy="24" r="2" fill="#333"/>' +
        '<circle cx="19.7" cy="23.3" r="0.7" fill="#fff"/>' +
        '<circle cx="31.7" cy="23.3" r="0.7" fill="#fff"/>' +
        // 鼻
        '<ellipse cx="25" cy="30" rx="3" ry="2" fill="#333"/>' +
        '<ellipse cx="24" cy="29.5" rx="1" ry="0.6" fill="#555"/>' +
        // 口
        '<path d="M25,32 L25,35 Q25,37 23,36" stroke="#333" stroke-width="0.8" fill="none"/>' +
        '<path d="M25,35 Q25,37 27,36" stroke="#333" stroke-width="0.8" fill="none"/>' +
        // 舌
        '<ellipse cx="25" cy="37" rx="2" ry="2.5" fill="#FF8888"/>';
    },
    // うさぎ
    function(bg, accent) {
      return '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
        // 長い耳
        '<ellipse cx="18" cy="10" rx="4" ry="12" fill="' + accent + '"/>' +
        '<ellipse cx="32" cy="10" rx="4" ry="12" fill="' + accent + '"/>' +
        '<ellipse cx="18" cy="10" rx="2" ry="9" fill="#FFB6C1"/>' +
        '<ellipse cx="32" cy="10" rx="2" ry="9" fill="#FFB6C1"/>' +
        // 顔
        '<circle cx="25" cy="30" r="13" fill="' + accent + '"/>' +
        // 目（赤目）
        '<circle cx="19" cy="28" r="2.5" fill="#C0392B"/>' +
        '<circle cx="31" cy="28" r="2.5" fill="#C0392B"/>' +
        '<circle cx="19.8" cy="27.2" r="1" fill="#fff"/>' +
        '<circle cx="31.8" cy="27.2" r="1" fill="#fff"/>' +
        // 鼻・口
        '<path d="M24,33 L25,34 L26,33" stroke="#C0392B" stroke-width="1" fill="#FFB6C1"/>' +
        '<path d="M25,34 L25,36" stroke="#333" stroke-width="0.6"/>' +
        '<path d="M22,36 Q25,38 28,36" stroke="#333" stroke-width="0.6" fill="none"/>';
    },
    // ハムスター
    function(bg, accent) {
      return '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
        // 丸い耳
        '<circle cx="12" cy="16" r="6" fill="' + accent + '"/>' +
        '<circle cx="38" cy="16" r="6" fill="' + accent + '"/>' +
        '<circle cx="12" cy="16" r="3.5" fill="#FFB6C1"/>' +
        '<circle cx="38" cy="16" r="3.5" fill="#FFB6C1"/>' +
        // 顔（ぽっちゃり）
        '<ellipse cx="25" cy="30" rx="16" ry="14" fill="' + accent + '"/>' +
        // ほっぺ
        '<circle cx="13" cy="33" r="5" fill="#FDEBD0"/>' +
        '<circle cx="37" cy="33" r="5" fill="#FDEBD0"/>' +
        '<circle cx="13" cy="33" r="3.5" fill="#FFB6C1" opacity="0.5"/>' +
        '<circle cx="37" cy="33" r="3.5" fill="#FFB6C1" opacity="0.5"/>' +
        // 目
        '<circle cx="20" cy="27" r="2" fill="#333"/>' +
        '<circle cx="30" cy="27" r="2" fill="#333"/>' +
        '<circle cx="20.5" cy="26.5" r="0.7" fill="#fff"/>' +
        '<circle cx="30.5" cy="26.5" r="0.7" fill="#fff"/>' +
        // 鼻・口
        '<circle cx="25" cy="31" r="1.5" fill="#FF8888"/>' +
        '<path d="M25,32.5 L23,34" stroke="#333" stroke-width="0.6" fill="none"/>' +
        '<path d="M25,32.5 L27,34" stroke="#333" stroke-width="0.6" fill="none"/>';
    },
    // ペンギン
    function(bg, _accent) {
      return '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
        // 体
        '<ellipse cx="25" cy="30" rx="14" ry="16" fill="#2C3E50"/>' +
        // お腹
        '<ellipse cx="25" cy="33" rx="9" ry="12" fill="#ECF0F1"/>' +
        // 目
        '<circle cx="19" cy="24" r="4" fill="#fff"/>' +
        '<circle cx="31" cy="24" r="4" fill="#fff"/>' +
        '<circle cx="20" cy="24" r="2.5" fill="#333"/>' +
        '<circle cx="32" cy="24" r="2.5" fill="#333"/>' +
        '<circle cx="20.5" cy="23.2" r="0.8" fill="#fff"/>' +
        '<circle cx="32.5" cy="23.2" r="0.8" fill="#fff"/>' +
        // くちばし
        '<polygon points="25,28 21,31 29,31" fill="#F39C12"/>' +
        // ほっぺ
        '<circle cx="16" cy="29" r="2.5" fill="#FFB6C1" opacity="0.5"/>' +
        '<circle cx="34" cy="29" r="2.5" fill="#FFB6C1" opacity="0.5"/>';
    },
    // パンダ
    function(bg, _accent) {
      return '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
        // 耳
        '<circle cx="13" cy="14" r="6" fill="#333"/>' +
        '<circle cx="37" cy="14" r="6" fill="#333"/>' +
        // 顔
        '<circle cx="25" cy="28" r="14" fill="#F5F5F5"/>' +
        // 目の周り（黒い模様）
        '<ellipse cx="18" cy="26" rx="5" ry="4.5" fill="#333" transform="rotate(-10,18,26)"/>' +
        '<ellipse cx="32" cy="26" rx="5" ry="4.5" fill="#333" transform="rotate(10,32,26)"/>' +
        // 目
        '<circle cx="18" cy="26" r="2" fill="#fff"/>' +
        '<circle cx="32" cy="26" r="2" fill="#fff"/>' +
        '<circle cx="18.5" cy="25.5" r="0.7" fill="#333"/>' +
        '<circle cx="32.5" cy="25.5" r="0.7" fill="#333"/>' +
        // 鼻
        '<ellipse cx="25" cy="32" rx="2.5" ry="1.8" fill="#333"/>' +
        // 口
        '<path d="M25,34 L23,36" stroke="#333" stroke-width="0.8" fill="none"/>' +
        '<path d="M25,34 L27,36" stroke="#333" stroke-width="0.8" fill="none"/>';
    }
  ];

  var animalColors = [
    "#F5CBA7", "#E8DAEF", "#D5F5E3", "#FAD7A0", "#AED6F1",
    "#F9E79F", "#D2B4DE", "#A9DFBF", "#F5B7B1", "#AEB6BF",
    "#FDEBD0", "#D6EAF8", "#FCF3CF", "#E8E8E8", "#F2D7D5"
  ];

  // ============================================================
  // アニメ風アイコン
  // ============================================================
  var animeIcons = [
    // 猫耳キャラ
    function(bg, hairC, eyeC) {
      return '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
        // 髪ベース
        '<circle cx="25" cy="25" r="15" fill="' + hairC + '"/>' +
        // 猫耳
        '<polygon points="11,6 17,18 5,18" fill="' + hairC + '"/>' +
        '<polygon points="39,6 45,18 33,18" fill="' + hairC + '"/>' +
        '<polygon points="12,9 16,17 8,17" fill="#FFB6C1"/>' +
        '<polygon points="38,9 42,17 34,17" fill="#FFB6C1"/>' +
        // 顔
        '<circle cx="25" cy="27" r="11" fill="#FDDCB1"/>' +
        // 前髪
        '<path d="M14,22 C14,15 19,12 25,12 C31,12 36,15 36,22 L34,20 L30,22 L25,18 L20,22 L16,20 Z" fill="' + hairC + '"/>' +
        // 目（アニメ風大きい目）
        '<ellipse cx="19" cy="27" rx="3" ry="4" fill="#fff"/>' +
        '<ellipse cx="19" cy="27.5" rx="2.5" ry="3.5" fill="' + eyeC + '"/>' +
        '<circle cx="19" cy="27" r="1.5" fill="#111"/>' +
        '<circle cx="20" cy="26" r="1" fill="#fff"/>' +
        '<ellipse cx="31" cy="27" rx="3" ry="4" fill="#fff"/>' +
        '<ellipse cx="31" cy="27.5" rx="2.5" ry="3.5" fill="' + eyeC + '"/>' +
        '<circle cx="31" cy="27" r="1.5" fill="#111"/>' +
        '<circle cx="32" cy="26" r="1" fill="#fff"/>' +
        // 口
        '<path d="M23,33 Q25,35 27,33" stroke="#C0392B" stroke-width="0.8" fill="none"/>' +
        // ほっぺ
        '<ellipse cx="14" cy="31" rx="2.5" ry="1.5" fill="#FFB6C1" opacity="0.5"/>' +
        '<ellipse cx="36" cy="31" rx="2.5" ry="1.5" fill="#FFB6C1" opacity="0.5"/>';
    },
    // ツインテールキャラ
    function(bg, hairC, eyeC) {
      return '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
        // ツインテール
        '<path d="M10,22 C6,24 4,32 6,40 C8,42 12,40 12,36 L12,24 Z" fill="' + hairC + '"/>' +
        '<path d="M40,22 C44,24 46,32 44,40 C42,42 38,40 38,36 L38,24 Z" fill="' + hairC + '"/>' +
        // 髪ベース
        '<path d="M12,18 C12,10 18,6 25,6 C32,6 38,10 38,18 L38,24 L12,24 Z" fill="' + hairC + '"/>' +
        // 顔
        '<circle cx="25" cy="27" r="11" fill="#FDDCB1"/>' +
        // 前髪
        '<path d="M14,24 L17,20 L21,24 L25,18 L29,24 L33,20 L36,24" fill="' + hairC + '"/>' +
        // 目
        '<ellipse cx="19" cy="27" rx="3.5" ry="4" fill="#fff"/>' +
        '<ellipse cx="19.5" cy="28" rx="2.8" ry="3" fill="' + eyeC + '"/>' +
        '<circle cx="19.5" cy="27.5" r="1.5" fill="#111"/>' +
        '<circle cx="20.2" cy="26.5" r="1" fill="#fff"/>' +
        '<ellipse cx="31" cy="27" rx="3.5" ry="4" fill="#fff"/>' +
        '<ellipse cx="31.5" cy="28" rx="2.8" ry="3" fill="' + eyeC + '"/>' +
        '<circle cx="31.5" cy="27.5" r="1.5" fill="#111"/>' +
        '<circle cx="32.2" cy="26.5" r="1" fill="#fff"/>' +
        // 口
        '<path d="M24,33 L25,34 L26,33" stroke="#C0392B" stroke-width="0.8" fill="none"/>' +
        // リボン
        '<polygon points="10,20 7,17 10,22 13,17" fill="#E74C3C"/>' +
        '<polygon points="40,20 37,17 40,22 43,17" fill="#E74C3C"/>' +
        // ほっぺ
        '<ellipse cx="14" cy="31" rx="2" ry="1.5" fill="#FFB6C1" opacity="0.5"/>' +
        '<ellipse cx="36" cy="31" rx="2" ry="1.5" fill="#FFB6C1" opacity="0.5"/>';
    },
    // ショートヘアのボーイッシュキャラ
    function(bg, hairC, eyeC) {
      return '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
        // 髪
        '<path d="M10,20 C10,10 16,4 25,4 C34,4 40,10 40,20 L38,22 C36,16 31,13 25,13 C19,13 14,16 12,22 Z" fill="' + hairC + '"/>' +
        // 顔
        '<circle cx="25" cy="27" r="12" fill="#FDDCB1"/>' +
        // 前髪（サイドに流れる）
        '<path d="M12,20 C12,14 18,10 22,10 L14,22 Z" fill="' + hairC + '"/>' +
        '<path d="M14,22 L20,16 L18,22 Z" fill="' + hairC + '"/>' +
        // 目（キリッとした目）
        '<path d="M16,25 L22,24" stroke="#333" stroke-width="1.2"/>' +
        '<path d="M28,24 L34,25" stroke="#333" stroke-width="1.2"/>' +
        '<ellipse cx="19" cy="27" rx="2.5" ry="3" fill="' + eyeC + '"/>' +
        '<circle cx="19" cy="26.5" r="1.5" fill="#111"/>' +
        '<circle cx="19.5" cy="26" r="0.8" fill="#fff"/>' +
        '<ellipse cx="31" cy="27" rx="2.5" ry="3" fill="' + eyeC + '"/>' +
        '<circle cx="31" cy="26.5" r="1.5" fill="#111"/>' +
        '<circle cx="31.5" cy="26" r="0.8" fill="#fff"/>' +
        // 口
        '<path d="M23,33 Q25,35 27,33" stroke="#333" stroke-width="0.8" fill="none"/>';
    },
    // ぱっつん前髪の女の子
    function(bg, hairC, eyeC) {
      return '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
        // サイド髪
        '<path d="M10,20 L8,42 C8,44 12,44 12,42 L13,26 Z" fill="' + hairC + '"/>' +
        '<path d="M40,20 L42,42 C42,44 38,44 38,42 L37,26 Z" fill="' + hairC + '"/>' +
        // 後ろ髪
        '<path d="M10,18 C10,8 17,3 25,3 C33,3 40,8 40,18 L40,22 L10,22 Z" fill="' + hairC + '"/>' +
        // 顔
        '<circle cx="25" cy="28" r="11" fill="#FDDCB1"/>' +
        // ぱっつん前髪
        '<rect x="13" y="18" width="24" height="6" rx="1" fill="' + hairC + '"/>' +
        // 目（まんまる）
        '<circle cx="19" cy="28" r="3.5" fill="#fff"/>' +
        '<circle cx="19.3" cy="28.5" r="2.8" fill="' + eyeC + '"/>' +
        '<circle cx="19.3" cy="28" r="1.5" fill="#111"/>' +
        '<circle cx="20" cy="27" r="1.2" fill="#fff"/>' +
        '<circle cx="18.5" cy="28.5" r="0.5" fill="#fff"/>' +
        '<circle cx="31" cy="28" r="3.5" fill="#fff"/>' +
        '<circle cx="31.3" cy="28.5" r="2.8" fill="' + eyeC + '"/>' +
        '<circle cx="31.3" cy="28" r="1.5" fill="#111"/>' +
        '<circle cx="32" cy="27" r="1.2" fill="#fff"/>' +
        '<circle cx="30.5" cy="28.5" r="0.5" fill="#fff"/>' +
        // 口
        '<circle cx="25" cy="34" r="1" fill="#E88"/>' +
        // ほっぺ
        '<ellipse cx="14" cy="32" rx="2.5" ry="1.5" fill="#FFB6C1" opacity="0.5"/>' +
        '<ellipse cx="36" cy="32" rx="2.5" ry="1.5" fill="#FFB6C1" opacity="0.5"/>';
    },
    // メガネキャラ（男）
    function(bg, hairC, eyeC) {
      return '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
        // 髪
        '<path d="M11,18 C11,8 17,3 25,3 C33,3 39,8 39,18 L37,16 C35,12 30,9 25,9 C20,9 15,12 13,16 Z" fill="' + hairC + '"/>' +
        // 顔
        '<circle cx="25" cy="27" r="12" fill="#FDDCB1"/>' +
        // 前髪
        '<path d="M13,18 L16,12 L20,18 L25,10 L30,18 L34,12 L37,18 L35,16 C33,12 29,9 25,9 C21,9 17,12 15,16 Z" fill="' + hairC + '"/>' +
        // メガネ
        '<rect x="13" y="23" width="10" height="8" rx="2" fill="none" stroke="#555" stroke-width="1.5"/>' +
        '<rect x="27" y="23" width="10" height="8" rx="2" fill="none" stroke="#555" stroke-width="1.5"/>' +
        '<line x1="23" y1="27" x2="27" y2="27" stroke="#555" stroke-width="1.5"/>' +
        // 目
        '<circle cx="18" cy="27" r="1.5" fill="' + eyeC + '"/>' +
        '<circle cx="18" cy="27" r="0.8" fill="#111"/>' +
        '<circle cx="32" cy="27" r="1.5" fill="' + eyeC + '"/>' +
        '<circle cx="32" cy="27" r="0.8" fill="#111"/>' +
        // 口
        '<path d="M23,34 Q25,36 27,34" stroke="#333" stroke-width="0.8" fill="none"/>';
    },
    // デフォルメ美少女（大きい目リボン）
    function(bg, hairC, eyeC) {
      return '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
        // 髪
        '<path d="M9,22 C9,10 16,3 25,3 C34,3 41,10 41,22 L40,26 L10,26 Z" fill="' + hairC + '"/>' +
        // 顔
        '<ellipse cx="25" cy="30" rx="12" ry="11" fill="#FDDCB1"/>' +
        // 前髪
        '<path d="M13,26 L16,20 L19,26 L22,19 L25,26 L28,19 L31,26 L34,20 L37,26" fill="' + hairC + '"/>' +
        // リボン
        '<ellipse cx="14" cy="14" rx="5" ry="4" fill="#E74C3C"/>' +
        '<ellipse cx="10" cy="14" rx="3" ry="2.5" fill="#E74C3C"/>' +
        '<ellipse cx="18" cy="14" rx="3" ry="2.5" fill="#E74C3C"/>' +
        '<circle cx="14" cy="14" r="1.5" fill="#C0392B"/>' +
        // 目（キラキラ大きい目）
        '<ellipse cx="19" cy="30" rx="4" ry="4.5" fill="#fff"/>' +
        '<ellipse cx="19.5" cy="31" rx="3.2" ry="3.8" fill="' + eyeC + '"/>' +
        '<circle cx="19.5" cy="30.5" r="2" fill="#111"/>' +
        '<circle cx="20.5" cy="29.5" r="1.2" fill="#fff"/>' +
        '<circle cx="18.5" cy="31.5" r="0.6" fill="#fff"/>' +
        '<ellipse cx="31" cy="30" rx="4" ry="4.5" fill="#fff"/>' +
        '<ellipse cx="31.5" cy="31" rx="3.2" ry="3.8" fill="' + eyeC + '"/>' +
        '<circle cx="31.5" cy="30.5" r="2" fill="#111"/>' +
        '<circle cx="32.5" cy="29.5" r="1.2" fill="#fff"/>' +
        '<circle cx="30.5" cy="31.5" r="0.6" fill="#fff"/>' +
        // 口
        '<path d="M24,36 L25,37 L26,36" stroke="#E88" stroke-width="0.8" fill="none"/>' +
        // ほっぺ
        '<ellipse cx="13" cy="34" rx="2.5" ry="1.5" fill="#FFB6C1" opacity="0.5"/>' +
        '<ellipse cx="37" cy="34" rx="2.5" ry="1.5" fill="#FFB6C1" opacity="0.5"/>';
    }
  ];

  var animeHairColors = [
    "#2C1810", "#4A3728", "#1A1A2E", "#5C3317",
    "#FF69B4", "#8B5CF6", "#3B82F6", "#10B981",
    "#F59E0B", "#EF4444", "#EC4899", "#06B6D4",
    "#6366F1", "#F97316", "#84CC16"
  ];

  var animeEyeColors = [
    "#3B82F6", "#10B981", "#8B5CF6", "#F59E0B",
    "#EF4444", "#EC4899", "#06B6D4", "#6366F1",
    "#22C55E", "#A855F7", "#F97316", "#14B8A6"
  ];

  // ============================================================
  // 人アイコン（シンプル版）
  // ============================================================
  function generateHuman(h) {
    var bg = pick(bgColors, h);
    var skin = pick(["#FDDCB1", "#F5CBA7", "#F0B27A"], h + 1);
    var hair = pick(["#2C1810", "#4A3728", "#1A1A2E", "#8B6914", "#5C3317"], h + 2);
    var shirt = pick(["#E74C3C", "#3498DB", "#2ECC71", "#F39C12", "#9B59B6", "#1ABC9C"], h + 3);

    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="48" height="48">' +
      '<rect width="50" height="50" rx="4" fill="' + bg + '"/>' +
      '<path d="M5,50 C5,40 15,36 25,36 C35,36 45,40 45,50 Z" fill="' + shirt + '"/>' +
      '<rect x="21" y="30" width="8" height="8" rx="2" fill="' + skin + '"/>' +
      '<circle cx="25" cy="24" r="12" fill="' + skin + '"/>' +
      '<circle cx="19" cy="24" r="1.5" fill="#333"/>' +
      '<circle cx="31" cy="24" r="1.5" fill="#333"/>' +
      '<path d="M22,29 Q25,32 28,29" fill="none" stroke="#333" stroke-width="1"/>' +
      '<path d="M13,18 C13,8 18,4 25,4 C32,4 37,8 37,18 L35,16 C33,12 29,10 25,10 C21,10 17,12 15,16 Z" fill="' + hair + '"/>' +
      '</svg>';
  }

  // ============================================================
  // メイン生成関数
  // ============================================================
  function generate(screenName) {
    var h = hash(screenName);
    var h2 = hash(screenName + "_t");

    // 配分: アニメ/動物 80%, たまご 10%, 人 10%
    var roll = h % 10;

    if (roll === 0) {
      // 10%: たまご
      return generateEgg(h);
    }

    if (roll === 1) {
      // 10%: 人
      return generateHuman(h);
    }

    // 80%: アニメ or 動物（半々）
    var bg = pick(bgColors, h);

    if (h2 % 2 === 0) {
      // 動物
      var animalFn = pick(animalIcons, h);
      var animalColor = pick(animalColors, h2);
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="48" height="48">' +
        animalFn(bg, animalColor) +
        '</svg>';
    } else {
      // アニメ
      var animeFn = pick(animeIcons, h);
      var hairC = pick(animeHairColors, h2);
      var eyeC = pick(animeEyeColors, h + 3);
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="48" height="48">' +
        animeFn(bg, hairC, eyeC) +
        '</svg>';
    }
  }

  return {
    generate: generate
  };

})();
