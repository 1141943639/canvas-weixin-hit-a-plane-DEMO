//
// 背景图片
//
export function backgroundHandle(canvas, ctx, img, Rect) {
  // 背景图片移动速度
  const bgSpeed = -2;
  const bgImage = new Rect(
    ctx,
    0,
    0,
    canvas.width,
    canvas.height,
    img,
    bgSpeed
  );

  const bgImageCopy = new Rect(
    ctx,
    0,
    -canvas.height,
    canvas.width,
    canvas.height,
    img,
    bgSpeed
  );

  bgMove();

  // 背景图片移动动画
  function bgMove() {
    bgImage.moveY("up");
    bgImageCopy.moveY("up");

    if (bgImage.y > canvas.height) {
      bgImage.y = 0;
      bgImageCopy.y = -canvas.height;
    }
  }

  return {
    bgImage,
    bgImageCopy,
    bgMove
  };
}
