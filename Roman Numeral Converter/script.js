const userInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

let numToRomanNum = "";

//const parsedUserInput = parseInt(userInput.value);

const romanNumeralData = [
    {M: 1000},
    {CM: 900},
    {D: 500},
    {CD: 400},
    {C: 100},
    {XC: 90},
    {L: 50},
    {XL: 40},
    {X: 10},
    {IX: 9},
    {V: 5},
    {IV: 4},
    {I: 1}
  ];
  
const getRomanNum = (userInput) => {

    if (!userInput) { return "" }
    
    const romanUnit = romanNumeralData.find( dataRomanNum => userInput >= Object.values(dataRomanNum));
    
    numToRomanNum += Object.keys(romanUnit);
    
    getRomanNum(userInput - Object.values(romanUnit));
  }



convertBtn.addEventListener("click", (e) => {
    
    e.preventDefault();

    numToRomanNum = "";

    if (!userInput.value) {

        output.innerText = "Please enter a valid number";

    } else if (userInput.value <= 0) {

        output.innerText = "Please enter a number greater than or equal to 1";

    } else if (userInput.value >= 4000) {

        output.innerText = "Please enter a number less than or equal to 3999";

    } else {
        
        getRomanNum(parseInt(userInput.value));
        
        output.innerText = numToRomanNum;
    }
})

userInput.addEventListener("focus", () => {
    
    userInput.value = "";
    
    numToRomanNum = "";
})