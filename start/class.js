// 飞机类
export class Rect {
  // 属性
  constructor(ctx, x, y, width, height, img, speed, type) {
    // 坐标x
    this.x = x;
    // 坐标y
    this.y = y;
    // 高度
    this.height = height;
    // 宽度
    this.width = width;
    // 图片
    this.img = img;
    // 移动速度
    this.speed = speed;
    // canvas上下文
    this.ctx = ctx;
    // 被击中的次数
    this.isHit = 0;
    // 被击中的最大次数
    this.maxHit = 0;
    // 飞机类型
    this.type = type;
    // 是否正在坠毁
    this.distroy = false;
    // 击毁完全坠毁
    this.distroyed = false;
    // 击毁动画
    this.distroyAniL = 0;
    // 击毁动画最大次数
    this.distroyAniM = 0;
    // 飞行动画
    this.animation = 0;
    // 飞行动画最大时间
    this.animationMax = 10;
    this.isAnimation = false;

    // 四条边
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + this.width;
    this.bottom = this.y + this.height;

    switch (this.type) {
      // 类型是玩家
      case "fighter":
        // 被击中最大次数
        this.maxHit = 1;
        // 击毁动画最大次数
        this.distroyAniM = 3;
        this.lose = false;
        break;
      case 0:
        this.maxHit = 1;
        this.distroyAniM = 3;
        break;
      case 1:
        this.maxHit = 3;
        this.distroyAniM = 3;
        // 是否被击中
        this.hit = false;
        break;
      case 2:
        this.maxHit = 10;
        this.distroyAniM = 5;
        this.hit = false;
        break;
    }
  }

  // 渲染
  draw(mixin) {
    this.ctx.beginPath();
    mixin ? (this.ctx.globalCompositeOperation = mixin) : "";
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.ctx.closePath();

    this.refresh();
  }

  // 移动
  move(dir) {
    switch (dir) {
      case "top":
        this.y -= this.speed;
        break;
      case "right":
        this.x += this.speed;
        break;
      case "bottom":
        this.y += this.speed;
        break;
      case "left":
        this.x -= this.speed;
        break;
    }

    this.refresh();
  }

  // 移动y坐标
  moveY(dir) {
    if (dir === "up") {
      this.y -= this.speed;
    } else if (dir === "down") {
      this.y += this.speed;
    }
    this.refresh();
  }

  // 刷新四条边
  refresh() {
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + this.width;
    this.bottom = this.y + this.height;
  }

  // 飞行动画
  gif(img1, img2) {
    // 当间隔时间到后
    if (this.animation >= this.animationMax) {
      // 动画播放时间清零
      this.animation = 0;
      this.isAnimation = !this.isAnimation;
    } else if (this.isAnimation) {
      this.img = img1;
      this.animation++;
    } else if (!this.isAnimation) {
      this.img = img2;
      this.animation++;
    }
  }
}

export class Text {
  constructor(ctx, x, y, text, style, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.style = style;
    this.text = text;
    this.color = color;
    this.width = this.ctx.measureText(this.text);
  }

  _text() {
    this.ctx.beginPath();
    this.style ? (this.ctx.font = this.style) : "";
    this.color ? (this.ctx.fillStyle = this.color) : "";
    this.ctx.fillText(this.text, this.x, this.y);
    this.ctx.closePath();
  }

  refresh(canvas) {
    this.x = canvas.width / 2 - this.ctx.measureText(this.text).width;
  }
}
