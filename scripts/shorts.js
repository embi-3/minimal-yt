function removePopUps() {
    // let shorts = document.querySelectorAll("div#content.style-scope.ytd-rich-section-renderer");
    // let popups = document.querySelectorAll("div#dismissible.style-scope.ytd-rich-shelf-renderer");
    let popups = document.querySelectorAll("ytd-rich-section-renderer.style-scope.ytd-rich-grid-renderer");
    
    // ! DEBUG STATEMENT
    if (popups.length != 0) {
        console.log("removing shorts: ", popups);
    }

    popups.forEach((popup) => {
        console.log(popup);
        popup.remove();
    });
}

function removeShortsButton() {
    let shortsButton = document.querySelector('ytd-mini-guide-entry-renderer[aria-label="Shorts"]');

    if (shortsButton) {
        console.log("Here's the shorts button: ", shortsButton);
        shortsButton.remove();
    }
}

function removeReelShelf() {
    let reelShelf = document.querySelector('ytd-reel-shelf-renderer');

    if (reelShelf) {
        console.log("Here's the reel shelf: ", reelShelf);
        reelShelf.remove();
    }
}

// ! DEBUG FUNCTION
function createIndicator() {
    const app = document.querySelector("ytd-app");
    const content = document.querySelector("div#content.style-scope.ytd-app");

    const indicator = document.createElement("div");
    indicator.id = "content";
    indicator.style = "font-size:32px; background-color:white; text-align:center; padding:10px"
    const text = document.createElement("p");
    text.textContent = "Minimal YT is active!";
    indicator.appendChild(text);

    const masthead = document.querySelector("div#masthead-container.style-scope.ytd-app");
    masthead.style = "margin-top:58.55px";

    const sidebar = document.querySelector("ytd-mini-guide-renderer");
    sidebar.style = "margin-top:58.55px";
    // masthead.insertAdjacentElement("afterend", indicator);

    app.insertBefore(indicator, content);
}

function logger(records, observer) {
    for (const record of records) {
        if (record.addedNodes) {
            removePopUps();
            removeShortsButton();
            removeReelShelf();
        }
    }
}

function observe() {
    let observer = new MutationObserver(logger);

    const observerOptions = {
    childList: true,
    subtree: true,
    };

    observer.observe(body, observerOptions);
}

console.log("Removing shorts...")

// 0. Indicate that the extension is active
// createIndicator();

const body = document.querySelector("div#content.style-scope.ytd-app");
// console.log(body);

// const browse = document.querySelector("ytd-browse");
// console.log(browse);

// const columns = document.querySelector("ytd-two-column-browse-results-renderer");
// console.log(columns);

// const content = document.querySelector("div#contents.style-scope.ytd-rich-grid-renderer"); // not seen at runtime
// console.log(content);

observe();

console.log("shorts have been removed!");
