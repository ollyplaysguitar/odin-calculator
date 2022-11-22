"use strict";
const btns = document.querySelectorAll("button");
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["+", "-", "/", "*", ".", "="];

function Calculator() {
  this.display = document.querySelector(".display");
  this.input = "";
  this.calculate = function () {
    // convert input string into numbers array and operators array.
    const regex = /[+\-*\/]/g;
    const numbers = this.input.split(regex);
    const operators = this.input.match(regex);

    const result = numbers.reduce((total, number, index) => {
      // set total to first number
      if (total === null) {
        total += +number;
        return total;
      } else {
        // send total (accumulator) and current number to operation
        total = this.operations[operators[index - 1]](+total, +number);
        return total;
      }
    }, null);
    this.display.textContent = result;
    this.input = `${result}`;
  };

  this.operations = {
    "+": function (a, b) {
      return a + b;
    },
    "-": function (a, b) {
      return a - b;
    },
    "*": function (a, b) {
      return a * b;
    },
    "/": function (a, b) {
      return a / b;
    },
  };

  this.updateDisplay = function () {
    this.display.textContent = this.input;
  };

  this.inputNumber = function (num) {
    this.input += num;
    this.updateDisplay();
  };

  this.inputSymbol = function (sym) {
    if (sym === "=") {
      this.calculate();
      return;
    }

    if (sym === "." && this.input.split("").indexOf(".") >= 0) {
      return;
    }

    if (this.input.slice(-1) !== sym && symbols.indexOf(this.input.slice(-1)) === -1) {
      this.input += sym;
      this.updateDisplay();
    }
  };

  this.clear = function () {
    this.input = "";
    this.updateDisplay();
  };
}

const calc = new Calculator();

btns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    if (numbers.indexOf(e.target.value) > -1) {
      calc.inputNumber(e.target.value);
    }

    if (symbols.indexOf(e.target.value) > -1) {
      calc.inputSymbol(e.target.value);
    }

    if (e.target.value === "clear") {
      calc.clear();
    }
  })
);

document.addEventListener("keydown", function (e) {
  if (e.key >= 0) {
    calc.inputNumber(e.key);
  }
  if (e.key === "Enter") {
    e.preventDefault();
    calc.inputSymbol("=");
  }
  if (symbols.indexOf(e.key) > -1) {
    calc.inputSymbol(e.key);
  }
});
