export function shootHandle(ctx, fighter, enemyList, bullet1, bullet2, Rect) {
  // 发射子弹
  let shootInterval = 250; // 发射间隔
  let shootArr = {
    isFire: isFire
  }; // 发射出去的子弹数量
  let id = 0;

  function isFire(bln) {
    if (bln && timer) {
      clearInterval(timer);
      timer = null;
    } else if (!bln && !timer) {
      timer = setInterval(() => {
        shootHandle();
      }, shootInterval);
    }
  }

  // 发射子弹的定时器
  let timer = setInterval(() => {
    shootHandle();
  }, shootInterval);

  // 发射处理
  function shootHandle() {
    const img = bullet1;
    const shoot = new Rect(
      ctx,
      fighter.x + fighter.width / 2 - 2,
      fighter.y,
      img.width / 2,
      img.height / 2,
      img,
      10
    );
    shoot.move = shootAni;

    shootArr[id] = shoot;
    id++;
  }

  // 发射动画
  function shootAni(i) {
    const shoot = this;
    a();
    function a() {
      const { left, top, right, bottom, height } = shoot;
      let isHit = null;
      for (const prop in enemyList) {
        const item = enemyList[prop];
        if (
          top <= item.bottom &&
          bottom >= item.bottom &&
          left >= item.left &&
          right <= item.right &&
          !item.distroy
        ) {
          item.isHit++;
          isHit = true;
          item.hit === false ? (item.hit = true) : "";
        }
      }

      if (top > -height && !isHit) {
        shoot.moveY("up");
      } else {
        delete shootArr[i];
        return false;
      }
    }
  }
  return shootArr;
}
