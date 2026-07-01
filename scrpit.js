const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButtons = document.querySelector("[data-equals]");

const allClearButtons = document.querySelector("[data-all-clear]");
const deleteButtons = document.querySelector("[data-delete]");

const previousOperand = document.querySelector("[data-previous-operand]");
const currentOperand = document.querySelector("[data-current-operand]");
const currentOperator = document.querySelector("[data-current-operator]");
let previousOperator = "";

allClearButtons.addEventListener("click", () => {
	previousOperand.innerText = "0";
	currentOperand.innerText = "";
	currentOperator.innerText = "";
	previousOperator = "";
});

deleteButtons.addEventListener("click", () => {
	const text = currentOperand.innerText;
	currentOperand.innerText = text.slice(0, -1);
});

equalButtons.addEventListener("click", () => {
	if (currentOperand.innerText === "" || currentOperator.innerText == "") {
		return;
	} else {
		compute(previousOperator);
	}
});

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const number = button.innerText;
		if (number === "." && currentOperand.innerText.includes(".")) {
			return;
		}
		currentOperand.innerText = currentOperand.innerText + number;
	});
});

operationButtons.forEach((operation) => {
	operation.addEventListener("click", () => {
		let opText = operation.innerText;
		if (operation.querySelector("sup")) opText = "xy"; // X^y ለሚለው ቁልፍ

		if (
			currentOperand.innerText !== "" &&
			previousOperand.innerText === "0" &&
			opText === "-"
		) {
			compute(previousOperator);
			currentOperator.innerText = opText;
			previousOperator = opText;
		} else if (
			currentOperand.innerText !== "" &&
			previousOperand.innerText !== "0" &&
			currentOperator.innerText === ""
		) {
			previousOperand.innerText = currentOperand.innerText;
			currentOperand.innerText = "";
			previousOperator = opText;
			currentOperator.innerText = previousOperator;
		} else if (
			currentOperand.innerText !== "" &&
			(previousOperand.innerText === "0" || previousOperand.innerText === "")
		) {
			previousOperand.innerText = currentOperand.innerText;
			currentOperand.innerText = "";
			currentOperator.innerText = opText;
			previousOperator = opText;
		} else if (
			currentOperand.innerText !== "" &&
			previousOperand.innerText !== "0"
		) {
			compute(previousOperator);
			previousOperator = opText;
			currentOperator.innerText = previousOperator;
		} else if (
			currentOperand.innerText === "" &&
			previousOperand.innerText !== "0"
		) {
			currentOperator.innerText = opText;
			previousOperator = opText;
		}
	});
});

const compute = (operator) => {
	const prev = parseFloat(previousOperand.innerText);
	const current = parseFloat(currentOperand.innerText);
	if (isNaN(prev) || isNaN(current)) return;

	let result;
	switch (operator) {
		case "+":
			result = prev + current;
			break;
		case "-":
			result = prev - current;
			break;
		case "/":
			result = prev / current;
			break;
		case "*":
			result = prev * current;
			break;
		case "xy":
			result = Math.pow(prev, current);
			break;
		default:
			return;
	}
	previousOperand.innerText = result;
	currentOperand.innerText = "";
	currentOperator.innerText = "";
};
