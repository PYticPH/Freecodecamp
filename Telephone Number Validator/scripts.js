const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

// Validate US phone number
const isValidUsNum = num => {
    
    const regex = /^1?\s?(?:\(\d{3}\)|\d{3})[\s-]?\d{3}[-\s]?\d{4}$/;
    
    return regex.test(num);
} 

// Get the result

const showResult = () => {

    const newElement = document.createElement("p");

    const inputValue = userInput.value.trim();

    newElement.classList.add("results-text");

    if (!inputValue) {

        alert("Please provide a phone number");
        
        return;
    }

    if (isValidUsNum(inputValue)) {
        
        newElement.textContent += "Valid US number: " + inputValue;

    } else {

        newElement.textContent = "Invalid US number: " + inputValue;

    }

    resultsDiv.appendChild(newElement);

    userInput.value = "";
}

// Clear result

const clearResult = () => {
    
    resultsDiv.innerText = "";
}

// Event handlers

checkBtn.addEventListener("click", showResult);
clearBtn.addEventListener("click", clearResult);