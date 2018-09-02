// TODO 점수 및 계산법
const Score = class {
  init(listener) {
    this.listener = listener;
  }
  clear() {
    this.curr = this.total = 0;
  }
  add(line, stage) {
    const score = parseInt((stage * 5) * (2 ** line));
    this.curr += score, this.total += score;
    this.listener();
  }
  [Symbol.toPrimitive](init) {
    return `<div>Score ${this.curr} / ${this.total}</div>`;
  }
}