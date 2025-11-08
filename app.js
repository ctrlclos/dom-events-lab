/*-------------------------------- Constants --------------------------------*/
const ZERO = '0';
const CLEAR_OPERATOR = 'C';
const ERROR_MESSAGE = 'Error';
const SPACE = ' ';

/*-------------------------------- Variables --------------------------------*/
//when the user first loads the website
let firstNumber = '';
let operator = '';
let displayValue = ZERO;
let isNewCalculation = false;
let expression = '';
/*------------------------ Cached Element References ------------------------*/
const displayElement = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.button.number');
const mathOperatorButtons = document.querySelectorAll('.button.operator');
const equalsButton = document.querySelector('.button.equals');
const clearButton = Array.from(mathOperatorButtons).filter((mathOperatorButton) => {
  return mathOperatorButton.textContent === 'C';
});
/*----------------------------- Event Listeners -----------------------------*/
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handleNumberClick(button.textContent);
  })
})
mathOperatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    handleOperatorClick(button.textContent);
  })
})
equalsButton.addEventListener('click', () => {
  handleEqualsClick(operator);
})
clearButton[0].addEventListener('click', () => {
  handleClearClick();
})

/*-------------------------------- Functions --------------------------------*/
//making sure the display element has a value of '0' when the page is loaded or reloaded.
window.onload = () => updateDisplay(ZERO);
function updateDisplay(displayValue) {
    displayElement.textContent = displayValue;
}

function handleNumberClick(number) {
  if(isNewCalculation){
    expression = '';
    displayValue = ZERO;
    isNewCalculation = false;
  }
  if (displayValue === ZERO && number === ZERO){
    return;
  }
  if(displayValue === ZERO) {
    displayValue = number;
  } else {
    displayValue = displayValue + number
  }
  updateDisplay(expression + displayValue);
}

function handleOperatorClick(nextOperator) {
  if(nextOperator === CLEAR_OPERATOR) {
    handleClearClick();
    return;
  }
  // checking for a pending calculation
  if(firstNumber && operator && displayValue){
    handleEqualsClick(operator);
  }
  firstNumber = displayValue;
  operator = nextOperator;
  expression = firstNumber + SPACE + operator + SPACE;
  displayValue = '';
  updateDisplay(expression);
}

function handleClearClick() {
  firstNumber = '';
  operator = '';
  displayValue = ZERO;
  expression = '';
  updateDisplay(displayValue);
}

function handleEqualsClick(operator) {
  let secondNumber = displayValue;
  let result = 0;
  switch(operator) {
      case '+':
        result = parseFloat(firstNumber) + parseFloat(secondNumber);
        break;
      case '-':
        result = parseFloat(firstNumber) - parseFloat(secondNumber);
        break;
      case '*':
        result = parseFloat(firstNumber) * parseFloat(secondNumber);
        break;
      case '/':
        if (parseFloat(secondNumber) === 0) {
          updateDisplay(ERROR_MESSAGE);
          firstNumber = '';
          operator = '';
          displayValue = ZERO;
          expression = '';
          isNewCalculation = true;
          return;
        }
        result = parseFloat(firstNumber) / parseFloat(secondNumber);
        break;
      }
      displayValue = String(result);
      firstNumber = '';
      operator = '';
      expression = '';
      updateDisplay(displayValue);

      isNewCalculation = true;
}
