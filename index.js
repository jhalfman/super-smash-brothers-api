/** GLOBAL CONSTANTS **/
const URL = "https://smashbros-unofficial-api.vercel.app/api/v1/ultimate/characters";


/** NODE GETTERS **/
//main char div is #character-div
//game buttons are #button-box
//large character #display is character-selected
const characterDiv = () => document.getElementById("character-div");
const buttonBoxArray = () => document.querySelectorAll(".game-button");
const characterSelect = () => document.getElementById("character-selected");


/** EVENT HANDLERS **/
const getCharacterList = () => {
  let charList = [];
  fetch(URL, {
    headers: {
      Accept: "application/json"
    }
  })
  .then(resp => resp.json())
  .then(data => data.forEach(character => {
    charList.push(character);
  }))
  return charList;
}

/** EVENT LISTENERS  **/


/** MISCELLANEOUS  **/
const fetchAndFill = () => {
fetch(URL, {
  headers: {
    Accept: "application/json"
  }
})
.then(resp => resp.json())
.then(data => data.forEach(character => {
    const newChar = document.createElement("div");
    newChar.innerHTML = `
    <img src="${character.images.icon}">
    `
    newChar.addEventListener("click", e => {
      const mainChar = document.createElement("div");
      e.target.style["background-color"] = "blue";
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

      console.log(character);
      mainCharDiv.appendChild(mainChar);
    })

    newChar.addEventListener("mouseenter", e => {
      e.target.style["background-color"] = "orange";
    })

    newChar.addEventListener("mouseleave", e => {
      e.target.style["background-color"] = "white";
    })

    characterDiv().appendChild(newChar);
}))
}

/**  START UP **/
document.addEventListener("DOMContentLoaded", () => {
  fetchAndFill();
})



buttonBoxArray().forEach(button => button.addEventListener("click", e => {
  const charDiv = document.querySelector("#character-div");
  charDiv.innerHTML = ``;
  const mainCharDiv = document.querySelector("#character-selected");
  mainCharDiv.innerHTML = ``;

  fetch("https://smashbros-unofficial-api.vercel.app/api/v1/ultimate/characters", {
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
      e.target.style["background-color"] = "blue";
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