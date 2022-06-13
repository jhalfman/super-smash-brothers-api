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
      mainChar.innerHTML = `
      <img src="${character.images.icon}">
      `
      mainCharDiv.appendChild(mainChar);
    })
    charDiv.appendChild(newChar);
}))