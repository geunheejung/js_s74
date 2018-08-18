/*
A - <div>Body</div>
B - <div />
C - Text

파싱은 stack처럼 쌓인다.

여는 태그와 닫는 태그로 이뤄진 A 형태를 만날 경우 현재 스택을 자신의 부모 스택의 tag를 children에 저장하는데 이 때 children에 tag를 저장할 때 BackPoint를 저장한다.
backPoint에는 자신의 부모 태그를 저장하는데 그 이유는 현재 스택에서 더 이상 스택이 중첩될 이유가 없으면 다시 부모 스택으로 돌아와서 파싱을 계속 진행해야되기 때문이다.
바로 닫는 B타입이면 

*/

const parse = (input) => {
  const result = {
    type: 'ROOT',
    children: [],
  };
  const stacks = [];
  let stack = result;
  let cursor = 0;
  let text = '';


  do {
    while (input.length > cursor) {  
      const cur = input[cursor++];
      // text += cur; 
      //   stack.children.push({
      //     type: 'TEXT',
      //     text,
      //   })       
ㅓ
      if (cur === '<') {        
        if (input[cursor++] !== '/') {
          let name = input.substring(cursor - 1, cursor = input.indexOf('>'));
          const isClose = input[cursor - 1] === '/';
          if (isClose) {
            name = name.substr(0, name.length - 1);        
          }
          const tag = {
            type: 'NODE',
            name,
            children: isClose ? null : [],
            back: stack,
          }              
          stack.children.push(tag);
          cursor++;      
        }
      } else {
        text += cur;
      }    
    }
  } while (stack = stacks.pop());

  return result;
}

console.log(parse('<div>Hello</div>'));