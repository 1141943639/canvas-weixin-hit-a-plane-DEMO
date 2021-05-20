import { test } from "./common.js";

export function enemyHandle(canvas, ctx, img, Rect) {
  // 解构图片
  const {
    enemy0: { enemy0, enemy0_down1, enemy0_down2, enemy0_down3 },
    enemy1: { enemy1, enemy1_down1, enemy1_down2, enemy1_down3, enemy1_hit },
    enemy2: {
      enemy2,
      enemy2_n2,
      enemy2_down1,
      enemy2_down2,
      enemy2_down3,
      enemy2_down4,
      enemy2_down5,
      enemy2_hit
    }
  } = img;

  // 敌机数量
  const maxLength = 15;

  // 敌机列表
  let enemyList = {
    intergral: 0
  };

  // 敌机下标
  let id = 0;

  // 初始化敌机

  for (let i = 0; i < maxLength; i++) {
    genEnemyAir();
  }

  // 创建敌机
  function genEnemyAir() {
    // 敌机类型
    const type = genType();

    // 敌机图片
    const image = img["enemy" + type]["enemy" + type];

    // 敌机初始x坐标
    const x = random(canvas.width - image.width, image.width);

    // 敌机初始y坐标
    const y = -random(canvas.height, image.height);

    // 敌机速度
    let speed = 1;

    // 随机更改敌机速度
    const num = random(10, 0);
    if (num >= 6) {
      speed = 3;
    } else if (num >= 4) {
      speed = 2;
    }

    // 敌机对象
    const enemy = new Rect(
      ctx,
      x,
      y,
      image.width / 2,
      image.height / 2,
      image,
      speed,
      type
    );

    // 当两个敌机重合时重新创建
    if (test(enemy, enemyList)) {
      genEnemyAir();
    } else {
      // 否则直接创建敌机

      // 给敌机对象加入移动方法（方便统一渲染）
      enemy.move = enemyAirAni;

      // 在敌机列表里添加敌机
      enemyList[id] = enemy;
      id++;
    }
  }

  // 敌机移动动画
  function enemyAirAni(i, lose) {
    // i ：当前敌机的id
    // lose ：玩家飞机是否被击落

    const enemy = this;

    a();
    function a() {
      // 解构敌机对象
      let {
        x,
        y,
        width,
        height,
        img: image,
        type,
        isHit,
        maxHit,
        hit,
        distroy,
        distroyed,
        distroyAniL,
        distroyAniM
      } = enemy;

      // 被击中次数是否达到最大值
      const Hited = isHit >= maxHit;

      // 当前飞机类型的图片库
      const enemyImage = img["enemy" + type];

      // 当飞机被击中
      if (hit) {
        // 渲染被击中的图片
        ctx.drawImage(
          enemyImage["enemy" + type + "_hit"],
          x,
          y,
          width,
          height + 5
        );
        enemyList[i].hit = false;
      }

      // 当被击中的次数达到最大值 并且 没有坠毁
      if (Hited && !distroy) {
        // 坠毁动画
        const timer = setInterval(() => {
          // 切换坠毁图片
          enemyList[i]
            ? (enemyList[i].img =
                enemyImage["enemy" + type + "_down" + ++distroyAniL])
            : "";

          // 当动画次数达到最大值
          if (distroyAniL > distroyAniM) {
            // 清除定时器
            clearInterval(timer);

            // 讲飞机设置为完全坠毁
            distroyed = true;

            // 从飞机列表里删除此飞机
            delete enemyList[i];

            // 当玩家没有被击毁  生成新飞机
            !lose && genEnemyAir();
          }
        }, 100);

        // 加积分
        enemyList.intergral += addIntergral(type);

        // 将飞机设置成正在坠毁
        enemyList[i].distroy = true;
      }

      // 当类型是 2 的飞机 并且 没有坠毁
      if (type === 2 && !distroy) {
        // 播放飞行动画
        enemyList[i].gif(
          enemyImage["enemy" + type],
          enemyImage["enemy" + type + "_n2"]
        );
      }

      // 当飞机的 y 坐标没有超出视窗范围 并且 没有坠毁
      if (y <= canvas.height && !distroyed) {
        // 移动飞机
        enemy.moveY("down");
      } else if (!distroyed) {
        // 否则

        // 从列表中删除此飞机
        delete enemyList[i];

        // 当玩家没有被击毁  生成新飞机
        !lose && genEnemyAir();
      }
    }
  }

  // 随机类型
  function genType() {
    // 创建随机数
    const num = random(10, 0);

    if (num === 10) {
      return 2;
    } else if (num >= 8) {
      return 1;
    } else if (num <= 7) {
      return 0;
    }
  }

  // 随机坐标
  function random(max, min) {
    // 创建随机数           随机数乘以最大值的位数
    let num = Math.floor(Math.random() * mul(max));

    if (num <= max && num >= min) {
      return num;
    } else {
      return random(max, min);
    }
  }

  // 拿到最大值的位数
  function mul(v) {
    const len = String(v).length;
    let num = 1;
    for (let i = 0; i <= len - 1; i++) {
      num *= 10;
    }
    return num;
  }

  // 加积分
  function addIntergral(type) {
    switch (type) {
      // 类型 0 加 100 积分
      case 0:
        return 100;
      // 类型 1 加 600 积分
      case 1:
        return 600;
      // 类型 2 加 20000 积分
      case 2:
        return 20000;
    }
  }

  // 返回敌机列表
  return enemyList;
}
