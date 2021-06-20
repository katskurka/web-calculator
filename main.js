const calculatorDisplay = document.querySelector ('h2');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-button');

function sendNumberValue(number) {
  
  const displayValue = calculatorDisplay.textContent;
  calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}

function placeDecimal() {
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

inputButtons.forEach((inputButton) => {
  if (inputButton.classList.length === 0) {
    inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
  } else if (inputButton.classList.contains('operator')) {
    inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
  } else if (inputButton.classList.contains('decimal')) {
    inputButton.addEventListener('click', () => placeDecimal());
  }
});

function clearDisplay() {
  calculatorDisplay.textContent = '0';
}

clearButton.addEventListener('click', clearDisplay);