"use strict";

{
  const timer = document.getElementById("timer");
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const reset = document.getElementById("reset");

  let startTime;
  let timerId;
  let elapsedTime = 0;

  function disabledBtnRunning() {
    //disabledBtnシリーズでボタンのプロパティーを操作し押せたり押せなかったりするようにする
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;
  }
  function disabledBtnStop() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
  }
  function disabledBtnStart() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
  }

  function countUp() {
    // console.log(Date.now() - startTime); //初期値を０にして１０m秒ごとにクリックした時の時間と現在時刻を引きカウントアップされるようになる
    const date = new Date(Date.now() - startTime + elapsedTime); //現在時刻にstratを押した時間を引いて０からスタートするようにし、stopを押した時間を＋することによりstopからstartも０から始まらず止まったところから動き出すようになる
    const m = date.getMinutes().toString().padStart(2, "0"); //padStartは文字列じゃないと使えないため、toStringで文字列にしpadStart(桁数、埋めるもの)これで固定される
    const s = date.getSeconds().toString().padStart(2, "0");
    const ms = date.getMilliseconds().toString().padStart(3, "0");

    timer.innerHTML = `${m}:${s}:${ms}`; //backクォーテーション　忘れがち

    timerId = setTimeout(() => {
      //timerIdはstop.addEventListener(作った際につけてあげた
      //10m秒おきに実行される
      countUp();
    }, 10);
  }

  disabledBtnStart();

  start.addEventListener("click", () => {
    disabledBtnRunning();
    startTime = Date.now(); //日時を取得。もしfunction countUp()の中に記述すると、10m秒おきに発火されるためタイマーにならなくなる
    console.log(startTime);
    countUp();
  });
  stop.addEventListener("click", () => {
    disabledBtnStop();
    clearTimeout(timerId); //clearTimeout(timerId); IDが引数に必要なため作ってあげる
    elapsedTime += Date.now() - startTime; //stopを押したときの時間を足しあっげている
  });
  reset.addEventListener("click", () => {
    disabledBtnStart();
    timer.innerHTML = "00:00:000";
    elapsedTime = 0;
  });
}
