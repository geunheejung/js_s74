// TODO 화면에 그림을 그린다.
/*
  렌더러는 주어진 게임 페널인 회색 박스만 그려준다.
 */
const Renderer = class {
  // base 가 있어야 렌더러가 그려준 부분을 Game이 가져와 끼워넣어야지 전체 게임 모습이 완성되기에
  // base 프로퍼티가 필요하 ex) table element, canvers element
  constructor(col, row, base, back) {
    Object.assign(this, {
      col,
      row,
      base,
      back,
      blocks: [],
    });
  }
  // TODO 화면 클리어
  clear() {
    // 순수하게 js 코드만 있어야되기에 네이티브 코드가 존재하면 안된다.
    throw 'override';
  }
  // TODO data를 받아서 그림을 그린다.
  /*
  - 템플릿 메서드 패턴이라 부른다.
    부모 클래스에 존재하는 공통적인 메서드는 템플릿 역할을 하고
    자식 클래스에서는 이 템플릿의 일부만 구현하기에 템플릿 메소드 패턴이라 한다.
  - 형(Type) 계약 : 강타입 체크
    이 data는 Data 를 지켰기에 이 값 자체를 믿는 것(벨리데이션, 검증) 등 모든 것이 완성됬다고
    data 는 어차피 2차원 배열임에도 Data 라는 클래스로 만들어서 보낸 이유는
    이러하지 않으면 그 2차원 배열을 작정하고 Data 프로토콜을 지킨 data 인지 체크할 수 없기 때문이다.
   */
  render(data) {
    // 올바른 프로토콜을 지킨 data 인지 체크하는것은 공통적인 역할이기에 추상화 레벨에서 처리한다.
    if (!(data instanceof Data)) throw 'invaild data';
    // render 는 자식 클래스마다 다르기 때문에 자식 클래스에서 override 하여 구현한다.
    this._render(data);
  }

  _render(data) {
    throw 'override!';
  }
}
const el = el => document.createElement(el);