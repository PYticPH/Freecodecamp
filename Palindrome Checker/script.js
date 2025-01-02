// Initialize variables

const userInput = document.getElementById('text-input');
const result = document.getElementById('result');
const checkBtn = document.getElementById('check-btn');

// Clear previous text on input focus
userInput.addEventListener('focus', () => {
    userInput.value='';
    result.innerText = '';
});

// Get result
checkBtn.addEventListener('click', () => {
    
    if (!userInput.value) {
        alert("Please input a value");
        return;
    }

    let reversedUserInput = '';
    const regex = /[^A-Za-z0-9]/g;
    const strippedUserInput = userInput.value.replace(regex, '');

    for (let i = strippedUserInput.split('').length - 1; i >= 0; i--)
        reversedUserInput += strippedUserInput[i];

    const isPalindrome = (reversedUserInput.toLowerCase() === strippedUserInput.toLowerCase()) ? true : false;


    if (isPalindrome)
        result.innerText = `${userInput.value} is a palindrome`;
    else
        result.innerText = `${userInput.value} is not a palindrome`;

    result.style.display = 'block'; 
});
