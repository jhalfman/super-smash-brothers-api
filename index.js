/** GLOBAL CONSTANTS **/
const URL = "https://smashbros-unofficial-api.vercel.app/api/v1/ultimate/characters";

let charList = [];


/** NODE GETTERS **/
//main char div is #character-div
const characterDiv = () => document.getElementById("character-div");
//game buttons are #button-box .game-button
const buttonBoxArray = () => document.querySelectorAll(".game-button");
//large character #display is character-selected
const characterSelect = () => document.getElementById("character-selected");


/** EVENT HANDLERS **/
const fillCharacterScreen = () => {
  charList.forEach(character => {
    createCharacterIcon(character);    
})
}

const createCharacterIcon = (character) => {
  const newChar = document.createElement("div");
  newChar.innerHTML = `
  <img src="${character.images.icon}">
  `
  newChar.addEventListener("click", e => {
    const mainChar = document.createElement("div");
    if (e.target.parentElement.style["background-color"] !== "blue") {
      e.target.parentElement.style["background-color"] = "blue";
    }
    else {
      e.target.parentElement.style["background-color"] = "white";
    }
    const mainCharDiv = document.querySelector("#character-selected");

    let gameFranchise = `Game Franchise: ${character.series.name}`;
    const franchise = document.createElement("p");
    franchise.innerHTML =`
    ${gameFranchise}
    <img id="selected-icon" src="${character.series.icon}">
    `

    const otherGames = document.createElement("p");
    let otherGamesList = "Smash Titles:   ";
    character.alsoAppearsIn.forEach(title => {
      otherGamesList += title + "   ";
    })
    otherGames.textContent = otherGamesList + " Ultimate";
    

    mainCharDiv.innerHTML = '';
    mainChar.innerHTML = `
    <h2>${character.name}</h2>
    <img id="character-portrait" src="${character.images.portrait}">
    `;
    mainChar.appendChild(otherGames);
    mainChar.appendChild(franchise);

    mainCharDiv.appendChild(mainChar);
  })

    newChar.addEventListener("mouseenter", e => {
      if (e.target.style["background-color"] !== "blue"){
        e.target.style["background-color"] = "orange";
      }
    })

    newChar.addEventListener("mouseleave", e => {
      if (e.target.style["background-color"] === "orange"){
        e.target.style["background-color"] = "white";
      }
    })
  
  characterDiv().appendChild(newChar);
}

const createCharacterPortrait = () => {

}

const filterByGame = () => {

}

/** EVENT LISTENERS  **/
const selectCharacter = (e, character) => {
  
}

const selectGameButton = () => {

}



/** MISCELLANEOUS  **/
//Fetches data to save in global variable charList
const getCharacterList = async () => {
  fetch(URL, {
    headers: {
      Accept: "application/json"
    }
  })
  .then(resp => resp.json())
  .then(data => charList = data)
}



/**  START UP **/
document.addEventListener("DOMContentLoaded", () => {
  getCharacterList();  
  setTimeout(() => {
    fillCharacterScreen();
  }, 200);
  
})




buttonBoxArray().forEach(button => button.addEventListener("click", e => {
  const charDiv = document.querySelector("#character-div");
  charDiv.innerHTML = ``;
  const mainCharDiv = document.querySelector("#character-selected");
  mainCharDiv.innerHTML = ``;

  fetch(URL, {
  headers: {
    Accept: "application/json"
  }
})
  .then(resp=>resp.json())
  .then(data => data.forEach(character => {
    
    if (character.alsoAppearsIn.includes(e.target.id) || e.target.id === "Ultimate") {
      const newChar = document.createElement("div");
      newChar.innerHTML = `
    <img src="${character.images.icon}">
    `
    newChar.addEventListener("click", e => {
      const mainChar = document.createElement("div");
      if (e.target.style["background-color"] !== "blue") {
        e.target.style["background-color"] = "blue";
      }
      else {
        e.target.style["background-color"] = "white";
      }
      
      const mainCharDiv = document.querySelector("#character-selected");

      const otherGames = document.createElement("p");
      let gameFranchise = `Game Franchise: ${character.series.name}`;
      const franchise = document.createElement("p");
      franchise.innerHTML =`
      ${gameFranchise}
      <img id="selected-icon" src="${character.series.icon}">
      `
      let otherGamesList = "Smash Titles:   ";
      character.alsoAppearsIn.forEach(title => {
        otherGamesList += title + "   ";
      })
      otherGames.textContent = otherGamesList + " Ultimate";

      mainCharDiv.innerHTML = '';
      mainChar.innerHTML = `
      <h2>${character.name}</h2>
      <img id="character-portrait" src="${character.images.portrait}">
      `;
      mainChar.appendChild(otherGames);
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
    }
  }))
}))

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