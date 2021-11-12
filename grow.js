'use strict';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageNames = ['dino','growup2','green128'];
const limitXPlusOb = canvas.width;
const limitYPlusOb = canvas.height;

const game = {
  counter: 0, //何個餌をあげたか
  like:0,
  dislike:0,
  distance:0,
  image: {},
  love: 0,
  timer:null,
  elapsed:0
};

//箱を描画

//複数画像読み込み
let imageLoadCounter = 0;
for (const imageName of imageNames) {
  const imagePath = `images/${imageName}.png`;
  game.image[imageName] = new Image();
  game.image[imageName].src = imagePath;
  game.image[imageName].onload = () => {
    imageLoadCounter += 1;
    if(imageLoadCounter === imageNames.length) {
      console.log('画像のロードが完了しました。');
      init();
    }
  }
}

function init(){
  game.counter = 0;
  game.love = 0;
  game.like = 0;
  game.dislike = 0;
  game.distance = 0;
  game.elapsed = 0;
  /*
  ctx.drawImage(game.image.dino,10,100);
  ctx.drawImage(game.image.growup2,20,100);
  ctx.drawImage(game.image.green128,30,100);
  */

  createPet();
  game.timer = setInterval(ticker, 30);
}

function ticker() {
  //画面クリア
  ctx.clearRect(0,0,canvas.width,canvas.height);

  //キャラクターの移動
  movePet();
  movePetX();

  tickMoveY();
  tickMoveX();
  //描画
  drawPet();
//テスト用経過時間の表示
  //drawElapsed();

  //カウンターの更新
  game.elapsed +=1;
  game.counter = (game.counter + 1) % 1000000;
}

//テスト用経過時間の表示
function drawElapsed() {
  ctx.font = '24px serif';
  ctx.fillText(`elapsed: ${game.elapsed + 1}`,0,30);
}

function createPet() {
  game.growup2 = {
    x: game.image.growup2.width / 2,
    y: canvas.height - game.image.growup2.height / 2,
    moveY: 0,
    moveX: 0,
    width: game.image.growup2.width,
    height: game.image.growup2.height,
    image: game.image.growup2
  }
}

//Y方向への移動
function movePet() {
  game.growup2.y += game.growup2.moveY;
 if(game.growup2.y >= canvas.height - game.growup2.height / 2){
   game.growup2.y = canvas.height-game.growup2.height / 2;
   game.growup2.moveY = 0;
 }else {
   game.growup2.moveY += 3;
 }
}

//x方向への移動
function movePetX(){
  game.growup2.x += game.growup2.moveX;
  if(game.growup2.x >= canvas.width - game.growup2.width / 2){
    game.growup2.x = canvas.width - game.growup2.width / 2;
    game.growup2.moveX = 0;
  }else if(game.growup2.x <= 0 + game.growup2.width / 2) {
    game.growup2.x = 0 + game.growup2.width / 2;
    game.growup2.moveX = 0;
  }
  
}

function drawPet(){
  ctx.drawImage(game.image.growup2, game.growup2.x - game.growup2.width / 2,game.growup2.y - game.growup2.height / 2);
}

//テスト用Y方向移動
document.onkeydown = function(e) {
  if(e.key === 'w' && game.growup2.moveY === 0) {
    game.growup2.moveY = -41;
  }
  if(e.key === 'd') {
    game.growup2.moveX = 2;
  }
  if(e.key === 'a') {
    game.growup2.moveX = -2;
  }
 
};

//半分の確立でtrueかfalseを返す
function ranHalf(){
  let num = 0;
  num = Math.floor(Math.random() * 100);

  if(num <= 50){
    return true;
  }else{
    return false;
  }
}

//x用にランダムに2か-2を出す。

function ranNumX(){
  if(ranHalf() === true) {
    return 2;
  }else {
    return -2;
  }
}

//Y用にランダムにtrueかfalseを返す
function ranTrueFalse(){
  let num = 0;
  num = Math.floor(Math.random() * 100);

  if(num <= 30){
    return true;
  }else {
    return false;
  }
}

//時間ごとにｙ方向に動く

function tickMoveY() {

  if (game.elapsed % 20 === 0) {
    if (ranTrueFalse() && game.growup2.moveY === 0) {
      game.growup2.moveY = -41;
    }
  }
}

function tickMoveX(){
  if(game.elapsed % 20 === 0) {
    game.growup2.moveX = ranNumX();
  }
}