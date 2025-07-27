const baseStatElement = document.getElementsByClassName("base-stat");
const searchButtonElement = document.getElementById("search-button");
const userInput = document.getElementById("search-input");

//creature details
const creatureNameElement = document.getElementById("creature-name");
const creatureIdElement = document.getElementById("creature-id");
const creatureWeightElement = document.getElementById("weight");
const creatureHeightElement = document.getElementById("height");
const creatureTypesElement = document.getElementById("types");
const creatureSpAttrElement = document.getElementById("special-attr");
const creatureSpAttrDescElement = document.getElementById("special-attr-desc");


const fetchCreatureData = async (id) => {

    const apiUrl = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${id}`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        getCreatureDetails(data);
    
    } catch (err) {

        alert("Creature not found");
    }
}

const getCreatureDetails = (data) => {

    let typeData = "";
    
    const { id, name, weight, height, stats, special, types} = data;

    types.forEach( ( { name } ) => {
        
        typeData += `<span id="${name}">${name.toUpperCase()}</span> `
    })
    
    creatureNameElement.innerText = name.toUpperCase();
    creatureIdElement.innerText = `#${id}`;
    creatureWeightElement.innerText = `Weight: ${weight}`;
    creatureHeightElement.innerText = `Height: ${height}`;
    creatureTypesElement.innerHTML = typeData;
    creatureSpAttrElement.innerText = special.name.toUpperCase();
    creatureSpAttrDescElement.innerText = special.description;
    
    //Show creature stats
    stats.forEach( ( { base_stat }, index ) => {

        baseStatElement[index].innerText = base_stat;

    })
}

searchButtonElement.addEventListener("click", (event) => {

    event.preventDefault();
    
    fetchCreatureData(userInput.value);
});
