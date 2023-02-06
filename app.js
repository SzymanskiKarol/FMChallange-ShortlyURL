"use strict"

let linkToShortEl = document.querySelector("input");
const shortenBtn = document.querySelector(".shorten-btn");
const shortenLinksSection = document.querySelector(".shorten-links");
let response, data;

shortenBtn.addEventListener("click", function () {
    fetch(`https://api.shrtco.de/v2/shorten?url=${linkToShortEl.value}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            console.log(data.result.short_link);
            let newDiv = document.createElement("div");
            newDiv.innerHTML = `<span class="long-link">${linkToShortEl.value}</span>
            <span class="short-link">${data.result.short_link}</span>
            <button class="copy">Copy</button>`
            newDiv.classList.add("short-link-container")
            shortenLinksSection.appendChild(newDiv);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})




