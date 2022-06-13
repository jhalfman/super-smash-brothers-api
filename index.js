fetch("https://smashbros-unofficial-api.vercel.app/api/v1/ultimate/characters", {
  headers: {
    Accept: "application/json"
  }
})
.then(resp => resp.json())
.then(data => data.forEach(character => {
    const newChar = document.createElement("div");
    const charDiv = document.querySelector("#character-div");
    newChar.innerHTML = `
    <img src="${character.images.icon}">
    `
    newChar.addEventListener("click", e => {
      const mainChar = document.createElement("div");
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
    charDiv.appendChild(newChar);
}))

const gameButtonArray = document.querySelectorAll(".game-button");
gameButtonArray.forEach(button => button.addEventListener("click", e => {
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

    charDiv.appendChild(newChar);
    }
  }))
}))