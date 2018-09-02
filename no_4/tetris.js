/**
 * 현재 스테이지 정보 클래스
 * @type {Stage}
 */
const Stage = class {
  static maxStage = 20;

  // TODO 생성자에서 'listener' 을 받지 않은 이유는
  /*
    Stage가 먼저 만들어져야만 Game 클래스도 만들어질 수 있기에 생성자 시점에서 'listener'을
    받아버리면 Game을 listener로 받을 수 없다.
    즉, 순서상으로 봤을 때 Stage 보다 Game 클래스가 나중에 생성되어야 하기에 Stage의 생성자에서가 아닌
    init 메서드로 listener 을 받아야한다.
   */
  init(listener) {
    this.listener = listener;
  }
  // TODO Game이 끝난 뒤 재시작 할 수 있기에 Stage의 진행 사항을 초기화한다
  clear() {
    this.stage = 0;
    this.next();
  }
  // TODO Stage Class의 역할 중 하나인 현재 스테이지를 다음 스테이지로 넘긴다
  next() {
    if (this.stage++ < Stage.maxStage) {
      // speed 값은 ms 단위인데 stage가 올라갈수록 speed는 작아지면서 빨라진다.
      this.speed = 500 - 450 * this.stage / Stage.maxStage;
      // stage도 갱신하였고, speed도 갱신하였으니 listener 에게 갱신이 완료되었다고 알린다.
      this.listener();
    }
  }
  // TODO Stage를 화면에 어떻게 표현할지를 다른 객체가 결정하는것이 아닌 Stage 자기 자신이 결정하게 함
  /*
    es6 이전에는 .toString(), .valueOf() 메서드를 override 하여 사용하였는데
    es6 이후에는 Symbol.toPrimitive 이라는 override용 메서드가 생겼고,
    hint에는 string, number와 같은 type이 전해져서 이에 따라 어떻게 변환될 지 return값으로
    정해줄 수 있다.
    es6 이전의 .toString(), .valueOf() 메서드는 디플리케이트 되었다.
   */
  [Symbol.toPrimitive](hint) {
    return `<div>Stage ${this.stage}</div>`;
  }
}

