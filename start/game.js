import { testIn } from "./common.js";

export function game(canvas, ctx, img, Rect) {
  const { game_stop: imageStop, game_start: imageStart } = img;

  const stop = new Rect(
    ctx,
    canvas.width - imageStop.width - 15,
    10,
    imageStop.width,
    imageStop.height,
    imageStop
  );
  stop.isClick = false;
  const start = new Rect(
    ctx,
    canvas.width / 2 - imageStart.width / 2,
    canvas.height / 2 - imageStart.height / 2,
    imageStart.width,
    imageStart.height,
    imageStart
  );

  canvas.addEventListener("click", event => {
    const e = event || window.event;
    const x = e.x - canvas.offsetLeft;
    const y = e.y - canvas.offsetTop;

    if (testIn(x, y, stop) && !stop.isClick) {
      stop.isClick = true;
    } else if (testIn(x, y, start) && stop.isClick) {
      stop.isClick = false;
    }
  });

  return { stop, start };
}
