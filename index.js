/** GLOBAL CONSTANTS **/
const URL = "https://smashbros-unofficial-api.vercel.app/api/v1/ultimate/characters";

let charList = [];


/** NODE GETTERS **/
const characterDiv = () => document.getElementById("character-div"); //main char div is #character-div

const buttonBoxArray = () => document.querySelectorAll(".game-button"); //game buttons are #button-box .game-button

const characterSelectedDiv = () => document.getElementById("character-selected"); //large character #display is character-selected

const searchCharacterForm = () => document.getElementById("search-character-form"); //form is #search-character-form

const refreshButton = () => document.getElementById("refresh"); //#refresh
/** EVENT HANDLERS **/

//iterates through character list to popular div with character icons
const fillCharacterScreen = () => {
  characterDiv().innerHTML = '';
  characterSelectedDiv().innerHTML = '';
  charList.forEach(character => {
    createCharacterIcon(character);    
})
}

//create div for icon img, calls icon event listener functions, appends to DOM
const createCharacterIcon = (character) => {
  const newChar = document.createElement("div");
  newChar.innerHTML = `
  <img src="${character.images.icon}">
  `
  mouseEnterHighlight(newChar);
  mouseLeaveHighlight(newChar);
  
  createCharacterPortrait(newChar, character);
  
  characterDiv().appendChild(newChar);
}

//create portrait div with character info to be appended to DOM
const createPortraitInfo = (character) => {
  const selectedChar = document.createElement("div");

  let otherGamesList = "Smash Titles:   ";
    if (character.alsoAppearsIn === []) {
      otherGamesList = "Smash Titles: "
    }
    else {
      character.alsoAppearsIn.forEach(title => {
        otherGamesList += title + " - ";
      })
    }

    selectedChar.innerHTML = `
    <h2>${character.name}</h2>
    <img id="character-portrait" src="${character.images.portrait}">
    <p>${otherGamesList} Ultimate <br>
    Game Franchise: ${character.series.name}</p>
    <img id="selected-icon" src="${character.series.icon}">
    `;
    return selectedChar;
}

//callback function for when a button is clicked
const createButtonEvent = (e) => {
  characterDiv().innerHTML = ``;
  characterSelectedDiv().innerHTML = ``;

  charList.forEach(character => {    
    if (character.alsoAppearsIn.includes(e.target.id) || e.target.id === "Ultimate") {
      createCharacterIcon(character);
    }
  })
}

//callback function for when the search form is submitted
const createSearchFormEvent = (e) => {
 e.preventDefault();
  let searchCharacter;
  charList.forEach(character => {
   if (e.target["search-character"].value.toLowerCase() === character.name.toLowerCase()) {
    searchCharacter = character;
    }
  })
  
  if(searchCharacter) {
    characterDiv().innerHTML = '';
    characterSelectedDiv().innerHTML = '';
    createCharacterIcon(searchCharacter);
    characterSelectedDiv().appendChild(createPortraitInfo(searchCharacter))
  }
  else {
    alert(`No smash character named "${e.target["search-character"].value}"`)
  }
    
  e.target.reset();
}

/** EVENT LISTENERS  **/
//highlight when mouse over icon
const mouseEnterHighlight = (element) => {
  element.addEventListener("mouseenter", e => {
    if (e.target.style["background-color"] !== "blue"){
      e.target.style["background-color"] = "orange";
    }
  })
}

//remove highlight when mouse leaves icon
const mouseLeaveHighlight = (element) => {
  element.addEventListener("mouseleave", e => {
    if (e.target.style["background-color"] === "orange"){
      e.target.style["background-color"] = "white";
    }
  })
}

//click events for icon; highlight + portrait creation
const createCharacterPortrait = (newChar, character) => {
  newChar.addEventListener("click", e => {    
    if (newChar.style["background-color"] !== "blue") {
      newChar.style["background-color"] = "blue";;
    }
    else {
      newChar.style["background-color"] = "white";
    }

    characterSelectedDiv().innerHTML = '';
    characterSelectedDiv().appendChild(createPortraitInfo(character));
  })
}



/** MISCELLANEOUS  **/
//Fetches data to save in global variable charList
const getCharacterList = async () => {
  await fetch(URL, {
    headers: {
      Accept: "application/json"
    }
  })
  .then(resp => resp.json())
  .then(data => charList = data)
}

/**  START UP **/
document.addEventListener("DOMContentLoaded", async () => {
  await getCharacterList();  
  fillCharacterScreen();
  
  buttonBoxArray().forEach(button => button.addEventListener("click", createButtonEvent))
  searchCharacterForm().addEventListener("submit", createSearchFormEvent)
  refreshButton().addEventListener("click", fillCharacterScreen);
})









/*
const characterForm = document.querySelector("#new-character-form");
characterForm.addEventListener("submit", e => {
  e.preventDefault();

  const newChar = document.createElement("div");
    const charDiv = document.querySelector("#character-div");
    newChar.innerHTML = `
    <img data-name="${e.target.name.value}" data-franchise=${e.target.franchise.value} 
    data-portrait=${e.target.portrait.value} src="${e.target.icon.value}">
    
    `
    newChar.addEventListener("click", event => {
      
      const mainChar = document.createElement("div");
      event.target.style["background-color"] = "blue";
      const mainCharDiv = document.querySelector("#character-selected");

      let gameFranchise = `Game Franchise: ${newChar.querySelector("img").getAttribute("data-franchise")}`;
      const franchise = document.createElement("p");
      franchise.innerHTML =`
      ${gameFranchise}
      <img id="selected-icon" src="" alt="IMG HERE">
      `

      

      mainCharDiv.innerHTML = '';
      mainChar.innerHTML = `
      <h2>${newChar.querySelector("img").getAttribute("data-name")}</h2>
      <img id="character-portrait" src="${newChar.querySelector("img").getAttribute("data-portrait")}">
      `;
    
      mainChar.appendChild(franchise);


      mainCharDiv.appendChild(mainChar);
    })

    newChar.addEventListener("mouseenter", e => {
      e.target.style["background-color"] = "orange";
    })

    newChar.addEventListener("mouseleave", e => {
      e.target.style["background-color"] = "white";
    })

    charDiv.appendChild(newChar);

  e.target.reset();
})
*/