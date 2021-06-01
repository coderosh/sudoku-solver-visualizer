export default class Square {
  public el: HTMLDivElement;
  constructor(row: number, col: number, public val: number) {
    this.val = val;
    this.el = document.querySelector(`.row-${row} .col-${col}`)!;
  }

  display() {
    this.el.innerHTML = this.val === 0 ? "" : String(this.val);
    return this;
  }

  background(color = "lightgreen") {
    this.el.style.backgroundColor = color;
  }
}
