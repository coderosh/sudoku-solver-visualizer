export function sleep(ms = 500) {
  return new Promise((res) => setInterval(res, ms));
}

export function getSpeed() {
  return (
    +document.querySelector("input")!.max -
    +document.querySelector("input")!.value
  );
}
