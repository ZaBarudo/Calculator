const Operators = ['+', '-', 'x', '÷']

const buttons = document.querySelectorAll('.button');
const clearAllBtn = document.querySelector('.clearAll');
const expression = document.querySelector('.expression');
const result = document.querySelector('.result');
const clearBtn = document.querySelector('.clear');
const numbers = document.querySelectorAll('#number');
const operators = document.querySelectorAll('#operator');
const equals = document.querySelector('#equals');
const decimal = document.querySelector('#decimal');

buttons.forEach(button => button.addEventListener('mouseenter', buttonHoverAdd));
buttons.forEach(button => button.addEventListener('mouseleave', buttonHoverRemove));
numbers.forEach(number => number.addEventListener('click', displayNum));
operators.forEach(operator => operator.addEventListener('click', operate));
clearAllBtn.addEventListener('click', clearAll)
clearBtn.addEventListener('click', clear);
equals.addEventListener('click', equalsOperator);
decimal.addEventListener('click', addDecimal);

let num='';
let operator='';
let num2='';
let finalAns='';

function buttonHoverAdd(){
    this.classList.add('buttonHover');
}
function buttonHoverRemove(){
    this.classList.remove('buttonHover');
}

function clearAll(){
    addClicks();
    expression.textContent = '';
    result.textContent = ''
    num = '';
    num2 = '';
    finalAns = 0;
    operator = '';
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
    operator = this.textContent;
    num = result.textContent;
    exp = expression.textContent;
    let temp;
    if(exp){
        temp = exp.match(/^\-?\d+\.?\d*|\-?\d+\.?\d*\b|\-?\d+\.?\d*(?=\w)/g);
    }
    else temp = '0';

    if(exp==''){ // if expression is empty
        if(num!=''){
            expression.textContent = `${num} ${operator} `;
            result.textContent = '';
        }
    }
    else if(exp[exp.length - 2]=='='){ //  num will never be empty in this case
        expression.textContent = `${num} ${operator} `;
        result.textContent = '';
    }
    else if(Operators.includes(exp[exp.length - 2]) && num==''){
        expression.textContent = `${exp.slice(0,exp.length-2)} ${operator} `;
        result.textContent = '';
    }
    else if(Operators.includes(exp[exp.length - 2]) && num!=''){
        if(process(temp[0], exp[exp.length - 2], num)){
            expression.textContent = `${finalAns} ${operator} `;
            result.textContent = '';
        }
    }

    
}


function process(num, operator, num2){
    if(!operator){
        finalAns = num2;
        return true;
    }
    if(num2 == '') num2 = '0';
    if(num == '') num = '0';
    if(operator=='+') finalAns = +num + +num2;
    if(operator=='-') finalAns = +num - +num2;
    if(operator=='x') finalAns = +num * +num2;
    if(operator=='÷'){
        if(num2 == '0'){
            expression.textContent = 'Press Clear All to continue';
            result.textContent = "Division by 0 error.";
            removeClicks();
            return false;
        }
        else finalAns = +num / +num2;
    }
    return true;
}

function equalsOperator(){
    exp = expression.textContent;
    num = result.textContent;
    if(exp){
        num2 = exp.match(/^\-?\d+\.?\d*|\-?\d+\.?\d*\b|\-?\d+\.?\d*(?=\w)/g);
    }
    else num2 = '0';
    
    if(num2 && exp[exp.length - 2]=='='){
        
        if(process(num, operator, num2[num2.length-1])){
            expression.textContent = (num + ' ' + operator + ' '+ num2[num2.length-1] + ' ' + '=' + ' ').replace(/^0+/, '');
        }
    }
    else{
        if(process(num2[0], operator, num)){
            expression.textContent = (num2 + ' ' + operator + ' '+ num + ' ' + '=' + ' ').replace(/^0+/, '');   
        }
    }
    if(finalAns){
        if(finalAns.toString().length > 15){
            finalAns = finalAns.toString().slice(0,18);
        }
        result.textContent = finalAns;
    }
    

}

function addDecimal(){
    if((result.textContent.match(/\./g) || []).length < 1){
        result.textContent += '.';
    }
}



function removeClicks(){
    buttons.forEach(button => button.removeEventListener('mouseenter', buttonHoverAdd));
    buttons.forEach(button => button.removeEventListener('mouseleave', buttonHoverRemove));
    numbers.forEach(number => number.removeEventListener('click', displayNum));
    operators.forEach(operator => operator.removeEventListener('click', operate));
    clearBtn.removeEventListener('click', clear);
    equals.removeEventListener('click', equalsOperator);
    decimal.removeEventListener('click', addDecimal);
}

function addClicks(){
    buttons.forEach(button => button.addEventListener('mouseenter', buttonHoverAdd));
    buttons.forEach(button => button.addEventListener('mouseleave', buttonHoverRemove));
    numbers.forEach(number => number.addEventListener('click', displayNum));
    operators.forEach(operator => operator.addEventListener('click', operate));
    clearAllBtn.addEventListener('click', clearAll)
    clearBtn.addEventListener('click', clear);
    equals.addEventListener('click', equalsOperator);
    decimal.addEventListener('click', addDecimal);
}