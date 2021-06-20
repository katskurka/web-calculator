const calculatorDisplay = document.querySelector ('h2');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-button');
let initialValue = 0;
let operatorValue = '';
let waitingNextValue = false;

function sendNumberValue(number) {
  
 if (waitingNextValue === true) {
   calculatorDisplay.textContent = number;
   waitingNextValue = false;
 }
  else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

function placeDecimal() {
  if (waitingNextValue === true) return;
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

//Calculations
const calculate = {
  '/' : (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*' : (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+' : (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-' : (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=' : (firstNumber, secondNumber) => secondNumber,
};

function inputOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  //preventing multi operators
  if (operatorValue && waitingNextValue) {
    operatorValue = operator;
    return;
  };
  if (!initialValue) {
    initialValue = currentValue;
  }
  else {
    const calculation = calculate[operatorValue](initialValue, currentValue);
    calculatorDisplay.textContent = calculation;
    initialValue = calculation;
  }
  waitingNextValue = true;
  operatorValue = operator;
}

inputButtons.forEach((inputButton) => {
  if (inputButton.classList.length === 0) {
    inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
  } else if (inputButton.classList.contains('operator')) {
    inputButton.addEventListener('click', () => inputOperator(inputButton.value));
  } else if (inputButton.classList.contains('decimal')) {
    inputButton.addEventListener('click', () => placeDecimal());
  }
});

function clearDisplay() {
  initialValue = 0;
  operatorValue = '';
  waitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

clearButton.addEventListener('click', clearDisplay);