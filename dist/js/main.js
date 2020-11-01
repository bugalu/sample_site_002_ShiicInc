"use strict";

/* ======================================================
   slider
   ====================================================== */

/* ███ 各要素を取得 ███ */

/* --- 個別slide本体() --- */
var sliderItems = document.querySelectorAll(".p-slider-item");
/* --- slideItemを並べて動くパーツ --- */

var sliderWrapper = document.getElementById("p-slider-wrapper");
/* --- スライドのフレーム --- */

var sliderFrame = document.getElementById("p-slider-frame");
/* ---------- スライドフレームの一時停止マーク ---------- */

var sliderPause = document.getElementById("p-sliderPause");
/* --- 操作ボタン --- */

var prev = document.getElementById("prev");
var next = document.getElementById("next");
/* ███ オプション ███ */

/* 開始スライド（一枚目 = 0） */

var sliderIndex = 0;
/* スライドの動作間隔(ミリ秒) */

var intervalMillisecond = 6000;
/* スライドの動作スピード(ミリ秒) */

var transitionDuration = 1000;
/* 自動再生の有無 */

var autoPlay = true;
/* 自動再生の方向反転 */

var sliderReverse = false;
/* ループ再生モード */

var loop = true;
/* ███ ボタン ███ */

/* prev（戻る）ボタンのクリックイベント */

prev.addEventListener("click", function (event) {
  event.stopPropagation();
  previousSlider();
});
/* next（進む）ボタンのクリックイベント */

next.addEventListener("click", function (event) {
  event.stopPropagation();
  nextSlider();
});
/* ███ 再生モードによる動作分岐 ███ */

/* スライドを次に進める動作 */

function nextSlider() {
  //スライド中のボタン無効化
  disabled(); //スライド動作分岐

  if (loop) {
    nextSlider_loop();
  } else {
    nextSlider_drag();
  }
}
/* スライダーを前に戻す動作 */


function previousSlider() {
  //スライド中のボタン無効化
  disabled(); //スライド動作分岐

  if (loop) {
    previousSlider_loop();
  } else {
    previousSlider_drag();
  }
}
/* ███ 動作準備(dragモード) ███ */

/* 開始スライド位置 */


sliderWrapper.style.left = sliderIndex * -sliderWidth + "px";
/* スライドフレームのクリック回数 */

var frameClickCount = 0;
/* スライド一枚の横幅（px単位）*/

var sliderWidth = sliderFrame.clientWidth;
/* ウィンドウリサイズに伴うスライド横幅の再取得 */

window.addEventListener("resize", function () {
  sliderWidth = sliderFrame.clientWidth; //ズレを修正

  prev.click();
});
/* ███ スライド動作(dragモード) ███ */

/* 正順 */

function nextSlider_drag() {
  sliderIndex++;

  if (sliderIndex >= sliderItems.length) {
    sliderIndex = 0;
  }

  sliderWrapper.style.left = sliderIndex * -sliderWidth + "px";
}
/* 逆順 */


function previousSlider_drag() {
  sliderIndex--;

  if (sliderIndex < 0) {
    sliderIndex = sliderItems.length - 1;
  }

  sliderWrapper.style.left = sliderIndex * -sliderWidth + "px";
}
/* ███ スライド動作(loopモード) ███ */

/* 正順 */


function nextSlider_loop() {
  var sliderItems = document.querySelectorAll(".p-slider-item");
  var clone = sliderItems[0].cloneNode(true);
  sliderWrapper.style.transition = "transform ".concat(transitionDuration, "ms");
  sliderWrapper.style.transform = "translateX(-100%)";
  setTimeout(function () {
    sliderWrapper.style.transition = "transform 0s";
    sliderWrapper.style.transform = "translateX(0)";
    sliderWrapper.removeChild(sliderItems[0]);
    sliderWrapper.appendChild(clone);
  }, "".concat(transitionDuration));
}
/* 逆順 */


function previousSlider_loop() {
  var sliderItems = document.querySelectorAll(".p-slider-item");
  var clone = sliderItems[sliderItems.length - 1].cloneNode(true);
  sliderWrapper.prepend(clone);
  sliderWrapper.style.transition = "transform 0s";
  sliderWrapper.style.transform = "translateX(-100%)";
  sliderWrapper.removeChild(sliderItems[sliderItems.length - 1]);
  setTimeout(function () {
    sliderWrapper.style.transition = "transform ".concat(transitionDuration, "ms");
    sliderWrapper.style.transform = "translateX(0%)";
  }, 1);
}
/* ███ スライド動作中のボタン無効化 ███ */


function disabled() {
  prev.setAttribute("disabled", true);
  next.setAttribute("disabled", true);
  setTimeout(function () {
    prev.removeAttribute("disabled");
    next.removeAttribute("disabled");
  }, "".concat(transitionDuration));
}
/* ███ 自動再生 ███ */


var timerId = window.setInterval(function () {
  if (sliderReverse === true) {
    previousSlider();
  } else {
    nextSlider();
  }
}, intervalMillisecond);
/* 一時停止 */

sliderFrame.addEventListener("click", function () {
  frameClickCount++;

  if (frameClickCount % 2 !== 0) {
    //一時停止
    sliderPause.style.opacity = 1;
    clearTimeout(timerId);
  } else {
    //再開
    sliderPause.style.opacity = 0;
    timerId = window.setInterval(function () {
      nextSlider();
    }, intervalMillisecond);
  }
});
/* ======================================================
   drawer
   ====================================================== */

var menuBtn = document.querySelector("#js-menuButton");
var header = document.querySelector("#js-header");
menuBtn.addEventListener("click", function () {
  header.classList.toggle("isOpen");
});
/* 要素チェック/開発用
   ------------------------------------------------------ */

console.log(document.querySelector("#check"));
//# sourceMappingURL=main.js.map
