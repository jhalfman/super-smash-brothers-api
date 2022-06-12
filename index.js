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
    <img src="${character.images.icon}" width="50">
    `
    charDiv.appendChild(newChar);
}))
