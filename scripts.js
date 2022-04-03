

const buttons = document.querySelectorAll('.button');
const clearAllBtn = document.querySelector('.clearAll');
const expression = document.querySelector('.expression');
const result = document.querySelector('.result');
const clearBtn = document.querySelector('.clear');
const numbers = document.querySelectorAll('#number');
const operators = document.querySelectorAll('#operator');
const equals = document.querySelector('#equals');

buttons.forEach(button => button.addEventListener('mouseenter', buttonHover));
buttons.forEach(button => button.addEventListener('mouseleave', buttonHover));
numbers.forEach(number => number.addEventListener('click', displayNum));
operators.forEach(operator => operator.addEventListener('click', operate));
clearAllBtn.addEventListener('click', clearAll)
clearBtn.addEventListener('click', clear);
equals.addEventListener('click', equalsOperator);

let num=3;
let operator='+';

function buttonHover(){
    this.classList.toggle('buttonHover');
}

function clearAll(){
    expression.textContent = '';
    result.textContent = ''
}

function clear(){
    expText = expression.textContent;
    if(expText[expText.length-1]=='='){
        clearAll();
        return;
    }
    result.textContent = result.textContent.slice(0,result.textContent.length - 1);
}

function displayNum(){
    if(result.textContent.length < 18){
        result.textContent += this.textContent;
    }
}

function operate(){
    const operator = this.textContent;
    const num = result.textContent;
    result.textContent = '';
    console.log(num, operator);
    if(num && operator=='+') add(num);
}

function add(num1){
    operator = '+';
    num = num1; // here num1 and num are strings
    expression.textContent = num+operator;
}

function equalsOperator(){
    let num2 = result.textContent;
    expression.textContent = num+operator+num2+'=';
    if(operator=='+') num2 = +num + +num2;
    result.textContent = num2;
    
}