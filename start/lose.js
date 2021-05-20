import { testIn } from "./common.js";

export function lose(canvas, ctx, img, Rect) {
  const titleTxt = "你的最终得分";
  function title() {
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillText(
      titleTxt,
      canvas.width / 2 - ctx.measureText(titleTxt).width / 2,
      canvas.height / 2 - 30 - 50
    );
    ctx.closePath();
  }

  function score(intergral) {
    const str = String(intergral);
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillText(
      str,
      canvas.width / 2 - ctx.measureText(str).width / 2,
      canvas.height / 2 - 15
    );
  }

  const restartHandle = new Rect(
    ctx,
    canvas.width / 2 - img.width / 2,
    canvas.height / 2 - img.height / 2 + 50,
    img.width,
    img.height,
    img
  );
  restartHandle.restart = false;
  restartHandle.allowClick = false;

  canvas.addEventListener("click", click);
  function click(event) {
    const e = event || window.event;
    const x = e.x - canvas.offsetLeft;
    const y = e.y - canvas.offsetTop;

    if (testIn(x, y, restartHandle) && restartHandle.allowClick) {
      restartHandle.restart = true;
      canvas.removeEventListener("click", click, false);
    }
  }

  return { title, score, restartHandle };
}
