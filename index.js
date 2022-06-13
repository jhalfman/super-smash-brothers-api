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

      const otherGames = document.createElement("p");
      let otherGamesList = "Smash Titles:   ";
      character.alsoAppearsIn.forEach(title => {
        otherGamesList += title + "   ";
      })
      otherGames.textContent = otherGamesList + " Ultimate";

      mainCharDiv.innerHTML = '';
      mainChar.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.images.portrait}">
      `;
      mainChar.appendChild(otherGames);

      console.log(character);
      mainCharDiv.appendChild(mainChar);
    })
    charDiv.appendChild(newChar);
}))

const gameButtonArray = document.querySelectorAll(".game-button");
gameButtonArray.forEach(button => button.addEventListener("click", e => {
  const charDiv = document.querySelector("#character-div");
  charDiv.innerHTML = ``;

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
      let otherGamesList = "Smash Titles:   ";
      character.alsoAppearsIn.forEach(title => {
        otherGamesList += title + "   ";
      })
      otherGames.textContent = otherGamesList + " Ultimate";

      mainCharDiv.innerHTML = '';
      mainChar.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.images.portrait}">
      `;
      mainChar.appendChild(otherGames);

      mainCharDiv.appendChild(mainChar);
    })

    charDiv.appendChild(newChar);
    }
  }))
}))