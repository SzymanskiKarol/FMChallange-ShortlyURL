"use strict"

let linkToShortEl = document.querySelector("input");
const shortenBtn = document.querySelector(".shorten-btn");
const shortenLinksSection = document.querySelector(".sec-2-shorten-links");
let response, data;

document.addEventListener("DOMContentLoaded", getLinks);
shortenBtn.addEventListener("click", addNewLink);

function addNewLink() {
    if (linkToShortEl.value) {
        fetch(`https://api.shrtco.de/v2/shorten?url=${linkToShortEl.value}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                let newDiv = document.createElement("div");
                newDiv.innerHTML = `<a class="long-link" href="${linkToShortEl.value}" target="_blank">${linkToShortEl.value}</a>
                <div class="short-link-container-right">
                <a href="https://${data.result.short_link}" class="short-link" target="_blank">${data.result.short_link}</a>
                <button class="copy">Copy</button>
                <button class="remove">x</button></div>`
                newDiv.classList.add("short-link-container")

                let linksArr;
                if (localStorage.getItem('linksArr') === null) {
                    linksArr = [];
                } else {
                    linksArr = JSON.parse(localStorage.getItem('linksArr'))
                }

                if (!linksArr.includes(newDiv.innerHTML)) {
                    saveLocalLink(newDiv.innerHTML)
                    shortenLinksSection.appendChild(newDiv);
                    linkToShortEl.value = "";
                } else {
                    linkToShortEl.classList.add("error");
                    document.querySelector(".message").innerText = "This link is already shortened"
                    setTimeout(() => {
                        linkToShortEl.classList.remove("error");
                        document.querySelector(".message").innerText = ""
                    }, 2000)
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        linkToShortEl.classList.add("error");
        document.querySelector(".message").innerText = "Please add link"
        setTimeout(() => {
            linkToShortEl.classList.remove("error");
            document.querySelector(".message").innerText = ""
        }, 2000)
    }
}

function saveLocalLink(link) {
    let linksArr;
    if (localStorage.getItem('linksArr') === null) {
        linksArr = [];
    } else {
        linksArr = JSON.parse(localStorage.getItem('linksArr'))
    }

    linksArr.push(link);
    localStorage.setItem("linksArr", JSON.stringify(linksArr))
}




function getLinks() {
    let linksArr;
    if (localStorage.getItem('linksArr') === null) {
        linksArr = [];
    } else {
        linksArr = JSON.parse(localStorage.getItem('linksArr'))
    }

    linksArr.forEach(function (link) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = link;
        newDiv.classList.add("short-link-container")
        shortenLinksSection.appendChild(newDiv);
    })

    let copyButtons = document.querySelectorAll(".copy");
    copyButtons.forEach(function (copyBtn) {
        copyBtn.addEventListener("click", function () {
            let copyText = copyBtn.previousSibling.previousSibling.href;
            navigator.clipboard.writeText(copyText);
            copyBtn.classList.add("clicked")
            copyBtn.innerText = "Copied!";
            setTimeout(() => {
                copyBtn.classList.remove("clicked");
                copyBtn.innerText = "Copy";
            }, 1000)
        })
    })

    let removeButtons = document.querySelectorAll(".remove");
    removeButtons.forEach(function (removeBtn) {
        removeBtn.addEventListener("click", function () {
            let elToDel = removeBtn.parentElement.parentElement.innerHTML;
            linksArr.splice(linksArr.indexOf(elToDel), 1);
            localStorage.setItem("linksArr", JSON.stringify(linksArr))
            removeBtn.parentElement.parentElement.remove();
        })
    })
}
