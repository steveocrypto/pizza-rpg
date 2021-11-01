import { CustomEventDetail, Direction } from "types";

export function withGrid(n: number) {
  return n * 16;
}

export function asGridCoord(x: number, y: number) {
  return `${x * 16},${y * 16}`;
}

export function nextPosition(initialX: number, initialY: number, direction: Direction) {
  let x = initialX;
  let y = initialY;
  const size = 16;

  switch (direction) {
    case "left":
      x -= size;
      break;
    case "right":
      x += size;
      break;
    case "up":
      y -= size;
      break;
    case "down":
      y += size;
      break;
    default:
      break;
  }

  return { x, y };
}

export function oppositeDirection(direction: Direction) {
  switch (direction) {
    case "left":
      return "right";
    case "right":
      return "left";
    case "up":
      return "down";
    case "down":
      return "up";
  }
}

export function emitEvent(name: string, detail: CustomEventDetail) {
  const event = new CustomEvent(name, {
    detail: {
      whoId: detail.whoId,
    },
  });
  document.dispatchEvent(event);
}
