const CanvasRenderer = class extends Renderer {
  constructor(col, row, back, style) {
    super(col, row, el('canvas'));
    const { blocks } = this;
    base.style.cssText = style;
    Object.assign(this, {
      width: base.width = parseInt(base.style.width, 10),
      height: base.height = parseInt(base.style.height, 10),
      // es6 이후부터 객체가 순차적으로 평가되기에 base.width는 값이 할당되어있다.
      cellSzie: [base.width / col, base.height / row],
      ctx: base.getContext('2d'),
    });
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  _render(v) {
    this.clear();
    const { col, ctx, cellSize: [w, h] } = this;
    let { row: i } = this;
    while(i--) {
      let j = col;
      while(j--) {
        ctx.fillStyle = v[i][j];
        ctx.fillRect(j * w, i * h, w, h);
      }
    }
  }
};