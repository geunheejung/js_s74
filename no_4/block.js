// TODO 범용 블록정의
const Block = class {
  // 자식 클래스의 공통 부분인 block에 대한 2차원 배열을 반환하는 부분을 부모의 생성자에서 받음으로써
  // 더이상 자식 클래스마다 getBlock 메서드에서 this.rotate 프로퍼티에 따른 블록 정의를 안해도 된다.
  constructor(color, ...blocks) {
    Object.assign(this, {
      color,
      blocks,
      rotate: 0
    });
  }
  left(){
    if (--this.rotate < 0) {
      this.rotate = 3;
    }
  }
  right(){
    if (++this.rotate > 3) {
      this.rotate = 0;
    }
  }
  getBlock(){
    // 자식 클래스에서 했던 rotate 프로퍼티에 따라 2차원 block list를 반환하는 부분을 부모 클래스의 메서드로
    // 뺌으로써 공통점을 추상화 하였다.
    return this.blocks[this.rotate];
  }
};
// 1 ~ 5 번째 모양의 테트리스 블록 중 1, 2 구현
class A extends Block {
  constructor() {
    super(
      '#f8cbad',
      [[1], [1], [1], [1]],
      [[1, 1, 1]],
      [[1], [1], [1], [1]],
      [[1, 1, 1]],
    );
  }
  getBlock() {}
}

class B extends Block {
  constructor() {
    super(
      '#ffe699',
      [[0, 1, 0], [1, 1, 1]],
      [[1, 0], [1, 1], [1, 0]],
      [[1, 1, 1], [0, 1, 0]],
      [[0, 1], [1, 1], [0, 1]]
    );
  }
  getBlock() {}
}


// 블록의 기준점을 정한다.
// getBlock에서의 공통점은 this.rotate 프로퍼티값에 따라 블록이 그려질 2차원 배열이 반환한다는 점이다.
/*
  객체 지향 프로그래밍에서 중요한것은 자식간의 공통점을 파악해서 그 공통된 포인트를 얼마나 잘 추상화하냐이다.
  자식 클래스간에 공통점이 있음에도 불구하고 추상화를 하지 않으면 그 프로그램은 망한것이다. -- 확정 버그
 */