import { start } from "./start/start.js";
const canvas = document.getElementsByClassName("canvas")[0];
const ctx = canvas.getContext("2d");

// 预加载图片
const img = {
  background: {
    background: new Image()
  },
  bullet1: {
    bullet1: new Image()
  },
  bullet2: {
    bullet2: new Image()
  },
  enemy0: {
    enemy0: new Image(),
    enemy0_down1: new Image(),
    enemy0_down2: new Image(),
    enemy0_down3: new Image()
  },
  enemy1: {
    enemy1: new Image(),
    enemy1_down1: new Image(),
    enemy1_down2: new Image(),
    enemy1_down3: new Image(),
    enemy1_hit: new Image()
  },
  enemy2: {
    enemy2: new Image(),
    enemy2_n2: new Image(),
    enemy2_down1: new Image(),
    enemy2_down2: new Image(),
    enemy2_down3: new Image(),
    enemy2_down4: new Image(),
    enemy2_down5: new Image(),
    enemy2_hit: new Image()
  },
  hero: {
    hero1: new Image(),
    hero2: new Image(),
    hero_blowup_n1: new Image(),
    hero_blowup_n2: new Image(),
    hero_blowup_n3: new Image()
  },
  start: {
    game_start: new Image()
  },
  stop: {
    game_stop: new Image()
  },
  restart: {
    restart: new Image()
  }
};

let num = 0;

ergodic(img, "img");
// 给图片加地址
function ergodic(obj, key) {
  for (const prop in obj) {
    // 是对象就进入对象里
    if (Object.prototype.toString.call(obj[prop]) === "[object Object]") {
      ergodic(obj[prop], key + "/" + prop);
    } else {
      // 写入地址
      obj[prop].src = "./" + key + "/" + prop + ".png";

      // 计数
      num++;

      // 添加事件
      obj[prop].onload = () => {
        // 当所有图片加载完毕
        if (!--num) {
          start(canvas, ctx, img);
        }
      };
    }
  }
}
