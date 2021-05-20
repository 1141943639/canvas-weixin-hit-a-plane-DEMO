// 检查当前飞机是否和其他飞机重合
export function test(enemy, enemyList) {
  const obj = enemyList;

  // 解构当前飞机
  const { left, top, right, bottom } = enemy;

  // 当对象不为空
  if (Object.keys(obj).length) {
    for (const prop in obj) {
      const item = obj[prop];

      // 当目标飞机未被击毁 并且 重合时
      if (!item.distroy && equalJudge(item)) {
        return true;
      }
    }
  }
  return false;

  // 检测核心代码
  function equalJudge(item) {
    // 如果目标飞机被完全击毁则不执行
    if (item.distroyed) return;

    // 从目标的左边进入时
    if (right >= item.left && right <= item.right) {
      if (
        // （当前 小于于或等于 目标）
        // 当前的上边进入到目标的里面时
        (top >= item.top && top <= item.bottom) ||
        // 当前的下边进入到目标的里面时
        (bottom >= item.top && bottom <= item.bottom) ||
        // （当前 大于或等于 目标）
        // 当前进入目标时
        (item.top >= top && item.bottom <= bottom)
      ) {
        return true;
      }
    }

    // 从目标的右边进入时
    else if (left <= item.right && left >= item.left) {
      if (
        // （当前 小于于或等于 目标）
        // 当前的上边进入到目标的里面时
        (top >= item.top && top <= item.bottom) ||
        // 当前的下边进入到目标的里面时
        (bottom >= item.top && bottom <= item.bottom) ||
        // （当前 大于或等于 目标）
        // 当前进入目标时
        (item.top >= top && item.bottom <= bottom)
      ) {
        return true;
      }
    }

    // 从目标的下边进入时
    else if (top <= item.bottom && top >= item.top) {
      if (
        // 当前的左右 小于或等于 目标的左右
        (left >= item.left && right <= item.right) ||
        (item.left >= left && item.right <= right)
      ) {
        return true;
      }
    } else if (bottom >= item.top && bottom <= item.bottom) {
      if (
        (left >= item.left && right <= item.right) ||
        (item.left >= left && item.right <= right)
      ) {
        return true;
      }
    }
  }
}

export function testIn(x, y, target) {
  const { left, right, top, bottom } = target;

  if (x >= left && y >= top && x <= right && y <= bottom) {
    return true;
  }
}
