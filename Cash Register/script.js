//Item price
let price = 3.26;

//Cash in drawer
let cid = [
    ['Pennies', 1.01],
    ['Nickels', 2.05],
    ['Dimes', 3.1],
    ['Quarters', 4.25],
    ['Ones', 90],
    ['Fives', 55],
    ['Tens', 20],
    ['Twenties', 60],
    ['Hundreds', 100]
]

// Currency Unit Amount
const cua = [
    ['ONE HUNDRED', 100],
    ['TWENTY', 20],
    ['TEN', 10],
    ['FIVE', 5],
    ['ONE', 1],
    ['QUARTER', 0.25],
    ['DIME', 0.1],
    ['NICKEL', 0.05],
    ['PENNY', 0.01]
]

const purchaseBtn = document.getElementById("purchase-btn");
const changeDueElement = document.getElementById("change-due");
const cidElement = document.querySelector(".cash-container");
const totalPrice = document.getElementById("total-price");

let changeDue = {};

totalPrice.innerText = price;

//Show currency unit and amount
const showCua = (currency, amount, node) => {

    node.innerHTML += `<p id="${currency.toLowerCase()}">${currency}: \$${amount}</p>`;
}

//Update customer change
const updateChange = (change) => {

    let dupChange = change;

    while (change >= 0.01) {

        for (let index = 0; index < cua.length; index++) {

            if (change >= cua[index][1]) {

                if (changeDue[cua[index][0]] && changeDue[cua[index][0]] + cua[index][1] <= cid[(cid.length - 1) - index][1]) {
                    
                    changeDue[cua[index][0]] = roundUpToTwoDecimalPlaces(changeDue[cua[index][0]] + cua[index][1]);

                } else if (changeDue[cua[index][0]] === undefined && cid[(cid.length - 1) - index][1] > 0) {

                    changeDue[cua[index][0]] = roundUpToTwoDecimalPlaces(cua[index][1]);

                } else if (cid[0][1] - changeDue['PENNY'] === 0 && change > 0) {

                    changeDueElement.innerHTML = `<p id="status">Status: <span id="status-ins">INSUFFICIENT_FUNDS</span></p>`;

                    updateCid(dupChange);

                    return -1;

                } else {

                    continue;
                }

                change = roundUpToTwoDecimalPlaces(change - cua[index][1]);

                break;
            }
        }
    }
    
    for (const currency in changeDue) {
        
        showCua(currency, changeDue[currency], changeDueElement);
    }

    updateCid(dupChange, change);
}

//Update cash in drawer
const updateCid = (change, uChange) => {

    while (change >= 0.01 && uChange === 0) {

        for (let index = cid.length - 1; index >= 0 ; index--) {

            if (change >= cua[(cua.length - 1) - index][1] && (cid[index][1] - cua[(cua.length - 1) - index][1]) >= 0) {

                cid.splice(index, 1, [cid[index][0], roundUpToTwoDecimalPlaces(cid[index][1] - cua[(cua.length - 1) - index][1])]);

                change = roundUpToTwoDecimalPlaces(change - cua[(cua.length - 1) - index][1]);

                break;

            } else {

                continue;

            }
        }
    }

    cid.forEach( ([ currency, amount ]) => showCua(currency, amount, cidElement));
}

// Clear display and input data
const clearData = () => {

    cidElement.innerText = "";

    changeDueElement.innerText = "";

    changeDue = {};
}


//Convert number to 2 decimal places
const roundUpToTwoDecimalPlaces = (decimalNumber) => {
    
    return parseFloat((Math.round(decimalNumber * 100) / 100).toFixed(2));
}


//Update cash Register
const updateRegister = () => {

    const totalCid = roundUpToTwoDecimalPlaces( cid.reduce( (acc, [ , amount ] ) => acc + amount, 0));

    const cash = roundUpToTwoDecimalPlaces(document.getElementById("cash").value);
    
    let change = roundUpToTwoDecimalPlaces(cash - price);
    
    
    if (cash < roundUpToTwoDecimalPlaces(price)) {
        
        alert("Customer does not have enough money to purchase the item");
        
        return;
    }
    
    if (totalCid < change) {
        
        changeDueElement.innerHTML = `<p id="status">Status: <span id="status-ins">INSUFFICIENT_FUNDS</span></p>`;
        
        return;
    }

    clearData(); 
    
    if (cash === roundUpToTwoDecimalPlaces(price)) {
        
        changeDueElement.innerText = "No change due - customer paid with exact cash";

    } else if (totalCid === change) {

        changeDueElement.innerHTML = `<p id="status">Status: <span id="status-red">CLOSED</span></p>`;
    
    } else {
        
        changeDueElement.innerHTML = `<p id="status">Status: <span id="status-green">OPEN</span></p>`;
    }

    updateChange(change);
}

purchaseBtn.addEventListener("click", () => {

    updateRegister();
})

updateCid();