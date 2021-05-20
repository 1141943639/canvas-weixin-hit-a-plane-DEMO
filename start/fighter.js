import { test, testIn } from "./common.js";

export function fighterHandle(canvas, ctx, hero, Rect) {
  const { hero1, hero2, hero_blowup_n1, hero_blowup_n2, hero_blowup_n3 } = hero;

  //
  // 创建玩家飞机
  //

  let fighterDir = null;

  const fighter = new Rect(
    ctx,
    canvas.width / 2 - hero2.width / 4,
    canvas.height / 2,
    hero2.width / 2,
    hero2.height / 2,
    hero2,
    5,
    "fighter"
  );

  fighter.moving = moveFighterAni;

  //
  // 控制移动(键盘)
  //
  document.addEventListener("keydown", function(event) {
    const e = event || window.event;
    const code = e.keyCode;
    // 检测是否是上下左右按键触发了
    if (code <= 40 && code >= 37) {
      const dir = changeDir(code);
      fighterDir = dir;
    }
  });

  document.addEventListener("keyup", function(event) {
    const e = event || window.event;
    const code = e.keyCode;
    // 检测是否是上下左右按键触发了
    if (code <= 40 && code >= 37) {
      const dir = changeDir(e.keyCode);
      dir === fighterDir ? (fighterDir = null) : "";
    }
  });

  //
  // 控制移动（鼠标）
  //
  canvas.addEventListener("mousedown", function(event) {
    const e = event || window.event;
    const x = e.x - canvas.offsetLeft;
    const y = e.y - canvas.offsetTop;

    if (testIn(x, y, fighter)) {
      canvas.addEventListener("mousemove", mousemove);
      function mousemove(event) {
        const e = event || window.event;
        const x = e.x - canvas.offsetLeft;
        const y = e.y - canvas.offsetTop;

        fighter.x = x - fighter.width / 2;
        fighter.y = y - fighter.height / 2;
      }

      canvas.addEventListener("mouseup", function() {
        canvas.removeEventListener("mousemove", mousemove, false);
      });

      canvas.addEventListener("mouseleave", function() {
        document.addEventListener("mouseup", function() {
          canvas.removeEventListener("mousemove", mousemove, false);
        });
      });
    }
  });

  function changeDir(keyCode) {
    switch (keyCode) {
      case 37:
        return "left";
      case 38:
        return "top";
      case 39:
        return "right";
      case 40:
        return "bottom";
    }
  }

  // 玩家飞机移动动画
  function moveFighterAni(enemyList) {
    let { distroy, distroyAniL, distroyAniM } = fighter;
    if (test(fighter, enemyList) && !distroy) {
      const timer = setInterval(() => {
        fighter.img
          ? (fighter.img = hero["hero_blowup_n" + ++distroyAniL])
          : "";

        if (distroyAniL > distroyAniM) {
          clearInterval(timer);
          fighter.distroyed = true;
        }
      }, 100);

      fighter.lose = true;
      fighter.distroy = true;
    }

    !distroy && fighter.gif(hero1, hero2);

    fighter.move(fighterDir);
  }

  return fighter;
}
