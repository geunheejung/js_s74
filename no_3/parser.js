// TODO 각 로직 함수 분리 해야함.

class Tag {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }
}

class Node extends Tag {
  constructor(name, prevStack, attribute) {
    super('NODE', name);

    this.children = [];
    this.attribute = attribute || null;
    this.back = prevStack;
  }
}

class Text extends Tag {
  constructor(type, text) {
    super(type)

    this.text = text;
  }
}

class Root extends Tag {
  constructor() {
    super('ROOT', 'document');
    this.children = [];
  }
}

const setTextNode = (text, target) => {
  if (text.length) target.children.push(new Text(text));

  return '';
}

const getInTagText = (input, cursor) => {
  return input.substring(cursor, input.indexOf('>', cursor));
}

const parser = input => {
  const result = new Root();
  const stacks = [];
  let stack = result;
  let cursor = 0;
  let text = '';
  
  do {        
    while (cursor < input.length) {      
      const curText = input[cursor++];

      if (curText === '<') {                       
        // '<' 인치 체크한다
        text = setTextNode(text, stack);
        if (input[cursor] !== '/') {
          const tagInText = getInTagText(input, cursor);
          const textListByEmpty = tagInText.split(' ');
          if (textListByEmpty.length > 1) {
            cursor = input.indexOf('>', cursor);
            const name = textListByEmpty[0];
            const attList = textListByEmpty.filter((text, index) => index !== 0);
            let attributeList = {}

            attList.forEach(text => {
              if (text.includes('=')) {
                const att = text.split('=');
                attributeList[att[0]] = att[1].replace(/\"\"*/g, '');
              } else {
                attributeList[text] = true;
              }
            });

            const tag = new Node(
              name,
              stack,
              attributeList
            );
            
            stack.children.push(tag);
            stacks.push(tag);
            cursor++;
            break;
          } else {
            // 닫는 태그인지 체크한다.
            let name = input.substring(cursor, cursor = input.indexOf('>', cursor));         
      
            const isClose = input[cursor - 1] === '/';
            if (isClose) name = name.substr(0, name.length - 1);
            const tag = new Node(
              name,
              stack,
              isClose ? null : [],
            );

            stack.children.push(tag);          
            stacks.push(tag);                  
            cursor++;
            break;
          }          
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

const result = parser(`<div><a href="/">Home</a><input type="text" required></div>`);

console.log(result);