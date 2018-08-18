const textNode = (text, target) => {
  if (text) {
    target.children.push({
      type: 'TEXT',
      text,
    })
  }
}

const parser = input => {
  
  const result = { type: 'ROOT', name: 'DOCUMENT', children: [] };
  const stacks = [];
  let stack = result;
  let cursor = 0;
  let text = '';
  

  do {        
    while (cursor < input.length) {      
      const curText = input[cursor++];

      if (curText === '<') {                       
        // '<' 인치 체크한다
        textNode(text, stack); 
        text = '';           
        if (input[cursor] !== '/') {      
          // 닫는 태그인지 체크한다.
          let name = input.substring(cursor, cursor = input.indexOf('>', cursor));   
      
          const isClose = input[cursor - 1] === '/';
          if (isClose) name = name.substr(0, name.length - 1);
          const tag = {
            type: 'NODE',
            name,
            children: isClose ? null : [],
            back: stack,
          }          
          stack.children.push(tag);          
          stacks.push(tag);                  
          cursor++;
          break;
        } else {
          // 닫는 태그를 만나면
          // 현재 스택이 끝났음을 판단하고 이전 스택으로 돌아가야한다.
          cursor = input.indexOf('>', cursor) + 1;
          stacks.push(stack.back);         
          break;
        }
      } else {
        text += curText;

      }       
    }      
  }while(stack = stacks.pop());

  return result;
}

// A도 B도 아닐 때 text를 추가해야한다.
// A: <div></div>
// B: <div />
// 닫는 태그일 경우 cursor가 넘어가야한다?


const result = parser('<div><h1>카페</h1><ul><li>커피1</li><li>커피2</li><li>커피3</li><li>커피4</li></ul></div>');

console.log(result);