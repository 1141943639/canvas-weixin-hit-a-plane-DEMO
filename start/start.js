import { Rect, Text } from "./class.js";

import { backgroundHandle } from "./background.js";
import { fighterHandle } from "./fighter.js";
import { shootHandle } from "./shoot.js";
import { enemyHandle } from "./enemy.js";
import { game } from "./game.js";
import { lose } from "./lose.js";

export function start(canvas, ctx, img) {
  //
  // 解构图片对象
  //
  const {
    background: { background },
    bullet1: { bullet1 },
    bullet2: { bullet2 },
    enemy0,
    enemy1,
    enemy2,
    hero,
    start: { game_start },
    stop: { game_stop },
    restart: { restart }
  } = img || {};

  //
  // 背景图片处理
  //
  const { bgImage, bgImageCopy, bgMove } = backgroundHandle(
    canvas,
    ctx,
    background,
    Rect
  );

  //
  // 敌机处理
  //
  let enemyList = enemyHandle(
    canvas,
    ctx,
    {
      enemy0,
      enemy1,
      enemy2
    },
    Rect
  );

  //
  // 玩家战机处理
  //
  let fighter = fighterHandle(canvas, ctx, hero, Rect);

  //
  // 子弹发射处理
  //
  let shootArr = shootHandle(ctx, fighter, enemyList, bullet1, bullet2, Rect);

  //
  // 暂停和开始
  //
  const { stop, start } = game(canvas, ctx, { game_start, game_stop }, Rect);

  let loseObj = lose(canvas, ctx, restart, Rect);
  let { title, score, restartHandle } = loseObj;

  //
  // 统一渲染
  //
  allRender();
  function allRender() {
    // 检测玩家是否被击毁
    const isLose = fighter.lose;
    const isRestart = restartHandle.restart;

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 背景图片渲染
    bgImage.draw();
    bgImageCopy.draw();
    !stop.isClick && bgMove();

    // 玩家战机渲染
    if (!fighter.distroyed) {
      fighter.draw();
      !stop.isClick && fighter.moving(enemyList);
    }

    // 敌机渲染
    for (const prop in enemyList) {
      if (Number(prop) === 0 || Number(prop)) {
        const item = enemyList[prop];
        item.draw();
        !stop.isClick && item.move(prop, isLose);
      }
    }

    // 子弹渲染
    if (!fighter.distroyed) {
      for (const shoot in shootArr) {
        if (Number(shoot) === 0 || Number(shoot)) {
          const bullet = shootArr[shoot];
          bullet.draw();
          !stop.isClick && bullet.move(shoot);
        }
      }
      shootArr.isFire(stop.isClick);
    }

    // 分数渲染
    ctx.font = "30px Arial";
    ctx.fillText(String(enemyList.intergral), 8, 30);

    stop.draw();
    stop.isClick && start.draw();

    if (fighter.distroyed) {
      title();
      score(enemyList.intergral);
      restartHandle.draw();
      restartHandle.allowClick = true;
    }

    if (isRestart) {
      enemyList = enemyHandle(
        canvas,
        ctx,
        {
          enemy0,
          enemy1,
          enemy2
        },
        Rect
      );
      fighter = fighterHandle(canvas, ctx, hero, Rect);
      shootArr = shootHandle(ctx, fighter, enemyList, bullet1, bullet2, Rect);
      loseObj = lose(canvas, ctx, restart, Rect);
      restartHandle = loseObj.restartHandle;
    }

    requestAnimationFrame(allRender);
  }
}
