const back = (s, v) => {
  s.backgroundColor = v;
};
const TableRenderer = class extends Renderer {
  // style 파람이 추가된 이유는 외부에서 스타일을 지정가능하게
  constructor(col, row, back, style) {
    // el('table')은 부모에게 어디에 그려져야 할지
    super(col, row, el('table'), back);
    const {
      base,
      blocks
    } = this;
    base.style.cssText = style;
    let i = row;
    while(i--) {
      // 결과값으로 인자를 넘겨준다. - appendChild()
      const tr = base.appendChild(el('tr'));
      const curr = [];
      let j = col;
      blocks.push(curr);
      while(j--) {
        curr.push(tr.appendChild(el('td')).style);
      }
    }
  }
  clear() {
    this.blocks.forEach(curr =>
      curr.forEach(s =>
        back(s, this.back)
      )
    );
  }
  _render(v) {
    // v 로는 data가 오는데 이 data는 이미 부모에서 검증했기에 믿고 쓴다.
    this.blocks.forEach(
      (curr, i) =>
        curr.forEach((s, j)
          => back(s, v[i][j])
        )
    );
  }
};

// 추상화 레이어를 구성할 경우 추상화 레이어와 구상화 레이어간의 통신도 굉장히 중요하다.