'use strict';

// ----------変数・定数----------
let playScreen = ''; //ゲームプレイ画面用HTMLを格納する
let inputWord = ''; //入力された文字を保存
let hanteiWord = ''; //入力された文字を保存
let hanteiNo = 0; //入力中の文字のうち、あっている場所を保存する
let saveWord = ''; //入力中の文字列のうち、あっている文字まで保存する
let s = 15; //秒数用
let tangoNo = 0; //questionへの単語出力用
let usedList = []; //使用済みtangoNo格納用
let mondai = 1; //問題数カウント用
let hantei = 0; //関数tangoNowの判定用、0は問題なし、1は問題あり
let timeId = ''; //関数timerを止めるために使用

// ----------function----------
// スタートボタンを押すと作動
let gameStart = document.querySelector('.startButton');
gameStart.addEventListener('click',startGame);

function startGame() {
    console.log('startButton');
    // h1要素、button要素を削除
    if(document.querySelector('.typingTitle') != null) {
        let typingTitle = document.querySelector('.typingTitle');
        typingTitle.remove();
    }

    if(document.querySelector('.startButton') != null) {
        let startButton = document.querySelector('.startButton');
        startButton.remove();
    }

    // result要素を削除（結果画面用）
    if(document.querySelector('.result') != null) {
        let result = document.querySelector('.result');
        result.remove();
        // リセット
        s = 15; //秒数リセット
        usedList = []; //使用済みtangoNoリセット
        mondai = 1; //問題数のカウントリセット
    }

    // ゲームプレイ画面を出力
    playScreen = 
    `<div class="qHeader">
        <h2 class="questionNo">1問目</h2>
        <p class="elapsedTime">経過時間：<span>0秒</span></span></p>
    </div>
    <div class="question">test</div>
    <form id="typingForm">
        <input type="text" name="typingInput" id="typingInput" value="">
    </form>`;
    document.querySelector('main').insertAdjacentHTML('beforeend',playScreen);
    // 単語を出力させる
    tangoNow();
    // 入力判定
    inputWord = document.getElementById('typingInput'); //入力された文字を保存
    inputWord.addEventListener('input',function(){ //入力されたら作動
        console.log(inputWord.value); //確認用
        hanteiWord = inputWord.value; //hanteiWordへ入力された文字列を保存
        if(hanteiWord[hanteiNo] === tangoList[tangoNo][hanteiNo]) { //入力された文字の特定箇所と、問題となる単語の特定箇所があっていればtrue
            saveWord = hanteiWord; //一時保存用の変数（saveWord）へ、入力された文字を入れる
            document.getElementById('typingInput').value = saveWord; //HTML側へ、saveWordを反映
            hanteiNo++; //判定対象となる文字を、1つ先のものに変更
            console.log(hanteiNo); //確認用
        } else {
            document.getElementById('typingInput').value = saveWord; //saveWordに保存されている文字列をHTMLへ反映（誤った文字をHTML側に反映させないため）
            console.log('miss'); //確認用
        }
        //hanteiWordとsaveWordの文字数が合致したら作動
        if(saveWord.length === tangoList[tangoNo].length) {
            if(mondai !== tangoList.length) { //「問題数とtangoListの中の文字列の数が合致しない」場合はtrue

                //問題数のカウントを増やす
                mondai++;

                //新しい単語を出力させる
                tangoNow();

                //問題数更新
                document.querySelector('.questionNo').textContent = `${mondai}問目`;

                //フォーム画面をリセット
                document.getElementById('typingInput').value = '';

                //hanteiNo、saveWordをリセット
                hanteiNo = 0;
                saveWord = '';
            } else {
                resultOutput();
            }
        }
    });
    // 入力フィールドにフォーカスを設定（DOMに追加された後にフォーカスを設定したいため、この箇所に記載）
    setTimeout(function() {
        document.getElementById('typingInput').focus();
    }, 0);
    // タイマー作動
    timer();
}

// 結果画面出力用
function resultOutput() {
    //プレイ画面を削除
    let qHeader = document.querySelector('.qHeader');
    let question = document.querySelector('.question');
    let typingForm = document.getElementById('typingForm');
    qHeader.remove();
    question.remove();
    typingForm.remove();
    //結果画面を出力
    playScreen = 
    `<h1 class="typingTitle">結果</h1>
    <p class="result">入力できた単語数は<span class="typeOutput"></span>つ、タイムは<span class="timeOutput"></span>でした</p>
    <button class="startButton">もう一度</button>`;
    document.querySelector('main').insertAdjacentHTML('beforeend',playScreen);
    if(s === 0) {
        document.querySelector('.typeOutput').textContent= mondai-1; //入力できた単語数を表示
    } else {
        document.querySelector('.typeOutput').textContent= mondai; //入力できた単語数を表示
    }
    document.querySelector('.timeOutput').textContent= `${15-s}秒`; //秒数を表示

    //新しくできたボタンにイベントリスナーを設定
    let newGameStart = document.querySelector('.startButton'); 
    newGameStart.addEventListener('click',startGame);

    //hanteiNo、saveWordをリセット
    hanteiNo = 0;
    saveWord = '';
    clearTimeout(timeId); //setTimeoutをキャンセル
}

// 時間計測用
function timer() {
    //秒数が0秒以下になったら作動
    if(s <= 0) {
        resultOutput(); //結果画面を出力
    }
    if(document.querySelector('.elapsedTime span') != null) {
        document.querySelector('.elapsedTime span').textContent = `${s}秒`;
        s--;
        timeId = setTimeout(timer,1000);
    }
}

// 問題となる単語出力用
function tangoNow() {
    // 問題となる単語の配列番号をランダムに出力
    tangoNo = Math.floor(Math.random()*tangoList.length);
    // 同じ単語を出させないようにする
    usedList.forEach(function(item,index){
        if(item === tangoNo) { //これまで出題された数値と同じものがないか確認する。同じものがあれば判定用の変数（hantei）に1を代入
            hantei=1;
        }
    });
    if(hantei !== 1) { //hanteiが1（＝同じ単語がある）でない場合、HTML側へ単語を反映
        document.querySelector('.question').textContent = tangoList[tangoNo];
        usedList[mondai-1] = tangoNo; //使用済みの番号を専用配列（usedList）へ格納
    } else {
        hantei = 0; //判定初期化
        tangoNow(); //もう一度やり直す
    }
}