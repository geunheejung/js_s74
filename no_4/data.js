const Data = class extends Array {
  constructor(row, col) {
    // es6 이후 class를 상속받은 자식 클래스에서는 생성자에서 this 키워드 위에 super()를 무조건 호출해줘야한다.
    // this 키워드를 사용안할경우 생성자 호출이 끝난 뒤 super() 가 자동으로 호출된다.
    super();
    Object.assign(this, {
      row,
      col,
    });
  }
  // cell 메서드를 만든 이유는 2차원 배열에 대응하기 위해
  cell(row, col, color) {
    if (row > this.row || col > this.col) throw 'invalid!';
    // 할당식에서 우항의 값이 그 할당식의 평가된 값이 된다.
    (this[row] || (this[row] = []))[col] = color;
  }
  row(row, ...color) {
    // cell 내부 함수로 값을 넣지 않으면 안된다. 왜냐하면 cell 내부 함수에 검증 로직이 존재하는데 이 검증 로직이 중복되기 때문이다.
    color.forEach((v, i) => this.cell(row, i, v));
  }
  all(...rows) {
    rows.forEach((v, i) => this.row(i, ...v));
  }

  // 위 처럼 내부 함수가 내부 함수를 호출함으로써 얻는 장점은 권한을 나눌 수 있는것이다.
  // cell() 만이 cell에 대한 정확성 검증 권한을 가지고 있기에 위 처럼 사용해야 한다.
}

/*
1. 권한 책임을 인식하고,
2. 그에 따라 행동을 정의해준 다음,
3. 필요한 필드를 늘려주면 된다.
 */